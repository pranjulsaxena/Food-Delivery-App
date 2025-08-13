import  { type FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, Loader2, Sparkles } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Link, useParams } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

function ResetPassword() {
  const params = useParams();
  const { loading, resetpassword }: any = useUserStore();
  const [password, setPassword] = useState<string>("");

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await resetpassword(password, params.resettoken);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex justify-center items-center px-4">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 dark:bg-orange-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/20 dark:bg-yellow-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <form
        onSubmit={formSubmit}
        className="relative z-10 w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 text-center transition-all duration-300"
      >
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-700/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mx-auto mb-3 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Reset Password
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Set Your New Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Enter a strong password to secure your account
          </p>
        </div>

        <div className="relative mb-6">
          <Input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 pl-12 pr-4 border-2 border-gray-300 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
            required
            minLength={6}
          />
          <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>

        <Separator className="my-6 bg-gray-200 dark:bg-gray-600" />

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors duration-200"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
