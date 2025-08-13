import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Filter from "./Filter";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X,  Search as SearchIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SearchPageSkeleton from "./SearchPageSkeleton";
import { useRestaurantOrder } from "../../store/useRestaurantStore";

function SearchPage() {
  const Params = useParams();
  const { filteredCuisines, searchRestaurant, searchedrestaurant, loading, setfilteredCuisines } =
    useRestaurantOrder();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    searchRestaurant(Params.text!, "", filteredCuisines.join(","));
  }, [Params.text!, filteredCuisines]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-6 py-10">
        <div className="sticky top-4 z-20 md:w-72">
          <Filter />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="w-full flex gap-2  items-center px-1 mb-3">
            <div className="relative flex-1">
              <Input
                placeholder="Search by restaurant or cuisines…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") searchRestaurant(Params.text!, searchQuery, filteredCuisines.join(","));
                }}
                className="w-full py-3 pl-12 pr-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all focus:border-orange-500 dark:focus:border-orange-400 shadow hover:shadow-md"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 dark:text-orange-300 w-5 h-5" />
            </div>
            <Button
              className="rounded-xl h-fit px-6 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold shadow-lg transition-all"
              onClick={() => searchRestaurant(Params.text!, searchQuery, filteredCuisines.join(","))}
            >
              Search
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {searchedrestaurant.length} Search Result{searchedrestaurant.length !== 1 ? "s" : ""} found
              </h2>
              {filteredCuisines.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {filteredCuisines.map((selectedFilter, idx) => (
                    <Badge
                      key={idx}
                      className="bg-white/80 dark:bg-gray-800 border dark:border-gray-700 text-orange-600 dark:text-orange-400 flex items-center gap-1 rounded-lg font-medium transition cursor-pointer shadow"
                      variant="outline"
                      onClick={() => setfilteredCuisines(
                        filteredCuisines.filter((c) => c !== selectedFilter)
                      )}
                    >
                      <span>{selectedFilter}</span>
                      <X className="size-4" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {filteredCuisines.length ? (
              <Button
                variant="ghost"
                className="text-red-600 dark:text-red-400 font-medium px-3 py-2"
                onClick={() => setfilteredCuisines([])}
              >
                Reset all filters
              </Button>
            ) : null}
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-full md:w-full py-4">
            {loading ? (
              <SearchPageSkeleton />
            ) : searchedrestaurant.length === 0 ? (
              <NoResultFound searchTerm={Params.text!} />
            ) : (
              searchedrestaurant.map((restaurant, index) => (
                <Card
                  key={restaurant._id || index}
                  className="overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={restaurant.imageUrl}
                        alt="Restaurant preview"
                        className="object-cover rounded-t-2xl w-full h-full"
                        loading="lazy"
                      />
                    </AspectRatio>
                    <div className="absolute text-gray-700 dark:text-amber-300 top-2 left-2 bg-white/80 dark:bg-black/60 rounded-md px-3 py-1 text-xs font-semibold shadow">
                      Featured
                    </div>
                  </div>
                  <CardContent className="flex flex-col gap-2 py-4">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent dark:from-orange-300 dark:to-amber-200">
                      {restaurant.restaurantName}
                    </h1>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin className="mr-1 w-4 h-4" />
                      City: <span className="font-semibold mx-1">{restaurant.city}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                      <Globe className="mr-1 w-4 h-4" />
                      Country: <span className="font-semibold mx-1">{restaurant.country}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {restaurant.cuisines.map((cuisine, idx) => (
                        <Badge
                          key={idx}
                          className="bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full font-medium text-xs"
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-end">
                    <Link to={`/restaurant/${restaurant._id}`} className="w-full">
                      <Button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-700 dark:to-amber-700 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md px-6 py-2 transition-all duration-200">
                        View More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const NoResultFound = ({ searchTerm = "" }: { searchTerm?: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-10">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      No results found
    </h1>
    <p className="text-gray-500 dark:text-gray-300 mb-4">
      We couldn't find any restaurants for <span className="text-orange-600 dark:text-orange-400">&quot;{searchTerm}&quot;</span>. <br />
      Try searching with a different term.
    </p>
    <Link to="/">
      <Button className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-700 dark:to-amber-700 text-white font-semibold mt-2">
        Go Back to Home
      </Button>
    </Link>
  </div>
);

export default SearchPage;
