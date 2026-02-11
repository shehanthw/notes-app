"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import PageTitle from "@/components/sales/page-title/PageTitle";
import { Edit, Eye, MoreVertical, Search, Trash2 } from "lucide-react";
import { getAllUsers } from '@/app/actions/users';

// Define User type matching your Prisma schema
interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
  phone: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      if (data) {
        setUsers(data);
        setFilteredUsers(data);
      }
    } catch (err) {
      setError("Failed to load users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search and filter
  useEffect(() => {
    let result = users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);
      
      const matchesFilter =
        filter === "all" ||
        (filter === "admin" && user.role === "Admin") ||
        (filter === "sales" && user.role === "Sales") ||
        (filter === "delivery" && user.role === "Delivery") ||
        (filter === "collection" && user.role === "Collection");
      
      return matchesSearch && matchesFilter;
    });
    
    setFilteredUsers(result);
  }, [search, filter, users]);

  // Delete user
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // You'll need to create a deleteUser server action
        // await deleteUser(id);
        
        // For now, just remove from local state
        setUsers(users.filter((user) => user.id !== id));
        setShowDeleteConfirm(null);
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user");
      }
    }
  };

  // Get role badge color
  const getRoleColor = (role: string) => {
    switch(role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'sales':
        return 'bg-blue-100 text-blue-700';
      case 'delivery':
        return 'bg-green-100 text-green-700';
      case 'collection':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">{error}</div>
          <button 
            onClick={fetchUsers}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>

      {/* Search and Filter */}
      <div className="p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, email, role, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-2xl bg-white"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setFilter("admin")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setFilter("sales")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "sales"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setFilter("delivery")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "delivery"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setFilter("collection")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "collection"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Collection
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="p-4 space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No users found. {search && "Try a different search term."}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="bg-white border rounded-2xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{user.email}</span>
                    <span>•</span>
                    <span>{user.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                  </div>
                </div>

                {/* Actions Menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowDeleteConfirm(showDeleteConfirm === user.id ? null : user.id)
                    }
                    className="p-2"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {showDeleteConfirm === user.id && (
                    <div className="absolute right-0 top-10 bg-white border rounded-xl shadow-lg w-48 z-50">
                      <Link
                        href={`/sales/users/${user.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>
                      <Link
                        href={`/sales/users/${user.id}/edit`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit User
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete User
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Link
                  href={`/sales/users/${user.id}/edit`}
                  className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-xl text-center font-medium"
                >
                  Edit
                </Link>
                <Link
                  href={`/sales/users/${user.id}`}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-center font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersPage;