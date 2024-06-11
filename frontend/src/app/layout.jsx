import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { AuthContextProvider } from "@/context/authContext";
import { WorkoutsContextProvider } from "@/context/workoutContext";
import { ProductsContextProvider } from "@/context/productContex";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <WorkoutsContextProvider>
            <ProductsContextProvider>
              <Navbar />
              {children}
              <Toaster />
              <Footer />
            </ProductsContextProvider>
          </WorkoutsContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
