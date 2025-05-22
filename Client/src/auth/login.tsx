import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema";

function Login() {
  // interface LoginInputState {
  //     email: string;
  //     password: string;
  // }

  const [Loading, setLoading] = useState(false);
  const [input, setinput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(input);
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const flattened = result.error.flatten();
      setErrors(flattened.fieldErrors as Partial<LoginInputState>);
      return;
    }
  };
  return (
    <div className="min-h-screen flex  justify-center items-center">
      <form
        className="box-content max-w-md md:w-full rounded-lg border-black md:border md:p-8 text-center"
        onSubmit={formSubmit}
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl text-center">InstaFoood</h1>
        </div>
        <div className="mb-4">
          <div className="relative ">
            <Input
              type="email"
              placeholder="Email"
              value={input.email}
              className="pl-10 focus-visible:ring-1"
              name="email"
              onChange={changeEventHandler}
            ></Input>
            <Mail className="absolute bottom-1 left-2 text-gray-500"></Mail>
          </div>
          {errors && <span className="text-sm text-red-500">{errors.email}</span>}
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              onChange={changeEventHandler}
              type="password"
              name="password"
              placeholder="Password"
              value={input.password}
              className="pl-10 focus-visible:ring-1"
            ></Input>
          <LockKeyhole className="absolute bottom-1 left-2 text-gray-500"></LockKeyhole>
          </div>
          {errors && <span className="text-sm text-red-500">{errors.password}</span>}
        </div>
        <div className="mb-10">
          {Loading ? (
            <Button
              disabled={true}
              className="w-full bg-[#D19254] hover:bg-[#d18c47] disabled:cursor-not-allowed"
            >
              <Loader2 className="animate-spin mr-2 w-4 h-4"></Loader2>Loading
              ...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#D19254] hover:bg-[#d18c47]"
            >
              Login
            </Button>
          )}
          <span><Link className="text-blue-500 underline hover:text-blue-700" to="/login/forgotpassword">Forgot Password</Link></span>
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
