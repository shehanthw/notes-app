"use client";

import Providers from "../providers";
import { useState } from "react";
import SalesWizard from "@/components/sales/sales-wizard/SalesWizard";
import ProductsWizard from "@/components/sales/products-wizard/ProductsWizard";
import Profile from "@/components/sales/profile/Profile";
import BottomNav from "@/components/sales/bottom-nav/BottomNav";
import Header from "@/components/sales/header/Header";
import DesktopMenu from "@/components/sales/menu/desktopMenu";
import UserWizard from "@/components/sales/user-wizard/UserWizard";

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    [key: string]: any;
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showWizard, setShowWizard] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProductWizard, setShowProductWizard] = useState(false);
  const [showUserWizard, setShowUserWizard] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            {/* Fixed Header */}
            <Header setShowProfile={setShowProfile} showProfile={showProfile} />

            {/* Main Content - Single Column */}
            <main className="p-4 space-y-6 overflow-y-auto w-full pb-24">{children}</main>

            {/* Bottom Navigation - Fixed at Bottom */}
            <BottomNav 
              setShowWizard={setShowWizard} 
              setShowProductWizard={setShowProductWizard} 
              setShowMenu={setShowMenu} 
              setShowUserWizard={setShowUserWizard}
            />

            {/* Sales Wizard Modal */}
            <SalesWizard isOpen={showWizard} onClose={() => setShowWizard(false)} />

            {/* Products Wizard Modal */}
            <ProductsWizard
              isOpen={showProductWizard}
              onClose={() => setShowProductWizard(false)}
            />

            {/* User Wizard Modal */}
            <UserWizard
              isOpen={showUserWizard}
              onClose={() => setShowUserWizard(false)}
            />

            {/* Desktop menu */}
            {showMenu && <DesktopMenu setShowMenu={setShowMenu} />}

          </div>
        </Providers>
      </body>
    </html>
  );
}
