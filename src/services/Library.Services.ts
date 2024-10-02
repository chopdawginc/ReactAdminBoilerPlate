import { firestore, storage } from "libs/firebase/@firebase";
import { COLLECTIONS, ERRORS } from "constant";
import { Admin, AppContent, Provider, Song } from "models/schema";
import { getDocumentById, getDocumentReference, subscribeToCollection } from "utils/firebaseUtils";
import {
  doc,
  onSnapshot,
  DocumentData,
  collection,
  FirestoreError,
  Timestamp,
  updateDoc,
  getDocs,
  getDoc,
  addDoc,
  query,
  orderBy,
  Query,
  setDoc,
  where,
} from "firebase/firestore";
import axios, { AxiosResponse } from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ESongStatus } from "models/types";
import { duration } from "moment";
import { DateRange } from "types";

interface GetUserValues {
  uid: string;
}

interface UpdatePasswordResponse {
  data: any;
}
interface UpdateEmailResponse {
  data: any;
}

interface UploadSongValues {
  bpm: string;
  userId: string;
  provider: string;
  audioFiles: File[];
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

class Library {
  uploadSongs = async (values: UploadSongValues): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const { audioFiles, bpm, provider, setProgress, userId } = values;

        const promises: Promise<void>[] = audioFiles.map((audio) => {
          return new Promise<void>((resolve, reject) => {
            const storageRef = ref(storage, `songs/${audio.name}_${Date.now()}`);
            const uploadTask = uploadBytesResumable(storageRef, audio);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress); // Update progress
              },
              (error) => {
                console.error(error);
                reject(error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                  // Get audio duration
                  const audioDuration = await getAudioDuration(audio);

                  // Save the song data along with its duration to Firestore
                  const songRef = await addDoc(collection(firestore, COLLECTIONS.SONGS), {
                    audioUrl: downloadURL,
                    title: audio.name,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                    createdBy: getDocumentReference(COLLECTIONS.ADMINS, userId),
                    timesPlayed: 0,
                    timesSkipped: 0,
                    status: ESongStatus.Active,
                    provider: getDocumentReference(COLLECTIONS.PROVIDERS, provider),
                    bpm,
                    duration: audioDuration,
                  });

                  await updateDoc(doc(firestore, COLLECTIONS.SONGS, songRef.id), {
                    id: songRef.id,
                  });

                  resolve();
                } catch (error) {
                  console.error("Error saving song:", error);
                  reject(error);
                }
              }
            );
          });
        });

        await Promise.all(promises);
        resolve("All audio files uploaded successfully");
      } catch (error) {
        console.error("Error uploading song:", error);
        reject(error);
      }
    });
  };

  getProviders = async (params: {
    dataCallback: (data: Provider[]) => void;
    errorCallback: (error: FirestoreError) => void;
  }): Promise<{ data: Provider[]; unsubscribe: () => void }> => {
    const { dataCallback, errorCallback } = params;

    const queryFn = (ref: any) => {
      return query(ref, orderBy("createdAt", "desc")) as Query<Provider>;
    };
    return subscribeToCollection<Provider>(
      firestore,
      COLLECTIONS.PROVIDERS,
      dataCallback,
      errorCallback,
      queryFn
    );
  };

  addProvider = (values: { providerName: string; userId: string }): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { providerName, userId } = values;

        const data: Omit<Provider, "id"> = {
          name: providerName,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          createdBy: getDocumentReference(COLLECTIONS.ADMINS, userId),
        };

        const providersCollectionRef = collection(firestore, COLLECTIONS.PROVIDERS);

        const docRef = doc(providersCollectionRef);

        await setDoc(docRef, {
          id: docRef.id,
          ...data,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  getAllSongsQuery = query(collection(firestore, COLLECTIONS.SONGS), orderBy("createdAt", "desc"));

  getSongsByDateRange = ({ dateRange }: { dateRange: DateRange }): Promise<Song[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const fromDate = dateRange.from?.toDate();
        const toDate = dateRange.to?.toDate();
        const startTimestamp = Timestamp.fromDate(fromDate || new Date());
        const endTimestamp = Timestamp.fromDate(toDate || new Date());

        const songsQuery = query(
          collection(firestore, COLLECTIONS.SONGS),
          where("createdAt", ">=", startTimestamp),
          where("createdAt", "<=", endTimestamp),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(songsQuery);

        const songs: Song[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as Song[];

        resolve(songs);
      } catch (error) {
        console.error("Error fetching songs: ", error);
        reject(error);
      }
    });
  };

  getUserById = async (params: {
    uid: string;
    dataCallback: (data: Admin) => void;
    errorCallback: (error: FirestoreError) => void;
  }): Promise<{ data: Admin; unsubscribe: () => void }> => {
    const { uid, dataCallback, errorCallback } = params;

    return getDocumentById<Admin>(firestore, COLLECTIONS.ADMINS, uid, dataCallback, errorCallback);
  };

  updateUserPassword = ({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: string;
  }): Promise<UpdatePasswordResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<UpdatePasswordResponse> = await axios.post(
          "https://update-user-password-rekmjjk74q-uc.a.run.app",
          {
            userId,
            newPassword,
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

  updateUserEmail = ({
    userId,
    newEmail,
  }: {
    userId: string;
    newEmail: string;
  }): Promise<UpdateEmailResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<UpdateEmailResponse> = await axios.post(
          "https://update-user-email-rekmjjk74q-uc.a.run.app",
          {
            userId,
            newEmail,
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

  updateSong({
    status,
    title,
    docId,
  }: {
    status: string;
    title: string;
    docId: string;
  }): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const songRef = doc(firestore, COLLECTIONS.SONGS, docId);
        await updateDoc(songRef, { title, status, updatedAt: Timestamp.now() });
        resolve("Song updated successfully!");
      } catch (error) {
        console.error("Error updating song: ", error);
        reject("Failed to update song");
      }
    });
  }
}

const LibraryService = new Library();

export { LibraryService };

const getAudioDuration = (file: File): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const audio = new Audio();
    const objectUrl = URL.createObjectURL(file);

    audio.src = objectUrl;

    audio.addEventListener("loadedmetadata", () => {
      if (audio.duration === Infinity) {
        // Wait for duration to be calculated
        audio.currentTime = Number.MAX_SAFE_INTEGER;
        audio.ontimeupdate = () => {
          audio.ontimeupdate = null;
          const durationInMinutes = convertToMinutes(audio.duration);

          resolve(durationInMinutes);
          URL.revokeObjectURL(objectUrl);
        };
      } else {
        const durationInMinutes = convertToMinutes(audio.duration);

        resolve(durationInMinutes);
        URL.revokeObjectURL(objectUrl);
      }
    });

    audio.onerror = () => {
      reject(new Error("Failed to load audio file for duration"));
    };
  });
};

const convertToMinutes = (durationInSeconds: number): number => {
  return durationInSeconds / 60;
  //   return parseFloat((durationInSeconds / 60).toFixed(2));
};
