import Navbar from "@/components/mobile/navbar";
import BottomNav from "@/components/mobile/bottomNav";
import Providers from "../providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <SelectCustomer /> */}
          <div className="">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}