import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import EditMenu from "@/components/EditMenu";
import pizzaImage from "@/assets/pizza.png";
import { useMenuStore } from "../../store/useMenuStore";
import { useRestaurantOrder } from "../../store/useRestaurantStore";

type MenuItem = {
  Name: string;
  Description: string;
  Price: number;
  MenuImage: File | string | undefined;
};

const AddMenu = () => {

  const {restaurant,getrestaurant} = useRestaurantOrder();
  const { loading, createMenu,menu } = useMenuStore();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedInput, setSelectedInput] = useState<MenuItem>({
    Name: "",
    Description: "",
    Price: 0,
    MenuImage: "",
  });
  const [input, setInput] = useState<MenuItem>({
    Name: "",
    Description: "",
    Price: 0,
    MenuImage: undefined,
  });

  const formdata = new FormData();

  formdata.append("name", input.Name);
  formdata.append("description", input.Description);
  formdata.append("price", input.Price.toString());

  if (input.MenuImage) {
    formdata.append("image", input.MenuImage);
  }

 

    const data = restaurant?.menus;
    console.log(data);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files?.length) {
      setInput((prev) => ({ ...prev, MenuImage: files[0] }));
    } else {
      setInput((prev) => ({
        ...prev,
        [name]: name === "Price" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", input);
    await createMenu(formdata);
    // simulate network delay
  };
  useEffect(()=>{
    getrestaurant()
  },[menu])
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold">Add Menus</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#D19C54] hover:bg-[#d18c47]">
              <Plus className="mr-2" /> Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Add New Menu</DialogTitle>
              <DialogDescription className="text-center">
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {[
                {
                  label: "Name",
                  name: "Name",
                  type: "text",
                  value: input.Name,
                },
                {
                  label: "Description",
                  name: "Description",
                  type: "text",
                  value: input.Description,
                },
                {
                  label: "Price (in ₹)",
                  name: "Price",
                  type: "number",
                  value: input.Price,
                },
              ].map(({ label, name, type, value }) => (
                <div key={name}>
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    name={name}
                    type={type}
                    value={value}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div>
                <Label htmlFor="MenuImage">Upload Menu Image</Label>
                <Input
                  type="file"
                  name="MenuImage"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <div className="w-full">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#D19254] hover:bg-[#d18c47]"
                    >
                      {loading && (
                        <Loader2 className="animate-spin mr-2 w-4 h-4" />
                      )}
                      {loading ? "Adding..." : "Add"}
                    </Button>
                  </div>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menu Items */}
      <div className="mt-10 space-y-4">
        {data&&data.map((item:any, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-3 items-center shadow-lg p-4 rounded-md"
          >
            <img
              src={
                typeof item.imageUrl === "string"
                  ? item.imageUrl
                  : item.imageUrl
                  ? URL.createObjectURL(item.imageUrl)
                  : ""
              }
              className="h-16 w-full md:w-24 md:h-24 object-cover"
              alt={item.name}
            />
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-extrabold text-gray-800">
                {item.name}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">₹{item.price}</span>
              </h2>
            </div>
            <Button
              className="bg-[#D19254] hover:bg-[#d18c47]"
              onClick={() => {
                setSelectedInput({Name:item.name,Description:item.description,Price:item.price,MenuImage:item.imageUrl})
                setEditOpen(true);
              }}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <EditMenu
        selectedInput={selectedInput}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
