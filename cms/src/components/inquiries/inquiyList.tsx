import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Inquiry {
  _id: string;
  senderName: string;
  inquiryDescription: string;
  phone: string;
}

const InquiryList = ({ inquiryList }: { inquiryList: Inquiry[] }) => {
  return (
    <div className="w-full p-6 border border-dashed shadow-sm rounded-xl">
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
                  <TableCell className="font-medium">
                    {inquiry.senderName}
                  </TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger>
                        {inquiry.inquiryDescription.length > 50
                          ? inquiry.inquiryDescription.substring(0, 50) + "..."
                          : inquiry.inquiryDescription}
                      </HoverCardTrigger>
                      <HoverCardContent>
                        {inquiry.inquiryDescription}
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>{inquiry.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No inquiries yet</p>
      )}
    </div>
  );
};

export default InquiryList;
