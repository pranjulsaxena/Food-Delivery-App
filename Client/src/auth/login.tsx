import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail, Eye, EyeOff, ChefHat, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema";
import { useUserStore } from "../../store/useUserStore";

function Login() {
  const { login, loading }: any = useUserStore();
  const [input, setinput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const [showPassword, setShowPassword] = useState(false);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(input);
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const flattened = result.error.flatten();
      setErrors(flattened.fieldErrors as Partial<LoginInputState>);
      return;
    }
    console.log("implementing login");
    await login(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 dark:bg-orange-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/20 dark:bg-yellow-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                InstaFood
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue your food journey
            </p>
          </div>

          <form
            onSubmit={formSubmit}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 transition-all duration-300"
          >
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  Email Address
                </label>
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={input.email}
                    className="h-12 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                    name="email"
                    onChange={changeEventHandler}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                </div>
                {errors.email && (
                  <span className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <LockKeyhole className="w-4 h-4 text-orange-500" />
                  Password
                </label>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={input.password}
                    className="h-12 pl-12 pr-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                    onChange={changeEventHandler}
                  />
                  <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="text-right">
                <Link
                  to="/forgotpassword"
                  className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <Button
                    disabled
                    className="w-full h-12 bg-gray-400 cursor-not-allowed rounded-xl font-semibold"
                  >
                    <Loader2 className="animate-spin mr-2 w-5 h-5" />
                    Signing in...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    Sign In
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            </div>

            <div className="my-8">
              <Separator className="bg-gray-200 dark:bg-gray-600" />
            </div>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors duration-200"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "🚀", text: "Fast Delivery" },
                { icon: "🍕", text: "Fresh Food" },
                { icon: "⭐", text: "Top Rated" }
              ].map((feature, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {feature.text}
                  </div>
                </div>
              ))}
            </div>
          </form>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 dark:text-gray-400">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Trusted by 50,000+ users
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
