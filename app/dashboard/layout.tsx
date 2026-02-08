import Navbar from "@/components/mobile/navbar";
import BottomNav from "@/components/mobile/bottomNav";
import Providers from "../providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />

          <div className="absolute mt-12 w-full bg-[#F2F3F8] h-[calc(100vh-48px)] overflow-auto">{children}</div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
