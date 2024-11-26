"use server";
import { User } from "@/schemas";
import { revalidatePath } from "next/cache";

export const registerAction = async (formData: {
  get: (arg0: string) => unknown;
}) => {
  const user = await User.create({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    username: formData.get("username"),
  });
  await user.save();
  revalidatePath("/(auth)/register");
};
export const loginAction = async (formData: {
  get: (arg0: string) => unknown;
}) => {
  const user = await User.findOne({
    username: formData.get("username"),
  });
  if (user?.passowrd === formData.get("password")) {
    revalidatePath("/(auth)/login");
  }
};
