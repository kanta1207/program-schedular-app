import dayjs from "dayjs";
import { Cohort } from "@/types/_index";
import { PERIOD_OF_DAYS, PROGRAMS } from "@/constants/_index";

export const cohorts: Cohort[] = [
  {
    id: 1,
    name: "M-1023",
    intake: {
      id: 2,
      name: "2023 September DMS",
      startDate: dayjs("2023-09-25").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Morning")!,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 2,
    name: "A-1023",
    intake: {
      id: 2,
      name: "2023 September DMS",
      startDate: dayjs("2023-09-25").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Afternoon")!,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 3,
    name: "E1-1023",
    intake: {
      id: 2,
      name: "2023 September DMS",
      startDate: dayjs("2023-09-25").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Evening")!,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 4,
    name: "E2-1023",
    intake: {
      id: 2,
      name: "2023 September DMS",
      startDate: dayjs("2023-09-25").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Evening")!,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 5,
    name: "A1-0124",
    intake: {
      id: 4,
      name: "2024 January DMS",
      startDate: dayjs("2024-01-02").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Afternoon")!,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 6,
    name: "E1-0124",
    intake: {
      id: 4,
      name: "2024 January DMS",
      startDate: dayjs("2024-01-02").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Evening")!,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 7,
    name: "E2-0124",
    intake: {
      id: 4,
      name: "2024 January DMS",
      startDate: dayjs("2024-01-02").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Evening")!,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 8,
    name: "E-0923",
    intake: {
      id: 1,
      name: "2023 August DMA",
      startDate: dayjs("2023-08-28").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Evening")!,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
  {
    id: 9,
    name: "E-1223",
    intake: {
      id: 3,
      name: "2023 November DMA",
      startDate: dayjs("2023-11-20").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Evening")!,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
  {
    id: 10,
    name: "E-0324",
    intake: {
      id: 5,
      name: "2023 March DMA",
      startDate: dayjs("2024-02-26").toDate(),
      cohorts: [],
    },
    periodOfDay: PERIOD_OF_DAYS.find(({ name }) => name === "Evening")!,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
];
