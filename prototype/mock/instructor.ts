import {
  CONTRACT_TYPES,
  PERIOD_OF_DAYS,
  WEEKDAYS_RANGES,
} from "@/constants/_index";
import { Instructor } from "@/types/_index";
import { courses } from "./_index";

export const instructors: Instructor[] = [
  {
    id: 1,
    name: "Ana Couto",
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [1, 5, 6, 8, 9, 15].includes(id)),
  },
  {
    id: 2,
    name: "Brian",
    isActive: true,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [1, 5, 7, 8, 10, 12].includes(id)),
  },
  {
    id: 3,
    name: "Caio Franco",
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [1, 5, 8].includes(id)),
  },
  {
    id: 4,
    name: "Diogo",
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Part time")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [2].includes(id)),
  },
  {
    id: 5,
    name: "Gaurav",
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Part time")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [1, 4, 5, 6, 7, 8].includes(id)),
  },
  {
    id: 6,
    name: "Iman",
    isActive: true,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [4, 13, 14].includes(id)),
  },
  {
    id: 7,
    name: "Jana",
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [6, 8, 15].includes(id)),
  },
  {
    id: 8,
    name: "Kwame",
    isActive: true,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name !== "Morning"),
    courses: courses.filter(({ id }) => [1, 6, 7, 8, 9, 11].includes(id)),
  },
  {
    id: 9,
    name: "Mariam",
    isActive: true,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Full time")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [1, 2, 3, 5, 6, 8, 15].includes(id)),
  },
  {
    id: 10,
    name: "Rafael",
    isActive: true,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [1, 4, 5, 7, 8].includes(id)),
  },
  {
    id: 11,
    name: "Rodrigo",
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [1, 2, 3, 5, 6, 8].includes(id)),
  },
  {
    id: 12,
    name: "Vedant",
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Part time")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [1, 5, 11, 14].includes(id)),
  },
  {
    id: 13,
    name: "Amir",
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [7, 13].includes(id)),
  },
  {
    id: 14,
    name: "Andres Franco",
    isActive: false,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) =>
      [1, 2, 3, 4, 5, 6, 7, 8, 12, 14, 15].includes(id)
    ),
  },
  {
    id: 15,
    name: "Aswini",
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [3].includes(id)),
  },
  {
    id: 16,
    name: "Brigitte",
    isActive: false,
    desiredWorkingHours: 30,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Full time")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [1, 5, 6, 8].includes(id)),
  },
  {
    id: 17,
    name: "Cody",
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [1, 4, 5, 6, 8].includes(id)),
  },
  {
    id: 18,
    name: "Daria Astanaeva",
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [1, 5, 6, 8, 15].includes(id)),
  },
  {
    id: 19,
    name: "Elmira",
    isActive: false,
    desiredWorkingHours: 30,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [2, 4].includes(id)),
  },
  {
    id: 20,
    name: "Jasleen",
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Morning"),
    courses: courses.filter(({ id }) => [2, 3].includes(id)),
  },
  {
    id: 21,
    name: "Rafaela",
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Contract")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === "Evening"),
    courses: courses.filter(({ id }) => [1, 5, 6, 8, 9, 11].includes(id)),
  },
  {
    id: 22,
    name: "Tiago",
    isActive: false,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === "Full time")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: courses.filter(({ id }) => [1, 5, 6, 8].includes(id)),
  },
];
