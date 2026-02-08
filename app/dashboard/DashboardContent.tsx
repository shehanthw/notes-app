"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    [key: string]: any;
  };
}

export default function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div className="p-5">
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="px-3 py-1 bg-red-600 text-white rounded-md mb-5"
      >
        Logout
      </button>
      <div>Welcome, {user?.name}</div>

      <div className="">
        <div className="border-slate-300 bg-white rounded-sm px-2 py-2 text-center min-h-18 flex justify-center items-center mb-2 shadow-lg">
          Sales
        </div>

        <div className="border-slate-300 bg-white rounded-sm px-2 py-2 text-center min-h-18 flex justify-center items-center mb-2 shadow-lg">
          Inventory
        </div>

        <div className="border-slate-300 bg-white rounded-sm px-2 py-2 text-center min-h-18 flex justify-center items-center mb-2 shadow-lg">
          Customers
        </div>
      </div>
    </div>
  );
}
