"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { intakes } from "@/mock/_index";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const IntakeList = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs().toDate(),
    to: dayjs().add(5, "month").toDate(),
  });
  return (
    <div className="w-full p-20">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreating(!isCreating)}>New intake</Button>
      </div>
      {isCreating && (
        <div className="flex items-end justify-between p-4 border my-4">
          <div className="flex gap-4">
            <div>
              <Label>Intake name</Label>
              <Input placeholder="2023 September DMS" className="w-80" />
            </div>
            <div>
              <Label>Total term</Label>
              <div className={cn("grid gap-2")}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-80 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {dayjs(date.from).format("YYYY-MM-DD (ddd)")} -{" "}
                            {dayjs(date.to).format("YYYY-MM-DD (ddd)")}
                          </>
                        ) : (
                          dayjs(date.from).format("YYYY-MM-DD (ddd)")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex gap-x-2">
            <Button
              variant={"outline"}
              onClick={() => setIsCreating(!isCreating)}
            >
              Cancel
            </Button>
            <Button>Create intake</Button>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Intake name</TableHead>
            <TableHead>Start from</TableHead>
            <TableHead>Morning cohorts</TableHead>
            <TableHead>Afternoon cohorts</TableHead>
            <TableHead>Evening cohorts</TableHead>
            {/* empty head for edit and delete */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {intakes.map((intake, i) => (
            <TableRow key={i}>
              <TableCell>{intake.name}</TableCell>
              <TableCell>
                {dayjs(intake.startDate).format("YYYY-MM-DD (ddd)")}
              </TableCell>
              <TableCell>
                {intake.cohorts
                  .filter((cohort) => cohort.periodOfDay.name === "Morning")
                  .map((cohort) => cohort.name)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {intake.cohorts
                  .filter((cohort) => cohort.periodOfDay.name === "Afternoon")
                  .map((cohort) => cohort.name)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {intake.cohorts
                  .filter((cohort) => cohort.periodOfDay.name === "Evening")
                  .map((cohort) => cohort.name)
                  .join(", ")}
              </TableCell>
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

export default IntakeList;
