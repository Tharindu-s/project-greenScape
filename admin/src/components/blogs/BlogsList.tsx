import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import DeleteBlog from "./DeleteBlogs";
import KeepBlog from "./KeepBlog";

interface Blog {
  _id: string;
  title: string;
  content: string;
  blogId: string;
  createdAt: string;
}

const BlogsList = ({ blogsList }: { blogsList: Blog[] }) => {
  return (
    <div className="p-6 border border-dashed shadow-sm rounded-xl">
      {blogsList && blogsList.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogsList.map((blog: Blog, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-200 border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                >
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/blogs/${blog.blogId}`}>
                      {blog.blogId}
                    </Link>
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.content}</TableCell>

                  <TableCell>{blog.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <DeleteBlog blogId={blog.blogId} reportId={blog._id} />
                      <KeepBlog blogId={blog.blogId} reportId={blog._id} />
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

export default BlogsList;
