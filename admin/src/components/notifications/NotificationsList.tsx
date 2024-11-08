import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Notifications {
  _id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
}

const NotificationsList = ({
  notifications,
}: {
  notifications: Notifications[];
}) => {
  console.log(notifications);
  return (
    <div className="p-6 border border-dashed shadow-sm rounded-xl">
      {notifications && notifications.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map(
                (notification: Notifications, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-200 border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                  >
                    <TableCell className="font-medium">
                      {notification.title}
                    </TableCell>
                    <TableCell>{notification.content}</TableCell>
                    <TableCell>{notification.type}</TableCell>
                    <TableCell className="text-right">
                      {notification.createdAt?.slice(0, 10) || <p>null</p>}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default NotificationsList;
