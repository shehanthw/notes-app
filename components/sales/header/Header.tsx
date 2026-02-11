import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Profile from "../profile/Profile";
import { usePathname } from "next/navigation";

interface Props {
  setShowProfile: Dispatch<SetStateAction<boolean>>;
  showProfile: boolean;
}

const Header = ({ setShowProfile, showProfile }: Props) => {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    pathname.includes("products") && setPageTitle("Products");
    pathname.includes("users") && setPageTitle("Users");
    pathname === ("/sales") && setPageTitle("Sales");
  }, [pathname]);

  return (
    <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
          <p className="text-sm text-gray-500">Today, 25 Jan</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-1" onClick={() => setShowProfile(true)}>
            <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">J</span>
            </div>
          </button>
          {showProfile && <Profile setShowProfile={setShowProfile} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
