import { FirebaseAuthTypes, getIdToken } from "@react-native-firebase/auth";
import axios from "axios";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { GroupType } from "@/types";
import { useLoader } from "./useLoader";
import { useAlert } from "./useAlert";
import { API_GROUP_ENDPOINT } from "@/constants/API";

const useGroup = () => {
  const { user } = useAuth();
  const { setIsLoading } = useLoader();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const { showAlert } = useAlert();
  const getGroups = async () => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      const { data } = await axios.get(API_GROUP_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(data || []);
    } catch (err) {
      showAlert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const createGroup = async (name: string, description: string) => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      await axios.post(
        API_GROUP_ENDPOINT,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getGroups();
      showAlert("Group Created!");
    } catch (err) {
      showAlert(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getGroup = async (groupId: string) => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      const { data } = await axios.get(`${API_GROUP_ENDPOINT}/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      showAlert(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getGroupMembers = async (groupId: string) => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      const { data } = await axios.get(
        `${API_GROUP_ENDPOINT}/${groupId}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (err) {
      showAlert(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addMembers = async (groupId, memberIds) => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      const { data } = await axios.post(
        `${API_GROUP_ENDPOINT}/add-user`,
        {
          groupId,
          memberIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ addMembers ~ data:", data);
      return data;
    } catch (err) {
      showAlert(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    groups,
    getGroups,
    getGroup,
    createGroup,
    getGroupMembers,
    addMembers,
  };
};
export default useGroup;
