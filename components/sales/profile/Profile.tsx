import { X } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { signOut } from "next-auth/react";

interface Props {
  setShowProfile: Dispatch<SetStateAction<boolean>>;
}

const Profile = ({ setShowProfile }: Props) => {
  return (
    <div className="absolute right-0 top-0 h-screen w-screen bg-white border text-md py-2 rounded-md">
      <div className="flex items-center justify-between w-full px-4 py-3">
        <div></div>
        <div className="text-center">
          <div className="font-semibold text-lg">Profile</div>
          <div className="text-xs text-gray-500">User details</div>
        </div>

        <button onClick={() => setShowProfile(false)} className="p-2">
          <X className="h-5 w-5" />
        </button>
      </div>
    
      <div className="h-10 px-6 border-b border-neutral-200/50 flex items-center">
        Shehanth Wanigasinghe
      </div>
      <div className="h-10 px-6 border-b border-neutral-200/50 flex items-center">Admin</div>
      <div className="h-10 px-6 border-b border-neutral-200/50 flex items-center">0718716076</div>
      <div className="h-18 px-6 border-neutral-200/50 flex items-center">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-3 py-1 bg-red-600 text-white rounded-md mb-5"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
