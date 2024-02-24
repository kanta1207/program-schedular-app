"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { courses, instructors } from "@/mock/_index";
import {
  CONTRACT_TYPES,
  DESIRED_WORKING_HOURS,
  PERIOD_OF_DAYS,
  WEEKDAYS_RANGES,
} from "@/constants/_index";

const InstructorDetail = ({ params: { id } }: any) => {
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();
  const instructor = instructors.find((instructor) => instructor.id === +id);
  if (!instructor) return;

  return (
    <div className="p-20 space-y-8">
      <div className="flex items-center gap-6">
        <p>Name:</p>
        <Input defaultValue={instructor.name} disabled={!isEditable} />
      </div>

      <div className="flex gap-6">
        <p>Contract:</p>
        <RadioGroup
          defaultValue={instructor.contractType.id.toString()}
          className="flex gap-x-4"
          disabled={!isEditable}
        >
          {CONTRACT_TYPES.map((contractType) => (
            <div key={contractType.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={contractType.id.toString()}
                id={contractType.name}
              />
              <Label htmlFor={contractType.name}>{contractType.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex gap-6">
        <p>Desired working hours:</p>
        <RadioGroup
          defaultValue={instructor.desiredWorkingHours + ""}
          className="flex gap-x-4"
          disabled={!isEditable}
        >
          {DESIRED_WORKING_HOURS.map((hours) => (
            <div key={hours} className="flex items-center space-x-2">
              <RadioGroupItem value={hours.toString()} id={hours.toString()} />
              <Label htmlFor={hours.toString()}>{hours}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex gap-6">
        <p>Days:</p>
        <RadioGroup
          defaultValue={instructor.weekdaysRange.id.toString()}
          className="flex gap-x-4"
          disabled={!isEditable}
        >
          {WEEKDAYS_RANGES.map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <RadioGroupItem value={range.id.toString()} id={range.name} />
              <Label htmlFor={range.name}>{range.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex gap-6">
        <p>Period:</p>
        {PERIOD_OF_DAYS.map((period) => (
          <div key={period.id} className="items-top flex space-x-2">
            <Checkbox
              defaultChecked={
                instructor.periodOfDays.findIndex(
                  ({ id }) => period.id === id
                ) !== -1
              }
              disabled={!isEditable}
            />
            <Label>{period.name}</Label>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        <p>Active:</p>
        <Switch defaultChecked={instructor.isActive} disabled={!isEditable} />
      </div>

      <p>Course:</p>
      <p>DMS:</p>
      <div className="flex flex-wrap gap-6">
        {courses.map(
          (course) =>
            course.program.name === "DMS" && (
              <div key={course.id} className="items-top flex space-x-2">
                <Checkbox
                  defaultChecked={
                    instructor.courses.findIndex(
                      ({ id }) => course.id === id
                    ) !== -1
                  }
                  disabled={!isEditable}
                />
                <Label>{course.name}</Label>
              </div>
            )
        )}
      </div>
      <p>DMA:</p>
      <div className="flex flex-wrap gap-6">
        {courses.map(
          (course) =>
            course.program.name === "DMA" && (
              <div key={course.id} className="items-top flex space-x-2">
                <Checkbox
                  defaultChecked={
                    instructor.courses.findIndex(
                      ({ id }) => course.id === id
                    ) !== -1
                  }
                  disabled={!isEditable}
                />
                <Label>{course.name}</Label>
              </div>
            )
        )}
      </div>

      <div className="flex justify-end">
        {isEditable ? (
          <div className="flex gap-2">
            <Button variant={"outline"} onClick={() => router.back()}>
              Cancel
            </Button>
            <Button>Save changes</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              onClick={() => setIsEditable(!isEditable)}
            >
              Edit
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => confirm("Are you sure to delete?")}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDetail;
