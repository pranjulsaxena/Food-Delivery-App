import React, { useState, useRef, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useUserStore } from "../../store/useUserStore";

function VerifyEmail() {
  const { verifyEmail, loading }: any = useUserStore();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await verifyEmail(otp.join(""));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex justify-center items-center px-4">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 dark:bg-orange-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/20 dark:bg-yellow-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <form
        onSubmit={formSubmit}
        className="relative z-10 w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 text-center transition-all duration-300"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            Verify Email
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Enter the 6 digit code sent to your email
          </p>
        </div>

        {/* OTP Input fields */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((value, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              ref={(el) => (inputRef.current[index] = el)}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value.toUpperCase(), index)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleBackspace(e.key, index)}
              className="focus-visible:ring-2 focus-visible:ring-orange-400 dark:focus-visible:ring-orange-500 text-center w-12 h-12 md:w-16 md:h-16 text-xl md:text-3xl font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200"
              autoComplete="one-time-code"
              inputMode="numeric"
              pattern="[A-Za-z0-9]"
            />
          ))}
        </div>

        <Separator className="mb-6 bg-gray-200 dark:bg-gray-600" />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </div>
  );
}

export default VerifyEmail;
