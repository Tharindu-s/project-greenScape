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
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";

interface Project {
  _id: string;
  projectName: string;
  category: string;
  location: string;
  createdAt: string;
}

const ProjectsList = ({ projectsList }: { projectsList: Project[] }) => {
  return (
    <div className="p-6 border border-dashed shadow-sm rounded-xl">
      {projectsList && projectsList.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsList.map((project: Project, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-200 border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                >
                  <TableCell className="font-medium">
                    {project.projectName}
                  </TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>{project.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <DeleteProject projectId={project._id} />
                      <EditProject project={project} />
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

export default ProjectsList;
