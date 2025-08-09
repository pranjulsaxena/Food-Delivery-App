import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Earth,
  Globe,
  Globe2Icon,
  Mail,
  MapPin,
  Phone,
  Plus,
  Camera,
  User,
  Save,
  Sparkles,
  Edit3,
} from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type EventHandler,
  type FormEvent,
} from "react";
import unknown from "@/assets/unknown.jpg";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-menubar";
import { FaCity } from "react-icons/fa";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";

function Profile() {
  const { user, updatedetails, loading } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatedetails({ ...profileData });
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName,
        email: user.email,
        phone: user.contact.toString(),
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        profilePicture: user.profilePicture,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-600 dark:via-amber-600 dark:to-yellow-600">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <User className="w-4 h-4" />
            Profile Settings
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Your Profile
          </h1>
          <p className="text-lg text-white/90 drop-shadow">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 -mt-6 relative z-1">
        <form onSubmit={formHandler} className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 border dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-gray-700 dark:to-gray-600 p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="relative w-32 h-32">
                    <Avatar className="w-full h-full ring-4 ring-white dark:ring-gray-600 shadow-2xl">
                      <AvatarImage
                        src={profileData.profilePicture || unknown}
                        className="rounded-full w-full h-full object-cover"
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-2xl font-bold">
                        {profileData.fullName?.charAt(0) || "U"}
                      </AvatarFallback>
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
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full cursor-pointer backdrop-blur-sm"
                    >
                      <div className="bg-white/20 rounded-full p-3">
                        <Camera className="text-white w-6 h-6" />
                      </div>
                    </div>

                    <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full p-2 shadow-lg">
                      <Edit3 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Full Name
                    </Label>
                    <Input
                      className="text-2xl md:text-3xl font-bold border-0 bg-transparent shadow-none focus-visible:ring-0 text-gray-900 dark:text-gray-100 p-0"
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={changeHandler}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2 text-orange-600 dark:text-orange-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Profile Complete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 border dark:border-gray-700 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Personal Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Update your personal details and contact information
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  label: "Email Address",
                  name: "email",
                  icon: <Mail className="w-5 h-5" />,
                  type: "email",
                  disabled: true,
                  color: "text-blue-500",
                },
                {
                  label: "Phone Number",
                  name: "phone",
                  icon: <Phone className="w-5 h-5" />,
                  type: "text",
                  disabled: true,
                  color: "text-green-500",
                },
                {
                  label: "Address",
                  name: "address",
                  icon: <MapPin className="w-5 h-5" />,
                  type: "text",
                  color: "text-red-500",
                },
                {
                  label: "City",
                  name: "city",
                  icon: <FaCity className="w-5 h-5" />,
                  type: "text",
                  color: "text-purple-500",
                },
                {
                  label: "Country",
                  name: "country",
                  icon: <Globe className="w-5 h-5" />,
                  type: "text",
                  color: "text-orange-500",
                },
              ].map(({ label, name, icon, type, disabled, color }) => (
                <div
                  key={name}
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 ${color} bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm`}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 space-y-3">
                      <Label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        {label}
                      </Label>
                      <Input
                        name={name}
                        type={type}
                        value={profileData[name as keyof typeof profileData]}
                        onChange={changeHandler}
                        disabled={disabled}
                        className={`w-full border-0 bg-transparent shadow-none px-0 py-2 text-gray-900 dark:text-gray-100 focus-visible:ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                          disabled ? "cursor-not-allowed opacity-70" : ""
                        }`}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                      {disabled && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          Cannot be modified
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 border dark:border-gray-700 p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Save Changes
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Make sure all information is correct before saving
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6 py-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>

                {loading ? (
                  <Button
                    disabled
                    className="bg-gray-400 cursor-not-allowed px-8 py-3"
                  >
                    <Loader2 className="animate-spin mr-2 w-5 h-5" />
                    Updating...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <Save className="mr-2 w-5 h-5" />
                    Update Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
