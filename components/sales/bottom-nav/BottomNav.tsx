import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  setShowWizard: Dispatch<SetStateAction<boolean>>;
  setShowProductWizard: Dispatch<SetStateAction<boolean>>;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  setShowUserWizard: Dispatch<SetStateAction<boolean>>;
}

const BottomNav = ({ setShowWizard, setShowProductWizard, setShowMenu, setShowUserWizard }: Props) => {
   const pathname = usePathname();

  const navLinks = [
    { id: 1, icon: "📋", path: "/sales" },
    { id: 2, icon: "📦", path: "/sales/products" },
  ];

  const showWizard = () => {
    if(pathname === "/sales/products") {
      setShowProductWizard(true);
    }

    if(pathname === "/sales") {
      setShowWizard(true);
    }

    if(pathname === "/sales/users") {
      setShowUserWizard(true);
    }
  }

  useEffect(() => {
    console.log(pathname)
  }, [pathname]);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around py-3">
        <button
          onClick={() => setShowMenu(true)}
          className="h-12 w-12 flex items-center justify-center text-2xl active:scale-95 transition-transform"
        >
          ☰
        </button>
        {navLinks.map((item, key) => (
          <Link key={key} className="text-2xl p-2" href={item.path}>
            {item.icon}
          </Link>
        ))}
        <button
          onClick={() => showWizard()}
          className="h-12 w-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform"
        >
          ＋
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
