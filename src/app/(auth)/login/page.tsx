import { loginAction } from "@/actions/auth";
import { FormInput } from "@/components/FormInput";
import Link from "next/link";

const Login = () => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 bg-white gap-4 px-6 py-8 rounded-md h-min flex flex-col">
      <form action={loginAction} className="flex flex-col gap-4">
        <FormInput isRequired={true} label={"Email"} name={"username"} />
        <FormInput isRequired={true} label={"Password"} name={"password"} />
        <button
          className="text-white bg-zinc-800 p-2 mt-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="m-auto">
        New User?{" "}
        <Link className="underline" href={"/register"}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
