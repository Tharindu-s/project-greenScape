import { ProductsContext } from "@/context/productContex";
import { useContext } from "react";

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw Error(
      "useProductsContext must be used inside an ProductsContextProvider"
    );
  }

  return context;
};
