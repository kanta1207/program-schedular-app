import { Class } from "@/types/_index";
import dayjs from "dayjs";
import { courses } from "./course";
import { CLASSROOMS } from "@/constants/classroom";
import { WEEKDAYS_RANGES } from "@/constants/weekdays_range";
import { instructors } from "./instructor";
import { cohorts } from "./cohort";

export const classes: Class[] = [
  /*=============================
  / DMS
  /=============================*/
  // M-1023
  {
    id: 1,
    cohortId: cohorts.find(({ name }) => name === "M-1023")?.id!,
    startAt: dayjs("2023-09-25").toDate(),
    endAt: dayjs("2023-10-13").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 2,
    cohortId: cohorts.find(({ name }) => name === "M-1023")?.id!,
    startAt: dayjs("2023-10-16").toDate(),
    endAt: dayjs("2023-11-03").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 2")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 3,
    cohortId: cohorts.find(({ name }) => name === "M-1023")?.id!,
    startAt: dayjs("2023-11-06").toDate(),
    endAt: dayjs("2023-11-24").toDate(),
    course: courses.find(({ name }) => name === "WordPress")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 4,
    cohortId: cohorts.find(({ name }) => name === "M-1023")?.id!,
    startAt: dayjs("2023-11-06").toDate(),
    endAt: dayjs("2023-11-24").toDate(),
    course: courses.find(({ name }) => name === "Design")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 5,
    cohortId: cohorts.find(({ name }) => name === "M-1023")?.id!,
    startAt: dayjs("2023-11-27").toDate(),
    endAt: dayjs("2023-12-15").toDate(),
    course: courses.find(({ name }) => name === "SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 6,
    cohortId: cohorts.find(({ name }) => name === "M-1023")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-01-19").toDate(),
    course: courses.find(({ name }) => name === "Analytics")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 7,
    cohortId: cohorts.find(({ name }) => name === "M-1023")?.id!,
    startAt: dayjs("2024-01-22").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Social Media")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rodrigo")!,
  },
  {
    id: 8,
    cohortId: cohorts.find(({ name }) => name === "M-1023")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "Campaign Management")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rodrigo")!,
  },
  // A-1023
  {
    id: 9,
    cohortId: cohorts.find(({ name }) => name === "A-1023")?.id!,
    startAt: dayjs("2023-09-25").toDate(),
    endAt: dayjs("2023-11-03").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 10,
    cohortId: cohorts.find(({ name }) => name === "A-1023")?.id!,
    startAt: dayjs("2023-09-25").toDate(),
    endAt: dayjs("2023-10-03").toDate(),
    course: courses.find(({ name }) => name === "WordPress")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 11,
    cohortId: cohorts.find(({ name }) => name === "A-1023")?.id!,
    startAt: dayjs("2023-10-16").toDate(),
    endAt: dayjs("2023-11-03").toDate(),
    course: courses.find(({ name }) => name === "Design")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 12,
    cohortId: cohorts.find(({ name }) => name === "A-1023")?.id!,
    startAt: dayjs("2023-11-06").toDate(),
    endAt: dayjs("2023-11-24").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 2")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 13,
    cohortId: cohorts.find(({ name }) => name === "A-1023")?.id!,
    startAt: dayjs("2023-11-27").toDate(),
    endAt: dayjs("2023-12-15").toDate(),
    course: courses.find(({ name }) => name === "SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 14,
    cohortId: cohorts.find(({ name }) => name === "A-1023")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Social Media")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 15,
    cohortId: cohorts.find(({ name }) => name === "A-1023")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Analytics")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 16,
    cohortId: cohorts.find(({ name }) => name === "A-1023")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "Campaign Management")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  // E1-1023
  {
    id: 17,
    cohortId: cohorts.find(({ name }) => name === "E1-1023")?.id!,
    startAt: dayjs("2023-09-25").toDate(),
    endAt: dayjs("2023-11-03").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Caio Franco")!,
  },
  {
    id: 18,
    cohortId: cohorts.find(({ name }) => name === "E1-1023")?.id!,
    startAt: dayjs("2023-09-25").toDate(),
    endAt: dayjs("2023-10-13").toDate(),
    course: courses.find(({ name }) => name === "Design")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Aswini")!,
  },
  {
    id: 19,
    cohortId: cohorts.find(({ name }) => name === "E1-1023")?.id!,
    startAt: dayjs("2023-10-16").toDate(),
    endAt: dayjs("2023-11-03").toDate(),
    course: courses.find(({ name }) => name === "WordPress")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 20,
    cohortId: cohorts.find(({ name }) => name === "E1-1023")?.id!,
    startAt: dayjs("2023-11-06").toDate(),
    endAt: dayjs("2023-12-15").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 2")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Jana")!,
  },
  {
    id: 21,
    cohortId: cohorts.find(({ name }) => name === "E1-1023")?.id!,
    startAt: dayjs("2023-11-06").toDate(),
    endAt: dayjs("2023-12-15").toDate(),
    course: courses.find(({ name }) => name === "SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 22,
    cohortId: cohorts.find(({ name }) => name === "E1-1023")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Social Media")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brigitte")!,
  },
  {
    id: 23,
    cohortId: cohorts.find(({ name }) => name === "E1-1023")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Analytics")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Gaurav")!,
  },
  {
    id: 24,
    cohortId: cohorts.find(({ name }) => name === "E1-1023")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "Campaign Management")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Youtube")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  // E2-1023
  {
    id: 25,
    cohortId: cohorts.find(({ name }) => name === "E2-1023")?.id!,
    startAt: dayjs("2023-09-25").toDate(),
    endAt: dayjs("2023-11-03").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Jana")!,
  },
  {
    id: 26,
    cohortId: cohorts.find(({ name }) => name === "E2-1023")?.id!,
    startAt: dayjs("2023-09-25").toDate(),
    endAt: dayjs("2023-10-13").toDate(),
    course: courses.find(({ name }) => name === "WordPress")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 27,
    cohortId: cohorts.find(({ name }) => name === "E2-1023")?.id!,
    startAt: dayjs("2023-10-16").toDate(),
    endAt: dayjs("2023-11-03").toDate(),
    course: courses.find(({ name }) => name === "Design")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 28,
    cohortId: cohorts.find(({ name }) => name === "E2-1023")?.id!,
    startAt: dayjs("2023-11-06").toDate(),
    endAt: dayjs("2023-12-15").toDate(),
    course: courses.find(({ name }) => name === "SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 29,
    cohortId: cohorts.find(({ name }) => name === "E2-1023")?.id!,
    startAt: dayjs("2023-11-06").toDate(),
    endAt: dayjs("2023-12-15").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 2")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 30,
    cohortId: cohorts.find(({ name }) => name === "E2-1023")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Analytics")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Gaurav")!,
  },
  {
    id: 31,
    cohortId: cohorts.find(({ name }) => name === "E2-1023")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Social Media")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Jana")!,
  },
  {
    id: 32,
    cohortId: cohorts.find(({ name }) => name === "E2-1023")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "Campaign Management")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Jana")!,
  },
  //// DMS-2024-Jan
  // A1-0124
  {
    id: 33,
    cohortId: cohorts.find(({ name }) => name === "A1-0124")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brigitte")!,
  },
  {
    id: 34,
    cohortId: cohorts.find(({ name }) => name === "A1-0124")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-01-19").toDate(),
    course: courses.find(({ name }) => name === "WordPress")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 35,
    cohortId: cohorts.find(({ name }) => name === "A1-0124")?.id!,
    startAt: dayjs("2024-01-22").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Design")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 36,
    cohortId: cohorts.find(({ name }) => name === "A1-0124")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 2")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 37,
    cohortId: cohorts.find(({ name }) => name === "A1-0124")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 38,
    cohortId: cohorts.find(({ name }) => name === "A1-0124")?.id!,
    startAt: dayjs("2024-04-02").toDate(),
    endAt: dayjs("2024-05-10").toDate(),
    course: courses.find(({ name }) => name === "Social Media")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rodrigo")!,
  },
  {
    id: 39,
    cohortId: cohorts.find(({ name }) => name === "A1-0124")?.id!,
    startAt: dayjs("2024-04-02").toDate(),
    endAt: dayjs("2024-05-10").toDate(),
    course: courses.find(({ name }) => name === "Analytics")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 40,
    cohortId: cohorts.find(({ name }) => name === "A1-0124")?.id!,
    startAt: dayjs("2024-05-13").toDate(),
    endAt: dayjs("2024-06-21").toDate(),
    course: courses.find(({ name }) => name === "Campaign Management")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Facebook")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  // E1--0124
  {
    id: 41,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-01-19").toDate(),
    course: courses.find(({ name }) => name === "WordPress")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Diogo")!,
  },
  {
    id: 42,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-01-19").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Caio Franco")!,
  },
  {
    id: 43,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-01-22").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Caio Franco")!,
  },
  {
    id: 44,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-01-22").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Design")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 45,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Gaurav")!,
  },
  {
    id: 46,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 2")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 47,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-04-02").toDate(),
    endAt: dayjs("2024-05-10").toDate(),
    course: courses.find(({ name }) => name === "Analytics")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Caio Franco")!, // Nathalia was not in the list
  },
  {
    id: 47,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-04-02").toDate(),
    endAt: dayjs("2024-05-10").toDate(),
    course: courses.find(({ name }) => name === "Social Media")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Gaurav")!,
  },
  {
    id: 48,
    cohortId: cohorts.find(({ name }) => name === "E1-0124")?.id!,
    startAt: dayjs("2024-05-13").toDate(),
    endAt: dayjs("2024-06-21").toDate(),
    course: courses.find(({ name }) => name === "Campaign Management")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Amazon")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  // E2--0124
  {
    id: 49,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-01-19").toDate(),
    course: courses.find(({ name }) => name === "Design")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 50,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-01-19").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Caio Franco")!,
  },
  {
    id: 51,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-01-22").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 1")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Caio Franco")!,
  },
  {
    id: 52,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-01-22").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "WordPress")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Diogo")!,
  },
  {
    id: 53,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "Digital Marketing 2")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Caio Franco")!,
  },
  {
    id: 54,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Gaurav")!,
  },
  {
    id: 55,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-04-02").toDate(),
    endAt: dayjs("2024-05-10").toDate(),
    course: courses.find(({ name }) => name === "Social Media")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Gaurav")!,
  },
  {
    id: 56,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-04-02").toDate(),
    endAt: dayjs("2024-05-10").toDate(),
    course: courses.find(({ name }) => name === "Analytics")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Rafael")!,
  },
  {
    id: 57,
    cohortId: cohorts.find(({ name }) => name === "E2-0124")?.id!,
    startAt: dayjs("2024-05-13").toDate(),
    endAt: dayjs("2024-06-21").toDate(),
    course: courses.find(({ name }) => name === "Campaign Management")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Caio Franco")!, // Nathalia was not in the list
  },
  /*=============================
  / DMA
  /=============================*/
  //// 2023-August-intake
  // E-0923
  {
    id: 58,
    cohortId: cohorts.find(({ name }) => name === "E-0923")?.id!,
    startAt: dayjs("2023-08-28").toDate(),
    endAt: dayjs("2023-10-20").toDate(),
    course: courses.find(({ name }) => name === "E-commerce")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 59,
    cohortId: cohorts.find(({ name }) => name === "E-0923")?.id!,
    startAt: dayjs("2023-08-28").toDate(),
    endAt: dayjs("2023-10-20").toDate(),
    course: courses.find(({ name }) => name === "Content Creation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 60,
    cohortId: cohorts.find(({ name }) => name === "E-0923")?.id!,
    startAt: dayjs("2023-10-23").toDate(),
    endAt: dayjs("2023-12-15").toDate(),
    course: courses.find(({ name }) => name === "Digital Ads")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 61,
    cohortId: cohorts.find(({ name }) => name === "E-0923")?.id!,
    startAt: dayjs("2023-10-23").toDate(),
    endAt: dayjs("2023-12-01").toDate(),
    course: courses.find(({ name }) => name === "Growth Marketing")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Vedant")!,
  },
  {
    id: 62,
    cohortId: cohorts.find(({ name }) => name === "E-0923")?.id!,
    startAt: dayjs("2023-12-04").toDate(),
    endAt: dayjs("2023-01-26").toDate(),
    course: courses.find(({ name }) => name === "Advanced Digital Strategies")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Hootsuite")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Iman")!,
  },
  {
    id: 63,
    cohortId: cohorts.find(({ name }) => name === "E-0923")?.id!,
    startAt: dayjs("2024-01-02").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Advanced SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 64,
    cohortId: cohorts.find(({ name }) => name === "E-0923")?.id!,
    startAt: dayjs("2024-01-29").toDate(),
    endAt: dayjs("2024-02-09").toDate(),
    course: courses.find(({ name }) => name === "Automation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Iman")!,
  },
  {
    id: 65,
    cohortId: cohorts.find(({ name }) => name === "E-0923")?.id!,
    startAt: dayjs("2024-02-12").toDate(),
    endAt: dayjs("2024-02-23").toDate(),
    course: courses.find(({ name }) => name === "Automation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Iman")!,
  },
  //// 2023-November-intake
  // E-1223
  {
    id: 66,
    cohortId: cohorts.find(({ name }) => name === "E-1223")?.id!,
    startAt: dayjs("2023-11-20").toDate(),
    endAt: dayjs("2024-01-26").toDate(),
    course: courses.find(({ name }) => name === "Content Creation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Microsoft")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 67,
    cohortId: cohorts.find(({ name }) => name === "E-1223")?.id!,
    startAt: dayjs("2023-11-20").toDate(),
    endAt: dayjs("2024-01-26").toDate(),
    course: courses.find(({ name }) => name === "E-commerce")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Microsoft")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 68,
    cohortId: cohorts.find(({ name }) => name === "E-1223")?.id!,
    startAt: dayjs("2024-01-29").toDate(),
    endAt: dayjs("2024-03-08").toDate(),
    course: courses.find(({ name }) => name === "Growth Marketing")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Microsoft")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Kwame")!,
  },
  {
    id: 69,
    cohortId: cohorts.find(({ name }) => name === "E-1223")?.id!,
    startAt: dayjs("2024-01-29").toDate(),
    endAt: dayjs("2024-03-22").toDate(),
    course: courses.find(({ name }) => name === "Digital Ads")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Microsoft")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 70,
    cohortId: cohorts.find(({ name }) => name === "E-1223")?.id!,
    startAt: dayjs("2024-03-11").toDate(),
    endAt: dayjs("2024-04-26").toDate(),
    course: courses.find(({ name }) => name === "Advanced Digital Strategies")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Microsoft")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Iman")!,
  },
  {
    id: 71,
    cohortId: cohorts.find(({ name }) => name === "E-1223")?.id!,
    startAt: dayjs("2024-04-02").toDate(),
    endAt: dayjs("2024-05-10").toDate(),
    course: courses.find(({ name }) => name === "Advanced SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Microsoft")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 72,
    cohortId: cohorts.find(({ name }) => name === "E-1223")?.id!,
    startAt: dayjs("2024-04-29").toDate(),
    endAt: dayjs("2024-05-10").toDate(),
    course: courses.find(({ name }) => name === "Automation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Microsoft")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Vedant")!,
  },
  {
    id: 73,
    cohortId: cohorts.find(({ name }) => name === "E-1223")?.id!,
    startAt: dayjs("2024-05-13").toDate(),
    endAt: dayjs("2024-05-24").toDate(),
    course: courses.find(({ name }) => name === "Automation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Microsoft")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Vedant")!,
  },
  //// 2024-March-intake
  // E-0324
  {
    id: 74,
    cohortId: cohorts.find(({ name }) => name === "E-0324")?.id!,
    startAt: dayjs("2024-02-26").toDate(),
    endAt: dayjs("2024-04-26").toDate(),
    course: courses.find(({ name }) => name === "Content Creation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 75,
    cohortId: cohorts.find(({ name }) => name === "E-0324")?.id!,
    startAt: dayjs("2024-02-26").toDate(),
    endAt: dayjs("2024-04-26").toDate(),
    course: courses.find(({ name }) => name === "E-commerce")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 76,
    cohortId: cohorts.find(({ name }) => name === "E-0324")?.id!,
    startAt: dayjs("2024-04-29").toDate(),
    endAt: dayjs("2024-06-07").toDate(),
    course: courses.find(({ name }) => name === "Advanced Digital Strategies")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Mariam")!,
  },
  {
    id: 77,
    cohortId: cohorts.find(({ name }) => name === "E-0324")?.id!,
    startAt: dayjs("2024-04-29").toDate(),
    endAt: dayjs("2024-06-21").toDate(),
    course: courses.find(({ name }) => name === "Digital Ads")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Brian")!,
  },
  {
    id: 78,
    cohortId: cohorts.find(({ name }) => name === "E-0324")?.id!,
    startAt: dayjs("2024-06-10").toDate(),
    endAt: dayjs("2024-07-26").toDate(),
    course: courses.find(({ name }) => name === "Growth Marketing")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: instructors.find(({ name }) => name === "Vedant")!,
  },
  {
    id: 79,
    cohortId: cohorts.find(({ name }) => name === "E-0324")?.id!,
    startAt: dayjs("2024-07-02").toDate(),
    endAt: dayjs("2024-08-09").toDate(),
    course: courses.find(({ name }) => name === "Advanced SEO")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Wednesday - Friday"
    )!,
    instructor: instructors.find(({ name }) => name === "Iman")!,
  },
  {
    id: 80,
    cohortId: cohorts.find(({ name }) => name === "E-0324")?.id!,
    startAt: dayjs("2024-07-29").toDate(),
    endAt: dayjs("2024-08-09").toDate(),
    course: courses.find(({ name }) => name === "Automation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Wednesday"
    )!,
    instructor: null,
  },
  {
    id: 81,
    cohortId: cohorts.find(({ name }) => name === "E-0324")?.id!,
    startAt: dayjs("2024-08-12").toDate(),
    endAt: dayjs("2024-08-23").toDate(),
    course: courses.find(({ name }) => name === "Automation")!,
    classroom: CLASSROOMS.find(({ name }) => name === "Apple")!,
    weekdaysRange: WEEKDAYS_RANGES.find(
      ({ name }) => name === "Monday - Friday"
    )!,
    instructor: null,
  },
];
