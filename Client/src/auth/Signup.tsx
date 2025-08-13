import  { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail, PhoneIcon, User2Icon, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import type { SignupInputState } from "@/schema/userSchema";
import { userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "../../store/useUserStore";

function Signup() {
  const [input, setinput] = useState<SignupInputState>({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { signup, loading }: any = useUserStore();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const flattened = result.error.flatten();
      setErrors(flattened.fieldErrors as Partial<SignupInputState>);
      return;
    }
    await signup(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 dark:bg-orange-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/20 dark:bg-yellow-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={formSubmit}
          className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 transition-all duration-300"
          noValidate
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                InstaFood
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Your Account</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign up to start your delicious journey with us!
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User2Icon className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                Name
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Your full name"
                value={input.name}
                onChange={changeEventHandler}
                className="h-12 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                required
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  ● {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Your email address"
                value={input.email}
                onChange={changeEventHandler}
                className="h-12 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  ● {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                Phone
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="Your contact number"
                value={input.phone}
                onChange={changeEventHandler}
                className="h-12 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                required
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  ● {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <LockKeyhole className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={input.password}
                onChange={changeEventHandler}
                className="h-12 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  ● {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {loading ? (
                <Button
                  disabled
                  className="w-full h-12 bg-gray-400 cursor-not-allowed rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Loader2 className="animate-spin w-5 h-5" />
                  Signing Up...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Sign Up <ArrowRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          <div className="my-8">
            <Separator className="bg-gray-200 dark:bg-gray-600" />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors duration-200"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
