import React from "react";
import { Copyright } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
function Footer() {
  return (
    <footer className="w-full text-[#2c1e14] bg-[#d1a154] flex flex-col">
      <div className="flex flex-col flex-wrap  md:flex-row mx-auto w-[80%] justify-between items-start md:items-center gap-6 py-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-bold text-2xl md:text-3xl md:font-extrabold">
            InstaFood
          </h1>
          <div className="flex flex-row items-center justify-center gap-5">
            <FaTwitter className="size-6" /> <FaWhatsapp className="size-6" />{" "}
            <FaInstagram className="size-6" /> <FaFacebook className="size-6" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-10">
          <div className="flex flex-col gap-y-1">
            <h2 className="font-semibold mb-1">Company</h2>
            <p>About</p>
            <p>Careers</p>
            <p>Press</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="font-semibold mb-1">Services</h2>
            <p>Pricing</p>
            <p>Restaurants</p>
            <p>Delivery</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="font-semibold mb-1">Contact</h2>
            <p>Help</p>
            <p>Support</p>
            <p>FAQs</p>
          </div>
          <div className="flex flex-col gap-y-3">
            <h2 className="font-semibold">Subscribe to our newsletter.</h2>
            <div className="relative flex flex-col gap-2 items-center">
              <Input
                className="mr-2 text-black border-1 border-black focus-visible:ring-0  focus-visible:border-2 focus-visible:border-black"
                type="email"
                placeholder="Enter your email"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center bg-[#cd8817]">
        <p>
          Copyright <Copyright className="inline size-5" /> 2025 InstaFood. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
