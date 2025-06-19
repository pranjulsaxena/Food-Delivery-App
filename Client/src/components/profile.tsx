import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Earth, Globe, Globe2Icon, Mail, MapPin, Phone, Plus } from "lucide-react";
import React, {useRef,useState,type ChangeEvent,type EventHandler, type FormEvent} from "react";
import unknown from "@/assets/unknown.jpg";
import  { Input } from "./ui/input";
import  { Label } from "@radix-ui/react-menubar";
import { FaCity } from "react-icons/fa";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";


function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(unknown);
  const [Loading, setLoading] = useState<boolean>(false);
   const [profileData, setProfileData] = useState({
    fullname:"",
    email:"",
    phone:"",
    address:"",
    city:"",
    country:"",
    profilePicture:""
  })

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const changeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
    setProfileData({...profileData,[name]:value})
  }

  const formHandler = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }
  return (
    <form onSubmit={formHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="relative size-20 group">
            <Avatar className="size-full">
              <AvatarImage src={imageUrl} className="rounded-full size-full object-cover border-black border-1"  />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              type="file"
              accept="image/*"
            />
            <div
              onClick={handleClick}
              className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-200 transition-opacity duration-300 rounded-full cursor-pointer"
            >
              <Plus className="text-white size-8" />
            </div>
          </div>
        </div>
      <Input className=" focus-visible:ring-0 outline-0 border-0 shadow-none text-2xl md:text-3xl font-extrabold" type="text"  name = "fullname" value={profileData.fullname} onChange={changeHandler}/>

      </div>
      <div className="grid md:grid-cols-4 my-10 gap-3 px-2 ">
        {[{
          label: 'Email', name: 'email', icon: <Mail />, type: 'email'
        }, {
          label: 'Address', name: 'address', icon: <MapPin />, type: 'text'
        }, {
          label: 'City', name: 'city', icon: <FaCity className='size-5' />, type: 'text'
        }, {
          label: 'Country', name: 'country', icon: <Globe />, type: 'text'
        }, {
          label: 'Phone', name: 'phone', icon: <Phone />, type: 'text', disabled: true
        }].map(({ label, name, icon, type, disabled }) => (
          <div key={name} className="flex items-start gap-3 bg-gray-100 p-4 rounded-xl">
            <div className="mt-1 text-gray-500">{icon}</div>
            <div className="w-full">
              <Label className="block text-sm font-medium text-gray-700 mb-1">{label}</Label>
              <Input
                name={name}
                type={type}
                value={profileData[name as keyof typeof profileData]}
                onChange={changeHandler}
                disabled={disabled}
                className="w-full border-none text-gray- shadow-none px-0 py-1 text-sm bg-transparent focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        {Loading ? (
            <Button disabled={true}
              className=" bg-[#D19254] hover:bg-[#d18c47] cursor-not-allowed"
            >
              <Loader2 className="animate-spin mr-2 w-4 h-4"></Loader2>Loading
              ...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-[#D19254] hover:bg-[#d18c47]"
            >
              Update
            </Button>
          )}
      </div>
    </form>
  );
}

export default Profile;
