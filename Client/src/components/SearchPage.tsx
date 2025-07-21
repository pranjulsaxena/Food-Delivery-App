import React, { useEffect, useState, type ChangeEvent } from "react";
import { Link, Links, useParams, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Filter from "./Filter";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import pizzaImage from "@/assets/pizza.png";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SearchPageSkeleton from "./SearchPageSkeleton";
import { useRestaurantOrder } from "../../store/useRestaurantStore";

function SearchPage() {
  const Params = useParams();
  const { filteredCuisines, searchRestaurant ,searchedrestaurant,loading} = useRestaurantOrder();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    
      searchRestaurant(Params.text!, searchQuery, filteredCuisines.join(","));
      console.log(searchedrestaurant);
 
  }, [Params.text!,searchQuery,filteredCuisines]);
  if (loading){
    return <SearchPageSkeleton/>
  }
  return (
    <>{searchedrestaurant?<div className="max-w-10xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-5 my-10">
      <Filter />
      <div className="flex-1 flex flex-col">
        <div className="w-full flex gap-2 px-1">
          <Input
            placeholder="Search by restaurant & cuisines"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black"
          ></Input>
          <Button className="bg-[#D19254] text-white">Search</Button>
        </div>

        <div className="">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3 ">
            <div className="">
              <h2 className="font-bold">{searchedrestaurant.length} Search results found</h2>
              <div>
                {["Biryani", "Momos", "Chole Bhature"].map(
                  (selectedFilter, idx) => (
                    <div key={idx} className="inline-flex mr-2 relative">
                      <Badge
                        className="bg-white text-[#D19254] w-full flex gap-2 items-center rounded-md hover:cursor-pointer"
                        variant="outline"
                      >
                        <span className="md:text-md">{selectedFilter}</span>
                        <div className="">
                          <X className="size-4" />
                        </div>
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Searched items displayed here  */}
        <div className="grid md:grid-cols-3 gap-4 mx-auto md:w-full py-6">
          {searchedrestaurant.map((restaurant, index) => (
            <Card
              key={index}
              className="w-[300px] overflow-hidden rounded-md shadow-2xl  pb-0"
            >
              <div className="relative">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={restaurant.imageUrl}
                    alt="Delicious pizza"
                    className="size-full  object-cover rounded-md"
                  />
                </AspectRatio>
                <div className="absolute text-gray-700 top-1 left-1 bg-white/65 rounded-md px-2 py-1">
                  Featured
                </div>
              </div>
              <CardContent className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{restaurant.restaurantName}</h1>

                <div className="flex items-center  text-gray-600 text-sm">
                  <MapPin className=" mr-1" />
                  City: <span className="font-bold mx-1">{restaurant.city}</span>
                </div>
                <div className="flex text-gray-600 text-sm">
                  <Globe className="mr-1" /> Country:
                  <span className="font-bold mx-1">{restaurant.country}</span>
                </div>

                <div>
                  {restaurant.cuisines.map(
                    (cuisine: string, idx: number) => (
                      <div key={idx} className="inline-flex mr-2 relative">
                        <Badge
                          className=" w-full flex gap-2 items-center rounded-md hover:cursor-pointer"
                          variant="default"
                        >
                          <span className="md:text-md">{cuisine}</span>
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                <Link to={`/restaurant/${restaurant._id}`}>
                  <Button className="rounded-full bg-[#D19254] hover:bg-[#d18c47] transition-colors duration-300 font-semibold shadow-md px-4 pt-2">
                    View More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>:<NoResultFound searchText={"Mumbai"}/>}</>
  );
}

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for {searchText}. <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default SearchPage;
