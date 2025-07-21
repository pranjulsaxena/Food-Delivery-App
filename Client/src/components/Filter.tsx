import React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useRestaurantOrder } from "../../store/useRestaurantStore";

function Filter() {
  type filterOptionState = {
    id: string;
    label: string;
  };

  const filteredCuisines = useRestaurantOrder(
    (state) => state.filteredCuisines
  );

  const setfilteredCuisines = useRestaurantOrder(
    (state) => state.setfilteredCuisines
  );

  const filterOptions: filterOptionState[] = [
    { id: "burger", label: "Burger" },
    { id: "thali", label: "Thali" },
    { id: "biryani", label: "Biryani" },
    { id: "momos", label: "Momos" },
  ];

  const appliedFilterHandler = (label: string) => {
    const isFiltered = filteredCuisines.includes(label);
    let newString: string[];

    if (!isFiltered) {
      newString = [...filteredCuisines, label];
    } else {
      newString = filteredCuisines.filter((cuisines) => cuisines !== label);
    }

   
    setfilteredCuisines(newString); 
  };

  return (
    <div className="md:w-72 w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-lg text-gray-800">
          Filter by Cuisines
        </h1>
        <Button
          variant="link"
          className="text-sm text-[#D19254] hover:underline"
          onClick={()=>{setfilteredCuisines([])}}
        >
          Reset
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {filterOptions.map((filter, index) => (
          <div
            key={index}
            className="flex items-center gap-3 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
          >
            <Checkbox
              id={filter.id}
              checked={filteredCuisines.includes(filter.label)}
              onClick={() => appliedFilterHandler(filter.label)}
              className="accent-[#D19254]"
            />
            <Label htmlFor={filter.id} className="cursor-pointer text-gray-700">
              {filter.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
