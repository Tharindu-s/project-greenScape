import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthContextProvider } from "@/context/authContext";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreenScape - CMS",
  description: "CMS for professional GreenScape users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </AuthContextProvider>
      </body>
    </html>
  );
}
