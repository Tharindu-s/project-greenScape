import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteProduct from "./DeleteProduct";

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
}

const ProductsList = ({ productsList }: { productsList: Product[] }) => {
  return (
    <div className="p-6 border border-dashed shadow-sm rounded-xl">
      {productsList && productsList.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsList.map((product: Product, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-200 border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                >
                  <TableCell className="font-medium">{product._id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <DeleteProduct productId={product._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default ProductsList;
