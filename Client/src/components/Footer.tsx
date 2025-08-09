import React, { useState } from "react";
import { Copyright, Mail, MapPin, Phone, Heart, Sparkles, Send, ChefHat } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
     
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
       
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            
           
            <div className="lg:col-span-1 text-center lg:text-left">
              <div className="space-y-6">
                
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center ">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
                  <h1 className="font-bold text-4xl md:text-5xl text-white drop-shadow-lg">
                    InstaFood
                  </h1>
                </div>

                
                <p className="text-white/90 text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">
                  Delicious food delivered to your doorstep. Fast, fresh, and always satisfying.
                </p>

               
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg">Follow Us</h3>
                  <div className="flex justify-center lg:justify-start gap-4">
                    {[
                      { icon: FaTwitter, color: "hover:bg-blue-500", label: "Twitter" },
                      { icon: FaWhatsapp, color: "hover:bg-green-500", label: "WhatsApp" },
                      { icon: FaInstagram, color: "hover:bg-pink-500", label: "Instagram" },
                      { icon: FaFacebook, color: "hover:bg-blue-600", label: "Facebook" },
                      { icon: FaLinkedin, color: "hover:bg-blue-700", label: "LinkedIn" }
                    ].map(({ icon: Icon, color, label }, index) => (
                      <button
                        key={index}
                        className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:text-white ${color} hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Available in:",
                  icon: <MapPin className="w-4 h-4" />,
                  links: [
                    "Delhi", "Hyderabad", "Mumbai", 
                    "Bangalore", "Chennai", "Kolkata"
                  ],
                },
                {
                  title: "Company",
                  icon: <Sparkles className="w-4 h-4" />,
                  links: ["About", "Careers", "Press", "Teams"],
                },
                {
                  title: "Services",
                  icon: <Heart className="w-4 h-4" />,
                  links: ["Pricing", "Restaurants", "Delivery"],
                },
                {
                  title: "Legal",
                  icon: <Copyright className="w-4 h-4" />,
                  links: ["Terms & Conditions", "Privacy Policy", "Cookie Policy"],
                },
                {
                  title: "Contact",
                  icon: <Phone className="w-4 h-4" />,
                  links: ["Help", "Support", "FAQs"],
                },
              ].map((section, i) => (
                <div key={i} className="space-y-4">
                  <h2 className="flex items-center gap-2 font-bold text-lg text-white">
                    {section.icon}
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.links.map((link, j) => (
                      <li key={j}>
                        <button className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 transform text-left">
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

           
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="space-y-4">
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-white mx-auto mb-3" />
                    <h2 className="font-bold text-xl text-white mb-2">
                      Stay Updated
                    </h2>
                    <p className="text-white/80 text-sm">
                      Get the latest deals and updates delivered to your inbox.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Input
                      className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/30 rounded-xl h-12"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      onClick={handleSubscribe}
                      disabled={isSubscribed}
                      className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {isSubscribed ? (
                        <>
                          <Heart className="w-4 h-4 mr-2 fill-current" />
                          Subscribed!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Subscribe
                        </>
                      )}
                    </Button>
                  </div>

                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">50K+</div>
                      <div className="text-white/60 text-xs">Subscribers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">Daily</div>
                      <div className="text-white/60 text-xs">Updates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/20"></div>
          <div className="relative backdrop-blur-sm border-t border-white/20">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Copyright className="w-4 h-4" />
                  <span className="text-sm">
                    2025 InstaFood. All rights reserved.
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 fill-red-400 text-red-400 animate-pulse" />
                  <span>in India</span>
                </div>
                
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <button className="hover:text-white transition-colors">
                    Privacy
                  </button>
                  <span>•</span>
                  <button className="hover:text-white transition-colors">
                    Terms
                  </button>
                  <span>•</span>
                  <button className="hover:text-white transition-colors">
                    Cookies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
