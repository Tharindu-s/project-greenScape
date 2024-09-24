import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteUser from "./DeleteUser";

interface User {
  _id: string;
  name: string;
  city: string;
  country: string;
  createdAt: string;
}

const UsersList = ({ userList }: { userList: User[] }) => {
  console.log(userList);
  return (
    <div className="p-6 border border-dashed shadow-sm rounded-xl">
      {userList && userList.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.map((user: User, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-200 border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                >
                  <TableCell className="font-medium">{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>
                    {user.createdAt?.slice(0, 10) || <p>null</p>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <DeleteUser userId={user._id} />
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

export default UsersList;
