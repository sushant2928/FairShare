import { useEffect, useState } from "react";
import auth, {
  FirebaseAuthTypes,
  getIdToken,
} from "@react-native-firebase/auth";
import { useLoader } from "@/hooks/useLoader";
import axios from "axios";
import { UserInfoType } from "@/types";
import { useAlert } from "./useAlert";

export const useAuthContext = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const { setIsLoading } = useLoader();
  const { showAlert } = useAlert();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(function AuthStateChanged(
      firebaseUser: FirebaseAuthTypes.User | null
    ) {
      setUser(firebaseUser);
      if (!firebaseUser) setUserInfo(null);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user?.uid && !userInfo) {
      getUserInfo(user.uid).then((userInfoRes) => {
        if (userInfoRes) {
          setUserInfo(userInfoRes?.[0]);
        }
      });
    }
  }, [user?.uid, userInfo]);

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await auth().createUserWithEmailAndPassword(email, password);
      showAlert("User registered!");
      const token = await getIdToken(res.user);
      if (token) {
        const { data } = await axios
          .post(
            "http://localhost:5000/api/auth/register",
            {
              name,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .catch((_) => {});
        setUserInfo(data?.user);
      }
    } catch (error) {
      if (error?.code === "auth/email-already-in-use") {
        showAlert("That email address is already in use!");
      }
      if (error?.code === "auth/invalid-email") {
        showAlert("That email address is invalid!");
      }
      showAlert(JSON.stringify({ error }));
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await auth().signInWithEmailAndPassword(email, password);
      showAlert("User signed in!");
      const token = await getIdToken(res?.user);
      if (token) {
        const { data } = await axios
          .get("http://localhost:5000/api/auth/login", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .catch((_) => {});
        setUserInfo(data?.user);
      }
    } catch (error) {
      console.log(JSON.stringify({ error }));
      if (error?.code === "auth/invalid-email") {
        showAlert("That email address is invalid!");
      }
      showAlert(JSON.stringify({ error }));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    auth()
      .signOut()
      .then(() => {
        showAlert("User signed out!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getUserInfo = async (value: string, findBy = "uid") => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/find-user",
        {
          findBy,
          value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  return {
    register,
    login,
    logout,
    getUserInfo,
    user,
    userInfo,
  };
};
