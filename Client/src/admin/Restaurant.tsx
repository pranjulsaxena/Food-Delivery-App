import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useRestaurantOrder} from "../../store/useRestaurantStore";
import {
  restaurantSchema,
  type restaurantType,
} from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";

const Restaurant = () => {
  const {loading,createRestaurant,restaurant,updateRestaurant}:any = useRestaurantOrder();
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

  const formHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const result = restaurantSchema.safeParse(restaurantData);
    if (!result.success) {
      const flattened = result.error.flatten();
      setErrors(flattened.fieldErrors as Partial<restaurantType>);
      return;
    }
    // api implementation starts here
    const formData = new FormData();
    formData.append("restaurantName",restaurantData.restaurantName);
    formData.append("city",restaurantData.city);
    formData.append("country",restaurantData.country);
    formData.append("deliveryTime",restaurantData.deliveryTime.toString());
    formData.append("cuisines",JSON.stringify(restaurantData.cuisines));

    if(restaurantData.image){
      formData.append("image",restaurantData.image);
    }
    
   if(restaurant){
      await updateRestaurant(formData);
   }else{
      await createRestaurant(formData);
   }
  };


  
  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="text-2xl md:text-3xl font-bold md:font-extrabold">
        Add Restaurant
      </h1>

      <form onSubmit={formHandler} encType="multipart/form-data" method="post">
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="restaurantName">Restaurant Name</Label>
            <Input
              id="restaurantName"
              name="restaurantName"
              type="text"
              placeholder="Enter restaurant name"
              value={restaurantData.restaurantName}
              onChange={changeHandler}
            />
            {errors.restaurantName && (
              <span className="text-red-500 text-sm">{errors.restaurantName}</span>
            )}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="Enter city"
              value={restaurantData.city}
              onChange={changeHandler}
            />
            {errors.city && (
              <span className="text-red-500 text-sm">{errors.city}</span>
            )}
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              type="text"
              placeholder="Enter country"
              value={restaurantData.country}
              onChange={changeHandler}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country}</span>
            )}
          </div>

          <div>
            <Label htmlFor="deliveryTime">Estimated Delivery Time (minutes)</Label>
            <Input
              id="deliveryTime"
              name="deliveryTime"
              type="number"
              placeholder="e.g. 30"
              value={restaurantData.deliveryTime}
              onChange={changeHandler}
            />
            {errors.deliveryTime && (
              <span className="text-red-500 text-sm">{errors.deliveryTime}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="cuisines">Cuisines (comma-separated)</Label>
            <Input
              id="cuisines"
              name="cuisines"
              type="text"
              placeholder="e.g. Momos, Biryani, Chole Bhature"
              onChange={(e) =>
                setRestaurantData({
                  ...restaurantData,
                  cuisines: e.target.value.split(",").map((item) => item.trim()),
                })
              }
            />
            {errors.cuisines && (
              <span className="text-red-500 text-sm">{errors.cuisines}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="image">Restaurant Banner</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={changeHandler}
            />
            {errors.image && (
              <span className="text-red-500 text-sm">{}</span>
            )}
          </div>
        </div>

        <div className="my-10 flex justify-center">
          <Button
            type="submit"
            className="w-full md:w-fit bg-[#D19254] hover:bg-[#d18c47]"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
            {loading ? "Submitting..." : restaurant?"Update":"Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
