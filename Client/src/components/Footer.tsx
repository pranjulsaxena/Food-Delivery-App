import React from "react";
import { Copyright } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";

function Footer() {
  return (
    <footer className="w-full text-[#2c1e14] bg-[#d1a154] flex flex-col items-center">
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12">

        <div className="flex flex-col items-center md:items-start gap-4 flex-shrink-0 text-center md:text-left md:flex-row md:gap-6"> {/* Added md:flex-row and md:gap-6 here */}
          <div className="flex flex-col items-center md:items-start gap-4"> {/* Inner div for content */}
            <h1 className="font-bold text-3xl md:text-4xl">
              InstaFood
            </h1>
            <div className="flex gap-5">
              <FaTwitter className="size-6 hover:text-white transition-colors duration-200 cursor-pointer" />
              <FaWhatsapp className="size-6 hover:text-white transition-colors duration-200 cursor-pointer" />
              <FaInstagram className="size-6 hover:text-white transition-colors duration-200 cursor-pointer" />
              <FaFacebook className="size-6 hover:text-white transition-colors duration-200 cursor-pointer" />
            </div>
          </div>
          <Separator
            className="hidden md:block h-auto w-[1px] bg-black opacity-30 mx-6 self-stretch" // self-stretch for full height
            orientation="vertical"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 md:gap-x-12 text-center md:text-left flex-grow">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg mb-1">Available in:</h2>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Delhi</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Hyderabad</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Mumbai</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Bangalore</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Chennai</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Kolkata</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg mb-1">Company</h2>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">About</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Careers</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Press</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Teams</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg mb-1">Services</h2>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Pricing</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Restaurants</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Delivery</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg mb-1">Legal</h2>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Terms & Conditions</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Privacy Policy</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Cookie Policy</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg mb-1">Contact</h2>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Help</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">Support</p>
            <p className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">FAQs</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-auto md:max-w-xs flex-shrink-0">
          <h2 className="font-semibold text-lg text-center md:text-left">Subscribe to our newsletter.</h2>
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <Input
              className="w-full text-black border border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black placeholder:text-gray-600"
              type="email"
              placeholder="Enter your email"
            />
            <Button className="w-full sm:w-auto bg-[#2c1e14] text-white hover:bg-gray-800 transition-colors duration-200">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full text-center bg-[#cd8817] py-2 text-sm text-[#2c1e14]">
        <p className="flex items-center justify-center gap-1">
          Copyright <Copyright className="inline size-4" /> 2025 InstaFood. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;