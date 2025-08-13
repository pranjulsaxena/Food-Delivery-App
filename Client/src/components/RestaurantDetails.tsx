import  { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";
import { useRestaurantOrder } from "../../store/useRestaurantStore";
import { useParams } from "react-router-dom";

function RestaurantDetails() {
  const Params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantOrder();

  useEffect(() => {
    const demo = async () => {
      await getSingleRestaurant(Params.id!);
    };
    demo();
  }, []);

  return (
    <>
      {singleRestaurant && (
        <div className="max-w-6xl mx-auto my-10 px-2">
          <div className="relative w-full h-40 md:h-80 rounded-2xl overflow-hidden shadow-2xl mb-6 bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-400 dark:from-orange-700 dark:via-amber-900 dark:to-yellow-800">
            <img
              src={singleRestaurant.imageUrl}
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
              alt={singleRestaurant.restaurantName}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/25 dark:bg-black/60" />
            <div className="relative z-10 flex flex-col md:flex-row items-end justify-between h-full p-6 md:p-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
                  {singleRestaurant.restaurantName}
                </h1>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {singleRestaurant.cuisines.map((cuisine, idx) => (
                    <Badge key={idx} className="bg-white/80 dark:bg-gray-900/70 text-orange-700 dark:text-amber-300 px-3 py-1 font-medium rounded-md shadow">
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-900/80 rounded-full px-4 py-2 shadow-md backdrop-blur-sm mt-4 md:mt-0">
                <Timer className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <span className="font-medium text-orange-700 dark:text-amber-300">
                  Delivery Time: <span className="font-bold">{singleRestaurant.deliveryTime}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 border border-orange-100 dark:border-gray-700">
            <AvailableMenu />
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantDetails;
