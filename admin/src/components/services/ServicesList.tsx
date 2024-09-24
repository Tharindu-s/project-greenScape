import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteService from "./DeleteService";
import EditService from "./EditService";

interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  createdAt: string;
}

const ServicesList = ({ services }: { services: Service[] }) => {
  return (
    <div className="p-6 border border-dashed shadow-sm rounded-xl">
      {services && services.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service: Service, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-200 border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                >
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {/* <DeleteProject projectId={project._id} /> */}
                      <DeleteService serviceId={service._id} />
                      <EditService service={service} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
};

export default ServicesList;
