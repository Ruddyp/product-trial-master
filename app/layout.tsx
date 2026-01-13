import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/generic/Navbar";
import Sidebar from "@/components/generic/Sidebar";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Alten Shop",
  description: "Super Alten Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen flex flex-col bg-background antialiased overflow-hidden`}
      >
        <CartProvider>
          <NavBar />
          <main className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="w-full overflow-y-auto p-2">{children}</div>
            <Toaster position="top-center" richColors />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
