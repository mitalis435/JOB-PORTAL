import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2, Camera, X, Eye } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    resume: "",
    profilephoto: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    
    if (input.profilephoto instanceof File) {
      formData.append("profilePhoto", input.profilephoto);
    }
    if (input.resume instanceof File) {
      formData.append("resume", input.resume);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setProfilePreview(null);
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="flex flex-col items-center gap-4 py-4 border-b">
            <img
              src={profilePreview || user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />

            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                <Eye className="mr-2 h-4 w-4" /> View
              </Button>
              <label htmlFor="photoInput" className="cursor-pointer flex items-center bg-primary text-white px-3 py-1.5 rounded-md text-sm hover:bg-primary/90">
                <Camera className="mr-2 h-4 w-4" /> Change
              </label>
              <input
                type="file"
                id="photoInput"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setInput({ ...input, profilephoto: file });
                    setProfilePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="name">Name</Label>
              <input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} className="col-span-1 sm:col-span-3 border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="email">Email</Label>
              <input type="email" name="email" value={input.email} onChange={changeEventHandler} className="col-span-1 sm:col-span-3 border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="phone">Phone</Label>
              <input type="tel" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-1 sm:col-span-3 border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="bio">Bio</Label>
              <input type="text" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-1 sm:col-span-3 border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="skills">Skills</Label>
              <input name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-1 sm:col-span-3 border border-gray-300 rounded-md p-2 w-full" placeholder="Ex: React, Node, MongoDB" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="resume">Resume</Label>
              <input type="file" onChange={(e) => setInput({ ...input, resume: e.target.files[0] })} className="col-span-1 sm:col-span-3 border border-gray-300 rounded-md p-2 w-full" />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
              </Button>
            ) : (
              <Button type="submit">Save Changes</Button>
            )}
          </DialogFooter>
        </form>

        {showPreview && (
          <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white p-2 rounded-lg relative max-w-sm w-full">
              <button type="button" onClick={() => setShowPreview(false)} className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300">
                <X size={20} />
              </button>
              <img src={profilePreview || user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="Preview" className="w-full h-auto rounded" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;