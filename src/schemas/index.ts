import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
});

const groupSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const expenseSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  shares: [
    {
      member: { type: Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number, required: true },
    },
  ],
  addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

const transactionSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const User = models.User || model("User", userSchema);
const Group = models.Course || model("Course", groupSchema);
const Expense = models.Expense || model("Expense", expenseSchema);
const Transaction =
  models.Transaction || model("Transaction", transactionSchema);

export { User, Group, Expense, Transaction };
