"use client";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

const DesktopMenu = ({ setShowMenu }: Props) => {
  // Local state to trigger the animation after mounting
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Trigger "slide in" once component mounts
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setShowMenu(false), 300); // Match duration-300
  };

  const menuItems = [
    { name: "Sales", path: "/sales" },
    { name: "Products", path: "/sales/products" },
    { name: "Customers", path: "/sales/customers" },
    { name: "Users", path: "/sales/users" },
  ];

  return (
    <>
      {/* Overlay Backdrop - helps the menu pop and allows closing on click outside */}
      <div 
        className={`fixed hidden lg:flex inset-0 bg-black/20 transition-opacity duration-300 z-90 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />

      <div
        className={`fixed top-0 right-0 h-screen bg-white lg:w-[20%] w-full z-100 shadow-md shadow-neutral-300 px-4 py-2 
          transform transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex text-4xl mb-6">
          <button className="cursor-pointer" onClick={handleClose}>
            ☰
          </button>
        </div>

        {menuItems.map((item, key) => (
          <div
            key={key}
            className="h-12 border-b-2 px-2 border-neutral-100 flex items-center bg-neutral-50 mb-1 text-neutral-500 font-medium
            hover:border-neutral-200 cursor-pointer hover:bg-neutral-200 transition-colors"
          >
            <Link href={item.path} className="w-full" onClick={handleClose}>
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default DesktopMenu;