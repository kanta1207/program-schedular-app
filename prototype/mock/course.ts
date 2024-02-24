import { PROGRAMS } from "@/constants/_index";
import { Course } from "@/types/_index";

export const courses: Course[] = [
  {
    id: 1,
    name: "Digital Marketing 1",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 2,
    name: "WordPress",
    requiredHours: 30,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 3,
    name: "Design",
    requiredHours: 30,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 4,
    name: "Analytics",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 5,
    name: "Digital Marketing 2",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 6,
    name: "Social Media",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 7,
    name: "SEO",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 8,
    name: "Campaign Management",
    requiredHours: 120,
    program: PROGRAMS.find(({ name }) => name === "DMS")!,
  },
  {
    id: 9,
    name: "Advanced Digital Strategies",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
  {
    id: 10,
    name: "E-commerce",
    requiredHours: 80,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
  {
    id: 11,
    name: "Growth Marketing",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
  {
    id: 12,
    name: "Digital Ads",
    requiredHours: 80,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
  {
    id: 13,
    name: "Advanced SEO",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
  {
    id: 14,
    name: "Automation",
    requiredHours: 60,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
  {
    id: 15,
    name: "Content Creation",
    requiredHours: 80,
    program: PROGRAMS.find(({ name }) => name === "DMA")!,
  },
];
