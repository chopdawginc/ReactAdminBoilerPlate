require("dotenv").config();
import { HttpsFunction, onRequest, Request as FirebaseRequest } from "firebase-functions/v2/https";
import { CustomError } from "./utils/CustomError";
import { getAuth } from "firebase-admin/auth";
import { ERRORS } from "./constants/errors";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import { Admin } from "./models/schema";
import { EAdminRole } from "./models/types";
const cors = require("cors")({ origin: true });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_VERIFY_SERVICE_ID;

const client = require("twilio")(accountSid, authToken);

const { initializeApp } = require("firebase-admin/app");

initializeApp();

interface GetUserByEmailRequest extends FirebaseRequest {
  body: {
    email: string;
  };
}
interface UpdateUserEmailRequest extends FirebaseRequest {
  body: {
    newEmail: string;
    userId: string;
  };
}

interface UpdateUserPasswordRequest extends FirebaseRequest {
  body: {
    newPassword: string;
    userId: string;
  };
}

interface AddAdminRequest {
  fullName: string;
  email: string;
  accountType: EAdminRole;
  phoneNumber: string;
}

// interface OtpRequest extends FirebaseRequest {
//   body: {
//     phone: string;
//     otp: string;
//   };
// }

interface JsonResponse<T = any> {
  data?: T;
  code?: string | number;
  message?: string;
}

export const get_user_by_email: HttpsFunction = onRequest(
  async (req: GetUserByEmailRequest, res) => {
    cors(req, res, async () => {
      const { email } = req.body;

      try {
        const userRecord = await getAuth().getUserByEmail(email);

        const adminDoc = await getFirestore().collection("admins").doc(userRecord.uid).get();

        if (!adminDoc.exists) {
          throw new CustomError({
            code: "admin-data-not-found",
            message: "Admin data not found for this user.",
          });
        }

        const adminData = adminDoc.data();

        const response: JsonResponse<typeof adminData> = {
          data: adminData,
        };
        res.status(200).json(response);
      } catch (error: any) {
        if (error instanceof CustomError) {
          res.status(500).json(error);
        } else if (error.code) {
          res.status(500).json({ code: error.code, message: error.message });
        } else {
          res.status(500).json(ERRORS.UNKNOWN_ERROR);
        }
      }
    });
  }
);

export const update_user_email: HttpsFunction = onRequest(
  async (req: UpdateUserEmailRequest, res) => {
    cors(req, res, async () => {
      const { userId, newEmail } = req.body;

      if (!userId || !newEmail) {
        return res.status(400).json({
          code: "invalid-argument",
          message: "Missing userId or newEmail in the request body.",
        });
      }

      try {
        const userRecord = await getAuth().updateUser(userId, {
          email: newEmail,
        });

        await getFirestore().collection("users").doc(userId).update({
          email: newEmail,
        });

        const response: JsonResponse<typeof userRecord> = {
          data: userRecord,
        };
        return res.status(200).json(response);
      } catch (error: any) {
        if (error instanceof CustomError) {
          return res.status(500).json(error);
        } else if (error.code) {
          return res.status(500).json({ code: error.code, message: error.message });
        } else {
          return res.status(500).json(ERRORS.UNKNOWN_ERROR);
        }
      }
    });
  }
);

export const update_user_password: HttpsFunction = onRequest(
  async (req: UpdateUserPasswordRequest, res) => {
    cors(req, res, async () => {
      const { userId, newPassword } = req.body;

      if (!userId || !newPassword) {
        return res.status(400).json({
          code: "invalid-argument",
          message: "Missing userId or newPassword in the request body.",
        });
      }

      try {
        const userRecord = await getAuth().updateUser(userId, {
          password: newPassword,
        });
        const response: JsonResponse<typeof userRecord> = {
          data: userRecord,
        };
        return res.status(200).json(response);
      } catch (error: any) {
        if (error instanceof CustomError) {
          return res.status(500).json(error);
        } else if (error.code) {
          return res.status(500).json({ code: error.code, message: error.message });
        } else {
          return res.status(500).json(ERRORS.UNKNOWN_ERROR);
        }
      }
    });
  }
);

export const add_new_admin: HttpsFunction = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { fullName, email, accountType, phoneNumber }: AddAdminRequest = req.body;

    if (!fullName || !email || !accountType || !phoneNumber) {
      return res.status(400).json({
        code: "invalid-argument",
        message: "Missing fullName, email, accountType, or phoneNumber in the request body.",
      });
    }

    //  const role = EAdminRole[accountType as keyof typeof EAdminRole];

    try {
      const userRecord = await getAuth().createUser({
        email: email,
        //   phoneNumber: phoneNumber,
        displayName: fullName,
        password: "defaultPassword123",
        disabled: false,
      });

      const userDoc: Admin = {
        email: email,
        name: fullName,
        role: accountType,
        id: userRecord.uid,
        phone: phoneNumber,
        statusHistory: [
          {
            date: Timestamp.now(),
            status: "pending",
          },
        ],
        currentStatus: {
          date: Timestamp.now(),
          status: "pending",
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await getFirestore().collection("admins").doc(userRecord.uid).set(userDoc);

      const response: JsonResponse<typeof userDoc> = {
        data: userDoc,
      };
      return res.status(200).json(response);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(500).json(error);
      } else if (error.code) {
        return res.status(500).json({ code: error.code, message: error.message });
      } else {
        return res.status(500).json(ERRORS.UNKNOWN_ERROR);
      }
    }
  });
});

export const delete_admin: HttpsFunction = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { uid }: { uid: string } = req.body;

    if (!uid) {
      return res.status(400).json({
        code: "invalid-argument",
        message: "Missing uid in the request body.",
      });
    }

    try {
      await getAuth().deleteUser(uid);

      await getFirestore().collection("admins").doc(uid).delete();

      const response: JsonResponse<string> = {
        data: "Admin deleted successfully.",
      };
      return res.status(200).json(response);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(500).json(error);
      } else if (error.code) {
        return res.status(500).json({ code: error.code, message: error.message });
      } else {
        return res.status(500).json(ERRORS.UNKNOWN_ERROR);
      }
    }
  });
});

export const admin_set_password: HttpsFunction = onRequest(
  async (req: UpdateUserPasswordRequest, res) => {
    cors(req, res, async () => {
      const { userId, newPassword } = req.body;

      if (!userId || !newPassword) {
        return res.status(400).json({
          code: "invalid-argument",
          message: "Missing userId or newPassword in the request body.",
        });
      }

      try {
        const userRecord = await getAuth().updateUser(userId, {
          password: newPassword,
        });

        await getFirestore()
          .collection("admins")
          .doc(userId)
          .update({
            currentStatus: {
              date: Timestamp.now(),
              status: "active",
            },
            statusHistory: FieldValue.arrayUnion({
              date: Timestamp.now(),
              status: "active",
            }),
            updatedAt: Timestamp.now(),
          });
        const response: JsonResponse<typeof userRecord> = {
          data: userRecord,
        };
        return res.status(200).json(response);
      } catch (error: any) {
        if (error instanceof CustomError) {
          return res.status(500).json(error);
        } else if (error.code) {
          return res.status(500).json({ code: error.code, message: error.message });
        } else {
          return res.status(500).json(ERRORS.UNKNOWN_ERROR);
        }
      }
    });
  }
);

// OTP
export const send_OTP: HttpsFunction = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { phone }: { phone: string } = req.body;

    if (!phone) {
      return res.status(400).json({
        code: "invalid-argument",
        message: "Missing phone number",
      });
    }

    try {
      await client.verify.v2
        .services(serviceId)
        .verifications.create({ to: phone, channel: "sms" });

      const response: JsonResponse<string> = {
        data: `OTP sent successfully  to ${phone}`,
      };
      return res.status(200).json(response);
    } catch (error: any) {
      if (error.code) {
        return res.status(500).json({ code: error.code, message: error.message });
      } else {
        return res.status(500).json(ERRORS.UNKNOWN_ERROR);
      }
    }
  });
});

// export const verify_OTP: HttpsFunction = onRequest(
//   async (req: OtpRequest, res) => {
//     cors(req, res, async () => {
//       const { phone, otp } = req.body;

//       if (!phone || !otp) {
//         return res.status(400).json({
//           code: "invalid-argument",
//           message: "Phone number and OTP are required",
//         });
//       }
//       try {
//         const verificationCheck = await client.verify.v2
//           .services(serviceId)
//           .verificationChecks.create({ to: phone, code: otp });

//         if (verificationCheck.status === "approved") {
//           const response: JsonResponse<typeof verificationCheck> = {
//             data: {
//               message: "OTP successfully verified.",
//               status: verificationCheck.status,
//             },
//           };
//           return res.status(200).json(response);
//         } else {
//           const response: JsonResponse<object> = {
//             data: {
//               message: "OTP verification failed.",
//               status: verificationCheck.status,
//             },
//           };
//           return res.status(500).json(response);
//         }
//       } catch (error: any) {
//         if (error.code) {
//           return res
//             .status(500)
//             .json({ code: error.code, message: error.message });
//         } else {
//           return res.status(500).json(ERRORS.UNKNOWN_ERROR);
//         }
//       }
//     });
//   }
// );
