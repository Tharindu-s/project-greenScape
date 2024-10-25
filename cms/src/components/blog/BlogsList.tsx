import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthContext } from "@/hooks/useAuthContext";
import DeleteBlog from "./DeleteBlog";
import EditBlog from "./EditBlog";

interface Blogs {
  _id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
}

const BlogsLists = ({ blogsList }: { blogsList: Blogs[] }) => {
  return (
    <div className="p-6 border border-dashed shadow-sm rounded-xl">
      {blogsList && blogsList.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogsList.map((product: Blogs, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-200 border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                >
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.content}</TableCell>
                  <TableCell>{product.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <DeleteBlog blogId={product._id} />
                      <EditBlog blog={product} />
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

export default BlogsLists;
