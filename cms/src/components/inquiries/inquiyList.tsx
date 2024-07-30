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

interface Inquiry {
  _id: string;
  title: string;
  description: string;
  phone: string;
}

const InquiryList = ({ inquiryList }: { inquiryList: Inquiry[] }) => {
  return (
    <div className="rounded-xl border border-dashed shadow-sm p-6 w-full">
      {inquiryList && inquiryList.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiryList.map((inquiry: Inquiry, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-200 border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                >
                  <TableCell className="font-medium">{inquiry.title}</TableCell>
                  <TableCell>{inquiry.description}</TableCell>
                  <TableCell>{inquiry.phone}</TableCell>
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

export default InquiryList;
