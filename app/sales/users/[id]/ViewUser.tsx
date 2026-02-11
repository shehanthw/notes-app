// src/app/products/[id]/page.tsx
"use client";

import { AlertCircle, Box, DollarSign, Package, Tag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserById } from "@/app/actions/users";

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
  phone: string;
}

const ViewUserPage = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-700";
      case "sales":
        return "bg-blue-100 text-blue-700";
      case "delivery":
        return "bg-green-100 text-green-700";
      case "collection":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await getUserById(parseInt(params.id as string));

        if (!userData) {
          setError("User not found");
          return;
        }

        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Loading User</h2>
          <button onClick={() => router.push("/sales/users")} className="mt-4 text-blue-600">
            ← Go back to users
          </button>
        </div>
      </div>
    );
  }

  //   if (!getUserDetails.name) {
  //     return (
  //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //         <div className="text-center">
  //           <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
  //           <h2 className="text-lg font-semibold">User not found</h2>
  //           <button onClick={() => router.push("/sales/users")} className="mt-4 text-blue-600">
  //             ← Back to Users
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div>
      {/* User Details */}
      <div className="p-4 space-y-4">
        {/* User Header */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{user?.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user!.role)}`}>
              {user?.role}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span>{user?.email}</span>
            <span>•</span>
            <span>{user?.phone}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="sticky bottom-0 bg-white border-t p-4 mt-6">
          <div className="flex gap-3">
            <Link
              href={`/Users/${user?.id}/edit`}
              className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-xl text-center font-semibold"
            >
              Edit User
            </Link>
            <button
              onClick={() => {
                if (window.confirm(`Delete ${user?.name}? This action cannot be undone.`)) {
                  // TODO: API call to delete
                  router.push("/Users");
                }
              }}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl text-center font-semibold"
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserPage;
