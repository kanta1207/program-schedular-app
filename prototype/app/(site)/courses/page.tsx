"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses } from "@/mock/_index";

const CourseList = () => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className="w-full p-20">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreating(!isCreating)}>New course</Button>
      </div>
      {isCreating && (
        <div className="flex gap-4 items-end p-4 border my-4">
          <div>
            <Label>Course name</Label>
            <Input className="w-80" />
          </div>
          <div>
            <Label>Program</Label>
            <Select>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="DMS">DMS</SelectItem>
                  <SelectItem value="DMA">DMA</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Required hours</Label>
            <Input placeholder="60" className="w-80" />
          </div>

          <div className="flex gap-x-2">
            <Button variant={"outline"} onClick={() => setIsCreating(!isCreating)}>
              Cancel
            </Button>
            <Button>Create course</Button>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Required hours</TableHead>
            {/* empty head for edit and delete */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, i) => (
            <TableRow key={i}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.program.name}</TableCell>
              <TableCell>{course.requiredHours}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant={"outline"}>Edit</Button>
                <Button variant={"destructive"}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseList;
