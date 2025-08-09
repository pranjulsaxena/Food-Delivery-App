import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger, DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Camera, DollarSign, FileText, Tag, Edit3, Sparkles } from "lucide-react";
import EditMenu from "@/components/EditMenu";
import { useMenuStore } from "../../store/useMenuStore";
import { useRestaurantOrder } from "../../store/useRestaurantStore";

type MenuItem = {
  Name: string;
  Description: string;
  Price: number;
  MenuImage: File | string | undefined;
  id?: string;
};

const AddMenu = () => {
  const { restaurant, getrestaurant } = useRestaurantOrder();
  const { loading, createMenu, menu } = useMenuStore();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedInput, setSelectedInput] = useState<MenuItem>({
    Name: "",
    Description: "",
    Price: 0,
    MenuImage: "",
    id: "",
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createMenu(formdata);
    setOpen(false);
    setInput({
      Name: "",
      Description: "",
      Price: 0,
      MenuImage: undefined,
    });
  };

  useEffect(() => {
    getrestaurant();
  }, [menu]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-600 dark:via-amber-600 dark:to-yellow-600">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Menu Management
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Craft Your Perfect Menu
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
            Create delicious menu items that will make customers hungry just by looking at them
          </p>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Plus className="mr-2 w-5 h-5" />
                Add New Menu Item
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-0 dark:border dark:border-gray-700">
              <DialogHeader className="text-center pb-2">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                  Create New Dish
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Add a mouth-watering item to your menu
                </DialogDescription>
              </DialogHeader>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="group">
                    <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <Tag className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      Dish Name
                    </Label>
                    <Input
                      name="Name"
                      value={input.Name}
                      onChange={handleChange}
                      placeholder="e.g., Margherita Pizza"
                      className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="group">
                    <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FileText className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      Description
                    </Label>
                    <Input
                      name="Description"
                      value={input.Description}
                      onChange={handleChange}
                      placeholder="Describe your delicious dish..."
                      className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="group">
                    <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <DollarSign className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      Price (₹)
                    </Label>
                    <Input
                      name="Price"
                      type="number"
                      value={input.Price}
                      onChange={handleChange}
                      placeholder="299"
                      className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="group">
                    <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <Camera className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      Upload Image
                    </Label>
                    <div className="relative">
                      <Input
                        type="file"
                        name="MenuImage"
                        accept="image/*"
                        onChange={handleChange}
                        className="h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-100 dark:file:bg-orange-900/50 file:text-orange-700 dark:file:text-orange-300 hover:file:bg-orange-200 dark:hover:file:bg-orange-900/70 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2 w-4 h-4" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 w-4 h-4" />
                        Add to Menu
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 -mt-8 relative z-1">
        {(!data || data.length === 0) ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-12 text-center border dark:border-gray-700">
            <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-orange-500 dark:text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Menu Items Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start building your delicious menu by adding your first dish!</p>
            <Button 
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Add Your First Dish
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item: any, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl dark:hover:shadow-black/30 transition-all duration-300 overflow-hidden hover:-translate-y-1 border dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      typeof item.imageUrl === "string"
                        ? item.imageUrl
                        : item.imageUrl
                        ? URL.createObjectURL(item.imageUrl)
                        : "/api/placeholder/300/200"
                    }
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Button
                    size="sm"
                    className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full border dark:border-gray-600"
                    onClick={() => {
                      setSelectedInput({
                        Name: item.name,
                        Description: item.description,
                        Price: item.price,
                        MenuImage: item.imageUrl,
                        id: item._id.toString(),
                      });
                      setEditOpen(true);
                    }}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                      ₹{item.price}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Popular</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EditMenu
        selectedInput={selectedInput}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
