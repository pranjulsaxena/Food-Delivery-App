import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { menuSchema, type MenuType } from "@/schema/menuSchema";

const EditMenu = ({
  editOpen,
  setEditOpen,
  selectedInput,
}: {
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
  selectedInput: MenuType;
}) => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState<MenuType>({
    Name: "",
    Description: "",
    Price: 0,
    MenuImage: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MenuType, string>>>({});

  useEffect(() => {
    setInputData(selectedInput);
  }, [selectedInput]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;

    if (type === "file" && files?.length) {
      setInputData({ ...inputData, MenuImage: files[0] });
    } else if (name === "Price") {
      setInputData({ ...inputData, Price: Number(value) });
    } else {
      setInputData({ ...inputData, [name]: value });
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = menuSchema.safeParse(inputData);
if (!result.success) {
  const fieldErrors = result.error.flatten().fieldErrors;
  const errorMap: Partial<Record<keyof MenuType, string>> = {};

  Object.entries(fieldErrors).forEach(([key, value]) => {
    errorMap[key as keyof MenuType] = value?.[0] ?? "";
  });

  setErrors(errorMap);
  return;
}


    setErrors({});
    setLoading(true);

    setTimeout(() => {
      console.log("Validated Menu Data:", inputData);
      setLoading(false);
      setEditOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit Menu Item</DialogTitle>
          <DialogDescription className="text-center">
            Update your offerings to keep your menu fresh and exciting.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="Name">Name</Label>
              <Input
                id="Name"
                name="Name"
                type="text"
                value={inputData.Name}
                onChange={changeHandler}
              />
              {errors.Name && <p className="text-sm text-red-500">{errors.Name}</p>}
            </div>

            <div>
              <Label htmlFor="Description">Description</Label>
              <Input
                id="Description"
                name="Description"
                type="text"
                value={inputData.Description}
                onChange={changeHandler}
              />
              {errors.Description && (
                <p className="text-sm text-red-500">{errors.Description}</p>
              )}
            </div>

            <div>
              <Label htmlFor="Price">Price</Label>
              <Input
                id="Price"
                name="Price"
                type="number"
                value={inputData.Price}
                onChange={changeHandler}
              />
              {errors.Price && <p className="text-sm text-red-500">{errors.Price}</p>}
            </div>

            <div>
              <Label htmlFor="MenuImage">Menu Image</Label>
              <Input
                id="MenuImage"
                name="MenuImage"
                type="file"
                accept="image/*"
                onChange={changeHandler}
              />
              {errors.MenuImage && (
                <p className="text-sm text-red-500">{errors.MenuImage}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#D19254] hover:bg-[#d18c47]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-4 h-4" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
