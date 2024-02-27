# Scheduler Application

## Project Setup Guide

This guide provides instructions on how to set up the project environment locally using Docker and Docker Compose.

### Configuration

1. Copy the sample environment variables file to create your own `.env` file:

```bash
$ cp .env.example .env.local
```

### Run application

```bash
$ cd frontend
$ npm install
$ npm run dev
```

## Developer guide

### Structure

```bash
.
├── actions ## Server actions for api fetch (e.g. getCohortById)
│   ├── cohorts
│   └── ...
├── app
│   ├── (auth) ## Authentication
│   ├── (site) ## Application site
│   ├── layout.tsx
│   └── theme.ts ## Material UI theme
├── components
│   ├── layouts ## Components for site layouts
│   │   ├── Container.tsx
│   │   └── Header.tsx
│   └── pages ## Components used in pages
│       ├── cohorts
│       └── ...
├── constants ## Constant values used in entire application
│   ├── _index.ts ## Barrel export (Exports all at once)
│   ├── classroom.ts
│   └── ...
├── helpers ## Reusable helper functions
│   └── calculateXXX.ts
├── hooks ## Reusable business logic
│   └── useXXX.ts
├── mock ## Temporary mock data (to be removed later on)
│   ├── _index.ts ## Barrel export
│   ├── class.ts
│   └── ...
└── types ## Types for application (some of them will be removed once types generated from api docs got available)
    ├── _index.ts
    ├── class.ts
    └── ...
```

### Naming conventions

- Files
  - UI components -> PascalCase (e.g. Header.tsx)
  - Functions -> camelCase (e.g. useXXX.ts, getCohorts.ts)
  - Variables and types -> Kebab Case (e.g. period-of-days.ts, instructor.ts)
- Variables
  - Follows js standards.
  - Constant values used in entire app -> Constants (e.g. CONTRACT_TYPES)

### Coding rule

- Types
  - Use Interface unless you need Type in such union types.
- Modules
  - Import variables and types using \_index barrel (e.g. import { xxx.ts } from './\_index.ts')
  - Export new files by adding in \_index.ts in an alphanumerical order.
- Styling
  - Use space or gap when you need a space between aligned items.
  - Use styling attributes in components provided by MUI as much as possible.
- Icons
  - Use material icons (https://mui.com/material-ui/material-icons/)
