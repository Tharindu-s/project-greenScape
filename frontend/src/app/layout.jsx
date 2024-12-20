import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Common/Navbar/Navbar";
import Footer from "@/components/Common/Footer";
import { AuthContextProvider } from "@/context/authContext";
import { ProductsContextProvider } from "@/context/productContex";
import { SearchProvider } from "@/context/searchContext";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GreenScape",
  description: "GreenScape your gardening pal",
};

export default function RootLayout({ children, setSearch }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <SearchProvider>
            <ProductsContextProvider>
              {children}
              {/* <Toaster /> */}
              <Toaster position="top-right" reverseOrder={false} />
              <Footer />
            </ProductsContextProvider>
          </SearchProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
