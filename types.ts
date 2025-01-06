export interface UserInfoType {
  id: string;
  name: string;
  email: string;
  uid: string;
  balance: string;
}

export interface ExpenseType {
  id: string;
  name: string;
  description: string;
  amount: number;
  payerId: string;
}

export interface GroupType {
  id: string;
  name: string;
  description: string;
  members: UserInfoType;
  expense: ExpenseType;
}

export interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  groupId: string;
}
