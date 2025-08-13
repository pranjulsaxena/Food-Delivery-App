import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useRestaurantOrder } from "../../store/useRestaurantStore";
import { Sparkles } from "lucide-react"; // fun icon for heading
import type { useRestaurantType } from "@/Types/restaurantTypes";

function Filter() {
  const filterOptions = [
    { id: "burger", label: "Burger" },
    { id: "thali", label: "Thali" },
    { id: "biryani", label: "Biryani" },
    { id: "momos", label: "Momos" },
  ];
  const filteredCuisines = useRestaurantOrder((state:useRestaurantType) => state.filteredCuisines);
  const setfilteredCuisines = useRestaurantOrder((state:useRestaurantType) => state.setfilteredCuisines);

  const appliedFilterHandler = (label: string) => {
    const isFiltered = filteredCuisines.includes(label);
    if (!isFiltered) setfilteredCuisines([...filteredCuisines, label]);
    else setfilteredCuisines(filteredCuisines.filter((c:string) => c !== label));
  };

  return (
    <div className="w-full md:w-72 p-6 bg-white/90 dark:bg-gray-900/95 rounded-2xl shadow-xl border border-orange-100 dark:border-gray-700 transition-all z-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
          <Sparkles className="w-5 h-5 text-orange-500 dark:text-orange-400" />
          Filter by Cuisines
        </h1>
        <Button
          variant="ghost"
          className="text-sm text-orange-600 dark:text-orange-400 font-bold p-0 hover:underline"
          onClick={() => setfilteredCuisines([])}
        >
          Reset
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {filterOptions.map((filter, index) => (
          <div
            key={index}
            className="flex items-center gap-3 hover:bg-orange-50 dark:hover:bg-orange-900/30 px-2 py-2 rounded-md transition-colors"
          >
            <Checkbox
              id={filter.id}
              checked={filteredCuisines.includes(filter.label)}
              onClick={() => appliedFilterHandler(filter.label)}
              className="accent-orange-500 dark:accent-orange-400 border border-gray-300 dark:border-gray-700"
            />
            <Label
              htmlFor={filter.id}
              className="cursor-pointer text-md text-gray-900 dark:text-gray-100"
            >
              {filter.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
