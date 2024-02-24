"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cohorts, intakes } from "@/mock/_index";
import { PERIOD_OF_DAYS, PROGRAMS } from "@/constants/_index";

const CohortList = () => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className="w-full p-20">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreating(!isCreating)}>New cohort</Button>
      </div>
      {isCreating && (
        <div className="flex gap-4 items-end p-4 border my-4">
          <div>
            <Label>Intake</Label>
            <Select>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select an intake" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {intakes.map((intake) => (
                    <SelectItem key={intake.id} value={intake.id.toString()}>
                      {intake.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-60">
            <Label>Cohort name</Label>
            <Input />
          </div>

          <div className="w-60">
            <Label>Program</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PROGRAMS.map((program) => (
                    <SelectItem key={program.id} value={program.name}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-60">
            <Label>Period</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PERIOD_OF_DAYS.map((period) => (
                    <SelectItem key={period.id} value={period.name}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-x-2">
            <Button
              variant={"outline"}
              onClick={() => setIsCreating(!isCreating)}
            >
              Cancel
            </Button>
            <Button>Create course</Button>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Intake name</TableHead>
            <TableHead>Cohort name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Period</TableHead>
            {/* empty head for edit and delete */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cohorts.map((cohort, i) => (
            <TableRow key={i}>
              <TableCell>{cohort.intake.name}</TableCell>
              <TableCell>{cohort.name}</TableCell>
              <TableCell>{cohort.program.name}</TableCell>
              <TableCell>{cohort.periodOfDay.name}</TableCell>
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

export default CohortList;
