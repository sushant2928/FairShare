import { registerAction } from "@/actions/auth";
import { FormInput } from "@/components/FormInput";
import Link from "next/link";

export default function Register() {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 bg-white gap-4 px-6 py-8 rounded-md h-min flex flex-col">
      <form action={registerAction} className="flex flex-col gap-4">
        <FormInput isRequired={true} label={"First Name"} name={"firstName"} />
        <FormInput isRequired={true} label={"Last Name"} name={"lastName"} />
        <FormInput isRequired={true} label={"Email"} name={"username"} />
        <FormInput isRequired={true} label={"Password"} name={"password"} />
        <button
          className="text-white bg-zinc-800 p-2 mt-4 rounded"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="m-auto">
        Already Registerd?{" "}
        <Link className="underline" href={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
}
