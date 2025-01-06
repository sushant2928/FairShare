import axios from "axios";
import { useLoader } from "./useLoader";
import { FirebaseAuthTypes, getIdToken } from "@react-native-firebase/auth";
import { useAuth } from "./useAuth";
import { useAlert } from "./useAlert";
import { API_EXPENSE_ENDPOINT, API_GROUP_ENDPOINT } from "@/constants/API";

const useExpense = () => {
  const { setIsLoading } = useLoader();
  const { user } = useAuth();
  const { showAlert } = useAlert();

  const getExpenses = async (groupId: number) => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      const { data } = await axios.get(
        `${API_GROUP_ENDPOINT}/${groupId}/expenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (err) {
      showAlert(err?.message);
      throw new Error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getExpense = async (expenseId: string) => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      const { data } = await axios.get(`${API_EXPENSE_ENDPOINT}/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      showAlert(err?.message);
      throw new Error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (
    description: string,
    amount: number,
    groupId: number
  ) => {
    try {
      setIsLoading(true);
      const token = await getIdToken(user as FirebaseAuthTypes.User);
      const res = await axios.post(
        `${API_EXPENSE_ENDPOINT}/add-expense`,
        {
          description,
          amount,
          payerId: user?.uid,
          groupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getExpenses(groupId);
      showAlert("Expense Added");
    } catch (err) {
      console.log("🚀 ~ useExpense ~ err:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return { addExpense, getExpenses, getExpense };
};

export default useExpense;
