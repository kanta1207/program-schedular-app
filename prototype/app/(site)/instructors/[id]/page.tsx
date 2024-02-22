'use client'
import React, { useState } from 'react'
import { instructors } from '../page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

const InstructorDetail = ({ params: { id } }: any) => {
  const [isEditable, setIsEditable] = useState(false)
  const router = useRouter()
  const instructor = instructors.find((instructor) => instructor.id === +id)
  if (!instructor) return

  return (
    <div className="p-20 space-y-8">
      <div className="flex items-center gap-6">
        <p>Name:</p>
        <Input defaultValue={instructor.name} disabled={!isEditable} />
      </div>

      <div className="flex gap-6">
        <p>Contract:</p>
        <RadioGroup defaultValue={instructor.contract} className="flex gap-x-4" disabled={!isEditable}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Employee (full-time)" id="full-time" />
            <Label htmlFor="full-time">Employee (full-time)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Employee (part-time)" id="part-time" />
            <Label htmlFor="part-time">Employee (part-time)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Contractor" id="contractor" />
            <Label htmlFor="contractor">Contractor</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex gap-6">
        <p>Desired working hours:</p>
        <RadioGroup defaultValue={instructor.desiredWorkingHours + ''} className="flex gap-x-4" disabled={!isEditable}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="40" id="40" />
            <Label htmlFor="40">40</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="30" id="30" />
            <Label htmlFor="30">30</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="20" id="20" />
            <Label htmlFor="20">20</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="10" id="10" />
            <Label htmlFor="10">10</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex gap-6">
        <p>Days:</p>
        <RadioGroup defaultValue={instructor.availableDaysOfWeek} className="flex gap-x-4" disabled={!isEditable}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Monday-Friday" id="Monday-Friday" />
            <Label htmlFor="Monday-Friday">Monday-Friday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Monday-Wednesday" id="Monday-Wednesday" />
            <Label htmlFor="Monday-Wednesday">Monday-Wednesday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Wednesday-Friday" id="Wednesday-Friday" />
            <Label htmlFor="Wednesday-Friday">Wednesday-Friday</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex gap-6">
        <p>Period:</p>
        <div className="items-top flex space-x-2">
          <Checkbox defaultChecked={instructor.period.includes('Morning')} disabled={!isEditable} />
          <Label>Morning</Label>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox defaultChecked={instructor.period.includes('Afternoon')} disabled={!isEditable} />
          <Label>Afternoon</Label>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox defaultChecked={instructor.period.includes('Evening')} disabled={!isEditable} />
          <Label>Evening</Label>
        </div>
      </div>

      <div className="flex gap-6">
        <p>Active:</p>
        <Switch defaultChecked={instructor.isActive} disabled={!isEditable} />
      </div>

      <div className="flex gap-6">
        <p>Course:</p>
        <div className="items-top flex space-x-2">
          <Checkbox defaultChecked={instructor.course.includes('SEO')} disabled={!isEditable} />
          <Label>SEO</Label>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox defaultChecked={instructor.course.includes('Analytics')} disabled={!isEditable} />
          <Label>Analytics</Label>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox defaultChecked={instructor.course.includes('WordPress')} disabled={!isEditable} />
          <Label>WordPress</Label>
        </div>
      </div>

      <div className="flex justify-end">
        {isEditable ? (
          <div className="flex gap-2">
            <Button variant={'outline'} onClick={() => router.back()}>
              Cancel
            </Button>
            <Button>Save changes</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant={'outline'} onClick={() => setIsEditable(!isEditable)}>
              Edit
            </Button>
            <Button variant={'destructive'} onClick={() => confirm('Are you sure to delete?')}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InstructorDetail
