import React, { use, type ChangeEvent, type FormEvent, type KeyboardEvent, type KeyboardEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { set } from "zod/v4";
import { useUserStore } from "../../store/useUserStore";


function VerifyEmail() {
  const {verifyEmail,loading}:any = useUserStore();
  const [otp, setotp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);


  const handleChange = (value: string, index: number) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setotp(newOtp);
      if (value !== "" && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };
  const handleBackspace = (key:string,index:number) => {
    if (key === "Backspace" && !otp[index] && index>0) {
        inputRef.current[index-1]?.focus();
    }
  };
  const formSubmit=async(e:FormEvent)=>{
    e.preventDefault();
    console.log(otp);
    await verifyEmail(otp.join(""));

  }
  return (
    <div className="min-h-screen flex justify-center items-center text-center">
      <form
        onSubmit={formSubmit}
        action=""
        className="max-w-md md:w-full md:border-2 md:border-black p-8 rounded-lg"
      >
        <div>
          <h1 className="text-2xl font-extrabold">Verify Password</h1>
        </div>
        <div className="mb-8">
          <span className="text-slate-500 ">
            Enter the 6 digit code sent to your email
          </span>
        </div>
        <div className="flex gap-x-3 mb-4 justify-center">
          {otp.map((items: string, index: number) => (
            <Input
              type="text"
              key={index}
              maxLength={1}
              ref={(element) => {
                inputRef.current[index] = element;
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e.target.value, index);
              }}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                handleBackspace(e.key, index);
              }}
              className="focus-visible:ring-1  focus-visible:ring-indigo-500 text-center w-8 h-8 text-sm md:text-2xl font-normal md:font-bold md:w-12 md:h-12 "
            />
          ))}
        </div>
        <Separator/>
          <div className="">
            {loading ? (
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
              Verify
            </Button>
          )}
          </div>
      </form>
    </div>
  );
}

export default VerifyEmail;
