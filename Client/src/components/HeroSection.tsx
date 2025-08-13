import  { useState} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, MapPin, Clock, Star, Sparkles } from "lucide-react";
import pizzaImage from "@/assets/pizza.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 dark:bg-orange-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/20 dark:bg-yellow-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-1 flex max-w-7xl flex-col md:flex-row mx-auto px-4 py-16 md:py-20 justify-center items-center gap-12 md:gap-16">
        <div className="flex flex-col md:w-[55%] gap-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium shadow-lg w-fit mx-auto md:mx-0">
            <Sparkles className="w-4 h-4" />
            #1 Food Delivery Platform
          </div>

          <div className="space-y-6">
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Order Food
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Anytime & Anywhere
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
              Hey! Our delicious food is waiting for you. We're always near to
              you with
              <span className="font-semibold text-orange-600 dark:text-orange-400">
                {" "}
                fast delivery
              </span>{" "}
              and
              <span className="font-semibold text-orange-600 dark:text-orange-400">
                {" "}
                fresh ingredients
              </span>
              .
            </p>
          </div>

          <div className="flex justify-center md:justify-start gap-8 text-center">
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
                50K+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Happy Customers
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
                1000+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Restaurants
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
                  4.8
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Rating
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-5 h-5 text-orange-500 dark:text-orange-400" />
              Find restaurants near you
            </h3>

            <div className="relative w-full max-w-[600px] mx-auto md:mx-0">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 p-2">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <Input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.code === "Enter" && searchText) {
                          navigate(`/search/${searchText}`);
                        }
                      }}
                      className="w-full pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                      placeholder="Search restaurant by name, city & country..."
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (searchText) navigate(`/search/${searchText}`);
                    }}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mr-1"
                    size="lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
              {["Pizza", "Burger", "Chinese", "Indian", "Italian"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchText(tag);
                      navigate(`/search/${tag}`);
                    }}
                    className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:border-orange-300 dark:hover:border-orange-600 hover:text-orange-700 dark:hover:text-orange-400 transition-all duration-200"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full w-fit">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              Average delivery time: 25-30 minutes
            </span>
          </div>
        </div>

        <div className="md:w-[45%] flex justify-center relative">
          <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-bounce">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Live Tracking
              </span>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-bounce delay-500">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                4.9 Rating
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-3xl opacity-20 scale-110"></div>
            <div className="relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full p-8 shadow-2xl">
              <img
                src={pizzaImage}
                alt="Delicious Pizza"
                className="w-full max-w-[450px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;
