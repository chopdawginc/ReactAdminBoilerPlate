import { firestore } from "libs/firebase/@firebase";
import { COLLECTIONS, ERRORS } from "constant";
import { Admin, User } from "models/schema";
import { getDocumentById, subscribeToCollection } from "utils/firebaseUtils";
import {
  doc,
  onSnapshot,
  DocumentData,
  collection,
  FirestoreError,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import axios, { AxiosResponse } from "axios";
import { EProfileCommitment, EProfilePace, EProfileWavelength } from "models/types";
import { DateRange } from "types";

interface AddAdminResponse {
  data: any;
}

interface DeleteAdminResponse {
  data: any;
}

class Client {
  getAllUsers = (): Promise<User[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const usersCollectionRef = collection(firestore, COLLECTIONS.USERS);

        const querySnapshot = await getDocs(usersCollectionRef);

        const users = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as User)
        );

        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  };

  // Admins
  addNewAdmin = ({
    accountType,
    email,
    fullName,
    phoneNumber,
  }: {
    accountType: string;
    email: string;
    fullName: string;
    phoneNumber: string;
  }): Promise<AddAdminResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<AddAdminResponse> = await axios.post(
          "https://add-new-admin-rekmjjk74q-uc.a.run.app",
          {
            accountType,
            email,
            fullName,
            phoneNumber,
          }
        );
        resolve(response.data.data);
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        }
        reject(ERRORS.UNKNOWN_ERROR);
      }
    });
  };

  deleteAdmin = ({ uid }: { uid: string }): Promise<DeleteAdminResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<DeleteAdminResponse> = await axios.post(
          "https://delete-admin-rekmjjk74q-uc.a.run.app",
          {
            uid,
          }
        );
        resolve(response.data.data);
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        }
        reject(ERRORS.UNKNOWN_ERROR);
      }
    });
  };

  getAllAdmins = (): Promise<Admin[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const usersCollectionRef = collection(firestore, COLLECTIONS.ADMINS);

        const adminsQuery = query(usersCollectionRef, orderBy("createdAt", "desc"));

        const querySnapshot = await getDocs(adminsQuery);

        const admins = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Admin)
        );

        resolve(admins);
      } catch (error) {
        reject(error);
      }
    });
  };

  getUsersData = (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const usersRef = collection(firestore, COLLECTIONS.USERS);

        const allUsersQuery = query(usersRef);

        //Content Popularity
        // Wavelength
        const finfFocusUsersQuery = query(
          usersRef,
          where("profile.wavelength", "==", EProfileWavelength.FindFocus)
        );
        const moveMotivatedUsersQuery = query(
          usersRef,
          where("profile.wavelength", "==", EProfileWavelength.MoveMotivated)
        );
        const stressLessUsersQuery = query(
          usersRef,
          where("profile.wavelength", "==", EProfileWavelength.StressLess)
        );

        // Pace
        const easyWalkUsersQuery = query(
          usersRef,
          where("profile.pace", "==", EProfilePace.EasyWalk)
        );
        const eightMinutePerMileUsersQuery = query(
          usersRef,
          where("profile.pace", "==", EProfilePace.EightMinutePerMile)
        );
        const moderateWalkUsersQuery = query(
          usersRef,
          where("profile.pace", "==", EProfilePace.ModerateWalk)
        );
        const tenMinutePerMileUsersQuery = query(
          usersRef,
          where("profile.pace", "==", EProfilePace.TenMinutePerMile)
        );
        const twelveMinutePerMileUsersQuery = query(
          usersRef,
          where("profile.pace", "==", EProfilePace.TwelveMinutePerMile)
        );

        // Commitment survey results
        const everydayUsersQuery = query(
          usersRef,
          where("profile.commitment", "==", EProfileCommitment.Everyday)
        );
        const oneToTwoPerWeekUsersQuery = query(
          usersRef,
          where("profile.commitment", "==", EProfileCommitment.OneToTwoPerWeek)
        );
        const twoToFourPerWeekUsersQuery = query(
          usersRef,
          where("profile.commitment", "==", EProfileCommitment.TwoToFourPerWeek)
        );

        const [
          allUsersSnapshot,

          // Wavelength
          finfFocusUsersSnapshot,
          moveMotivatedUsersSnapshot,
          stressLessUsersSnapshot,

          // Pace
          easyWalkUsersSnapshot,
          eightMinutePerMileUsersSnapshot,
          moderateWalkUsersSnapshot,
          tenMinutePerMileUsersSnapshot,
          twelveMinutePerMileUsersSnapshot,

          // Commitment
          everydayUsersSnapshot,
          oneToTwoPerWeekUsersSnapshot,
          twoToFourPerWeekUsersSnapshot,
        ] = await Promise.all([
          getDocs(allUsersQuery),

          // Wavelength
          getDocs(finfFocusUsersQuery),
          getDocs(moveMotivatedUsersQuery),
          getDocs(stressLessUsersQuery),

          //Pace
          getDocs(easyWalkUsersQuery),
          getDocs(eightMinutePerMileUsersQuery),
          getDocs(moderateWalkUsersQuery),
          getDocs(tenMinutePerMileUsersQuery),
          getDocs(twelveMinutePerMileUsersQuery),

          // Commitment
          getDocs(everydayUsersQuery),
          getDocs(oneToTwoPerWeekUsersQuery),
          getDocs(twoToFourPerWeekUsersQuery),
        ]);

        const allUsers = allUsersSnapshot.docs.map((doc) => doc.data());

        // Wavelength
        const findFocusUsers = finfFocusUsersSnapshot.docs.map((doc) => doc.data());
        const moveMotivatedUsers = moveMotivatedUsersSnapshot.docs.map((doc) => doc.data());
        const stressLessUsers = stressLessUsersSnapshot.docs.map((doc) => doc.data());

        // Pace
        const easyWalkUsers = easyWalkUsersSnapshot.docs.map((doc) => doc.data());
        const eightMinutePerMileUsers = eightMinutePerMileUsersSnapshot.docs.map((doc) =>
          doc.data()
        );
        const moderateWalkUsers = moderateWalkUsersSnapshot.docs.map((doc) => doc.data());
        const tenMinutePerMileUsers = tenMinutePerMileUsersSnapshot.docs.map((doc) => doc.data());
        const twelveMinutePerMileUsers = twelveMinutePerMileUsersSnapshot.docs.map((doc) =>
          doc.data()
        );

        // Commitment
        const everydayUsers = everydayUsersSnapshot.docs.map((doc) => doc.data());
        const oneToTwoPerWeekUsers = oneToTwoPerWeekUsersSnapshot.docs.map((doc) => doc.data());
        const twoToFourPerWeekUsers = twoToFourPerWeekUsersSnapshot.docs.map((doc) => doc.data());

        resolve({
          totalUsers: allUsers.length,
          usersBySubscriptionType: [
            { label: "Trial Users", value: 4000 },
            { label: "Active Listeners", value: 4000 },
            { label: "Unsubscribed", value: 6123 },
            { label: "Cancelled Trials", value: 423 },
            { label: "Deactivated", value: 1000 },
          ],
          contentPopularity: [
            { label: "Stress", value: stressLessUsers.length },
            { label: "Focus", value: findFocusUsers.length },
            { label: "Motivation", value: moveMotivatedUsers.length },
            { label: "Easy Walk", value: easyWalkUsers.length },
            { label: "Mod Walk", value: moderateWalkUsers.length },
            { label: "12 min Run", value: twelveMinutePerMileUsers.length },
            { label: "10 min Run", value: tenMinutePerMileUsers.length },
            { label: "8 min Run", value: eightMinutePerMileUsers.length },
          ],
          commitmentSurveyResults: [
            { name: "2-4x", value: twoToFourPerWeekUsers.length },
            { name: "1-2x", value: oneToTwoPerWeekUsers.length },
            { name: "Everyday", value: everydayUsers.length },
          ],
        });
      } catch (error: any) {
        reject(`Error fetching user data: ${error.message}`);
      }
    });
  };

  getUsersDataByDateRange = async ({ dateRange }: { dateRange: DateRange }): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      // Convert the input dates to Firestore Timestamps

      //   const usersRef = collection(firestore, COLLECTIONS.USERS);

      //   const baseQuery = query(
      //     usersRef,
      //     where("createdAt", ">=", startTimestamp),
      //     where("createdAt", "<=", endTimestamp)
      //   );

      //   const findFocusUsersQuery = query(
      //     baseQuery,
      //     where("profile.wavelength", "==", EProfileWavelength.FindFocus)
      //   );
      //   const moveMotivatedUsersQuery = query(
      //     baseQuery,
      //     where("profile.wavelength", "==", EProfileWavelength.MoveMotivated)
      //   );

      //   const [allUsersSnapshot, findFocusUsersSnapshot, moveMotivatedUsersSnapshot] =
      //     await Promise.all([
      //       getDocs(baseQuery),
      //       getDocs(findFocusUsersQuery),
      //       getDocs(moveMotivatedUsersQuery),
      //     ]);

      //   const allUsers = allUsersSnapshot.docs.map((doc) => doc.data());
      //   const findFocusUsers = findFocusUsersSnapshot.docs.map((doc) => doc.data());
      //   const moveMotivatedUsers = moveMotivatedUsersSnapshot.docs.map((doc) => doc.data());

      //   resolve({
      //     totalUsers: allUsers.length,
      //     usersBySubscriptionType: [
      //       { label: "Trial Users", value: 4000 },
      //       { label: "Active Listeners", value: 4000 },
      //       { label: "Unsubscribed", value: 6123 },
      //       { label: "Cancelled Trials", value: 423 },
      //       { label: "Deactivated", value: 1000 },
      //     ],
      //     contentPopularity: [
      //       { label: "Stress", value: 6123 },
      //       { label: "Focus", value: findFocusUsers.length },
      //       { label: "Motivation", value: moveMotivatedUsers.length },
      //       { label: "Easy Walk", value: 6123 },
      //       { label: "Mod Walk", value: 6123 },
      //       { label: "12 min Run", value: 6123 },
      //       { label: "10 min Run", value: 6123 },
      //       { label: "8 min Run", value: 6123 },
      //     ],
      //   });
      // } catch (error: any) {
      //   reject(`Error fetching user data: ${error.message}`);
      // }

      try {
        const fromDate = dateRange.from?.toDate();
        const toDate = dateRange.to?.toDate();
        const startTimestamp = Timestamp.fromDate(fromDate || new Date());
        const endTimestamp = Timestamp.fromDate(toDate || new Date());

        const usersRef = collection(firestore, COLLECTIONS.USERS);

        const baseQuery = query(
          usersRef,
          where("createdAt", ">=", startTimestamp),
          where("createdAt", "<=", endTimestamp)
        );
        //Content Popularity
        // Wavelength
        const finfFocusUsersQuery = query(
          baseQuery,
          where("profile.wavelength", "==", EProfileWavelength.FindFocus)
        );
        const moveMotivatedUsersQuery = query(
          baseQuery,
          where("profile.wavelength", "==", EProfileWavelength.MoveMotivated)
        );
        const stressLessUsersQuery = query(
          baseQuery,
          where("profile.wavelength", "==", EProfileWavelength.StressLess)
        );

        // Pace
        const easyWalkUsersQuery = query(
          baseQuery,
          where("profile.pace", "==", EProfilePace.EasyWalk)
        );
        const eightMinutePerMileUsersQuery = query(
          baseQuery,
          where("profile.pace", "==", EProfilePace.EightMinutePerMile)
        );
        const moderateWalkUsersQuery = query(
          baseQuery,
          where("profile.pace", "==", EProfilePace.ModerateWalk)
        );
        const tenMinutePerMileUsersQuery = query(
          baseQuery,
          where("profile.pace", "==", EProfilePace.TenMinutePerMile)
        );
        const twelveMinutePerMileUsersQuery = query(
          baseQuery,
          where("profile.pace", "==", EProfilePace.TwelveMinutePerMile)
        );

        // Commitment survey results
        const everydayUsersQuery = query(
          baseQuery,
          where("profile.commitment", "==", EProfileCommitment.Everyday)
        );
        const oneToTwoPerWeekUsersQuery = query(
          baseQuery,
          where("profile.commitment", "==", EProfileCommitment.OneToTwoPerWeek)
        );
        const twoToFourPerWeekUsersQuery = query(
          baseQuery,
          where("profile.commitment", "==", EProfileCommitment.TwoToFourPerWeek)
        );

        const [
          allUsersSnapshot,

          // Wavelength
          finfFocusUsersSnapshot,
          moveMotivatedUsersSnapshot,
          stressLessUsersSnapshot,

          // Pace
          easyWalkUsersSnapshot,
          eightMinutePerMileUsersSnapshot,
          moderateWalkUsersSnapshot,
          tenMinutePerMileUsersSnapshot,
          twelveMinutePerMileUsersSnapshot,

          // Commitment
          everydayUsersSnapshot,
          oneToTwoPerWeekUsersSnapshot,
          twoToFourPerWeekUsersSnapshot,
        ] = await Promise.all([
          getDocs(baseQuery),

          // Wavelength
          getDocs(finfFocusUsersQuery),
          getDocs(moveMotivatedUsersQuery),
          getDocs(stressLessUsersQuery),

          //Pace
          getDocs(easyWalkUsersQuery),
          getDocs(eightMinutePerMileUsersQuery),
          getDocs(moderateWalkUsersQuery),
          getDocs(tenMinutePerMileUsersQuery),
          getDocs(twelveMinutePerMileUsersQuery),

          // Commitment
          getDocs(everydayUsersQuery),
          getDocs(oneToTwoPerWeekUsersQuery),
          getDocs(twoToFourPerWeekUsersQuery),
        ]);

        const allUsers = allUsersSnapshot.docs.map((doc) => doc.data());

        // Wavelength
        const findFocusUsers = finfFocusUsersSnapshot.docs.map((doc) => doc.data());
        const moveMotivatedUsers = moveMotivatedUsersSnapshot.docs.map((doc) => doc.data());
        const stressLessUsers = stressLessUsersSnapshot.docs.map((doc) => doc.data());

        // Pace
        const easyWalkUsers = easyWalkUsersSnapshot.docs.map((doc) => doc.data());
        const eightMinutePerMileUsers = eightMinutePerMileUsersSnapshot.docs.map((doc) =>
          doc.data()
        );
        const moderateWalkUsers = moderateWalkUsersSnapshot.docs.map((doc) => doc.data());
        const tenMinutePerMileUsers = tenMinutePerMileUsersSnapshot.docs.map((doc) => doc.data());
        const twelveMinutePerMileUsers = twelveMinutePerMileUsersSnapshot.docs.map((doc) =>
          doc.data()
        );

        // Commitment
        const everydayUsers = everydayUsersSnapshot.docs.map((doc) => doc.data());
        const oneToTwoPerWeekUsers = oneToTwoPerWeekUsersSnapshot.docs.map((doc) => doc.data());
        const twoToFourPerWeekUsers = twoToFourPerWeekUsersSnapshot.docs.map((doc) => doc.data());

        resolve({
          totalUsers: allUsers.length,
          usersBySubscriptionType: [
            { label: "Trial Users", value: 4000 },
            { label: "Active Listeners", value: 4000 },
            { label: "Unsubscribed", value: 6123 },
            { label: "Cancelled Trials", value: 423 },
            { label: "Deactivated", value: 1000 },
          ],
          contentPopularity: [
            { label: "Stress", value: stressLessUsers.length },
            { label: "Focus", value: findFocusUsers.length },
            { label: "Motivation", value: moveMotivatedUsers.length },
            { label: "Easy Walk", value: easyWalkUsers.length },
            { label: "Mod Walk", value: moderateWalkUsers.length },
            { label: "12 min Run", value: twelveMinutePerMileUsers.length },
            { label: "10 min Run", value: tenMinutePerMileUsers.length },
            { label: "8 min Run", value: eightMinutePerMileUsers.length },
          ],
          commitmentSurveyResults: [
            { name: "2-4x", value: twoToFourPerWeekUsers.length },
            { name: "1-2x", value: oneToTwoPerWeekUsers.length },
            { name: "Everyday", value: everydayUsers.length },
          ],
        });
      } catch (error: any) {
        reject(`Error fetching user data: ${error.message}`);
      }
    });
  };
}

const ClientService = new Client();

export { ClientService };
