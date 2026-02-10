"use client";

import { useState } from "react";
import SalesWizard from "@/components/sales/sales-wizard/SalesWizard";
import Profile from "@/components/sales/profile/Profile";

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    [key: string]: any;
  };
}

// src/app/dashboard/page.tsx - MOBILE FIRST
export default function DashboardPage() {
  const [showWizard, setShowWizard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="sticky top-0 z-40 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Good Morning</h1>
            <p className="text-sm text-gray-500">Today, 25 Jan</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-1" onClick={()=> setShowProfile(true)}>
              <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">J</span>
              </div>
            </button>
            {showProfile && <Profile setShowProfile={setShowProfile} />}
          </div>
        </div>
      </div>

      {/* Main Content - Single Column */}
      <main className="p-4 space-y-6">
        {/* Daily Target Progress */}
        <div className="bg-white rounded-2xl p-4 border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Daily Target</h2>
            <span className="text-sm text-blue-600">53%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-1/2"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>8 customers</span>
            <span>15 target</span>
          </div>
        </div>

        {/* Quick Stats - Single Column */}
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-2xl border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Today's Sales</p>
                <p className="text-2xl font-bold">৳12,500</p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 font-bold">↑</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl border">
              <p className="text-gray-500 text-sm">Customers</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border">
              <p className="text-gray-500 text-sm">Products</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>

        {/* Quick Actions - Grid 2x2 */}
        <div>
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white p-4 rounded-2xl border flex flex-col items-center">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl">＋</span>
              </div>
              <span className="font-medium">New Sale</span>
            </button>
            <button className="bg-white p-4 rounded-2xl border flex flex-col items-center">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl">📋</span>
              </div>
              <span className="font-medium">My Sales</span>
            </button>
            <button className="bg-white p-4 rounded-2xl border flex flex-col items-center">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl">📦</span>
              </div>
              <span className="font-medium">Inventory</span>
            </button>
            <button className="bg-white p-4 rounded-2xl border flex flex-col items-center">
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl">📊</span>
              </div>
              <span className="font-medium">Report</span>
            </button>
          </div>
        </div>

        {/* Product Stock - Single List */}
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Product Stock</h2>
          </div>
          <div className="divide-y">
            {[
              { name: "Rice (25kg)", stock: 15, low: false },
              { name: "Oil (5L)", stock: 3, low: true },
              { name: "Sugar (2kg)", stock: 42, low: false },
              { name: "Flour (10kg)", stock: 0, low: true },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.stock} in stock</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${item.low ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                >
                  {item.low ? "Low" : "Good"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-3">
          {["🏠", "📋", "📦"].map((icon, i) => (
            <button key={i} className="text-2xl p-2">
              {icon}
            </button>
          ))}
          <button
            onClick={() => setShowWizard(true)}
            className="h-12 w-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform"
          >
            ＋
          </button>
        </div>
      </div>

      {/* Sales Wizard Modal */}
      <SalesWizard isOpen={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  );
}
