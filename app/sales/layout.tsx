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