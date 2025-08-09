import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRestaurantOrder } from "../../store/useRestaurantStore";
import {
  restaurantSchema,
  type restaurantType,
} from "@/schema/restaurantSchema";
import { Loader2, Sparkles, Image } from "lucide-react";

const Restaurant = () => {
  const {
    loading,
    createRestaurant,
    restaurant,
    updateRestaurant,
    getrestaurant,
  } = useRestaurantOrder();
  const [restaurantData, setRestaurantData] = useState<restaurantType>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    image: undefined,
  });

  const [errors, setErrors] = useState<Partial<restaurantType>>({});

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files?.length) {
      setRestaurantData({ ...restaurantData, image: files[0] });
    } else if (name === "deliveryTime") {
      setRestaurantData({ ...restaurantData, deliveryTime: Number(value) });
    } else {
      setRestaurantData({ ...restaurantData, [name]: value });
    }
  };

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantSchema.safeParse(restaurantData);
    if (!result.success) {
      const flattened = result.error.flatten();
      setErrors(flattened.fieldErrors as Partial<restaurantType>);
      return;
    }
    const formData = new FormData();
    formData.append("restaurantName", restaurantData.restaurantName);
    formData.append("city", restaurantData.city);
    formData.append("country", restaurantData.country);
    formData.append("deliveryTime", restaurantData.deliveryTime.toString());
    formData.append("cuisines", JSON.stringify(restaurantData.cuisines));

    if (restaurantData.image) {
      formData.append("image", restaurantData.image);
    }

    if (restaurant) {
      await updateRestaurant(formData);
    } else {
      await createRestaurant(formData);
    }
  };

  useEffect(() => {
    getrestaurant();
  }, [getrestaurant]);

  useEffect(() => {
    if (restaurant) {
      setRestaurantData({
        restaurantName: restaurant.restaurantName || "",
        city: restaurant.city || "",
        country: restaurant.country || "",
        deliveryTime: restaurant.deliveryTime || 0,
        cuisines: restaurant.cuisines
          ? restaurant.cuisines.map((cuisines: string) => cuisines)
          : [],
        image: undefined,
      });
    }
  }, [restaurant]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-700/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4" />
            {restaurant ? "Update Restaurant" : "Add Restaurant"}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-2">
            {restaurant ? "Update" : "Add"} Restaurant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill all details to add/update your restaurant.
          </p>
        </div>

        <form
          onSubmit={formHandler}
          encType="multipart/form-data"
          method="post"
          className="space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="restaurantName" className="font-bold text-gray-800 dark:text-gray-100">
                Restaurant Name
              </Label>
              <Input
                id="restaurantName"
                name="restaurantName"
                type="text"
                placeholder="Enter restaurant name"
                value={restaurantData.restaurantName}
                onChange={changeHandler}
                className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.restaurantName && (
                <span className="text-red-500 text-sm">{errors.restaurantName}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="font-bold text-gray-800 dark:text-gray-100">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="Enter city"
                value={restaurantData.city}
                onChange={changeHandler}
                className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="font-bold text-gray-800 dark:text-gray-100">Country</Label>
              <Input
                id="country"
                name="country"
                type="text"
                placeholder="Enter country"
                value={restaurantData.country}
                onChange={changeHandler}
                className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.country && (
                <span className="text-red-500 text-sm">{errors.country}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryTime" className="font-bold text-gray-800 dark:text-gray-100">Estimated Delivery (min)</Label>
              <Input
                id="deliveryTime"
                name="deliveryTime"
                type="number"
                placeholder="e.g. 30"
                value={restaurantData.deliveryTime}
                onChange={changeHandler}
                min={0}
                className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.deliveryTime && (
                <span className="text-red-500 text-sm">{errors.deliveryTime}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisines" className="font-bold text-gray-800 dark:text-gray-100">Cuisines (comma-separated)</Label>
            <Input
              id="cuisines"
              name="cuisines"
              type="text"
              value={restaurantData.cuisines.join(", ")}
              placeholder="e.g. Momos, Biryani, Chole Bhature"
              onChange={(e) =>
                setRestaurantData({
                  ...restaurantData,
                  cuisines: e.target.value.split(",").map((item) => item.trim()),
                })
              }
              className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {errors.cuisines && (
              <span className="text-red-500 text-sm">{errors.cuisines}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Image className="w-5 h-5 text-orange-500 dark:text-orange-400" />
              Restaurant Banner
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={changeHandler}
              className="h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
            />
            {errors.image && (
              <span className="text-red-500 text-sm">"Image is required"</span>
            )}
          </div>

          <div className="my-8 flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-1/2 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-bold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
              {loading
                ? "Submitting..."
                : restaurant
                ? "Update Restaurant"
                : "Add Restaurant"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Restaurant;
