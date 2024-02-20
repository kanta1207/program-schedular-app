# ERD

```mermaid
erDiagram
    Enrollments ||--o{ Cohorts : "One to Many"
    Programs ||--o{ Cohorts : "One to Many"
    Cohorts ||--|| Schedules : "One to One"
    Schedules ||--o{ Slots : "One to Many"
    Slots ||--o{ Classes : "One to Many"
    Programs ||--o{ Courses : "One to Many"
    Classes }o--|| Classrooms : "Many to One"
    Classes }o--|| Instructors : "One to Many"
    Courses ||--o{  Classes : "One to Many"
    PeriodOfDay ||--o{ InstructorPeriodOfDay : "One to Many"
    PeriodOfDay ||--o{ CohortPeriodOfDay : "One to Many"
    Instructors ||--o{ InstructorPeriodOfDay : "One to Many"
    Courses ||--o{ CourseInstructor : "One to Many"
    Cohorts ||--o{ CohortPeriodOfDay : "One to Many"
    Instructors ||--o{ CourseInstructor : "One to Many"
    Instructors ||--o{ InstructorHour : "One to Many"
    Instructors ||--o{ InstructorWeekday : "One to Many"
    Hours ||--o{ InstructorHour : "One to Many"
    Weekdays ||--o{ InstructorWeekday : "One to Many"
    Days ||--o{ DaysWeekdays : "One to Many"
    Days ||--o{ DaysClasses : "One to Many"
    Classes ||--o{ DaysClasses : "One to Many"
    Weekdays ||--o{ DaysWeekdays : "One to Many"



    Users {
        id string PK
        email string
        password string
        first_name string
        last_name string
        created_at Date
        updated_at Date
    }

    Enrollments {
        id string PK
        created_at Date
        updated_at Date
        start_date Date
        end_date Date
    }

    Programs {
        id string PK
        created_at Date
        updated_at Date
        name string
    }

    Courses {
        id string PK
        created_at Date
        updated_at Date
        name string
        required_hours number
        program_id string FK
    }

    Cohorts {
        id string PK
        created_at Date
        updated_at Date
        name string
        period_of_day_id string FK
        program_id string FK
        schedule_id string FK
    }

    Schedules {
        id string PK
        created_at Date
        updated_at Date
        cohort_id string FK
    }

    Slots {
        id string PK
        created_at Date
        updated_at Date
        start_at Date
        end_at Date
        slot_type_id string FK
        schedule_id string FK
    }

     Classes {
        id string PK
        start_date Date
        end_date Date
        created_at Date
        updated_at Date
        days_id string FK
        slot_id string FK
        course_id string FK
        classroom_id string FK
        instructor_id string FK
    }

    PeriodOfDay {
        id string PK
        name string
        created_at Date
        updated_at Date
    }

    Days {
        id string PK
        name string
        created_at Date
        updated_at Date
    }

    Classrooms {
        id string PK
        name string
        created_at Date
        updated_at Date
    }

    Instructors {
        id string PK
        name string
        is_active boolean
        created_at Date
        updated_at Date
    }

    Weekdays {
        id string PK
        name string
        created_at Date
        updated_at Date
    }

    Hours {
        id string PK
        name string
        created_at Date
        updated_at Date
    }

      InstructorPeriodOfDay {
        created_at Date
        updated_at Date
        instructor_id string FK
        period_of_day_id string FK
    }


    CohortPeriodOfDay {
        created_at Date
        updated_at Date
        cohort_id string FK
        period_of_day_id string FK
    }


    InstructorWeekday {
        created_at Date
        updated_at Date
        instructor_id string FK
        weekdays_id string FK
    }

    InstructorHour {
        created_at Date
        updated_at Date
        instructor_id string FK
        hour_id string FK
    }

    CourseInstructor {
        created_at Date
        updated_at Date
        course_id string FK
        instructor_id string FK
    }

    DaysClasses {
         created_at Date
        updated_at Date
        days_id string
        classes_id string
    }

    DaysWeekdays {
        created_at Date
        updated_at Date
        days_id string　FK
        weekdays_id string FK
    }

```

## Users

- User of this application (Rodrigo)
- If each instructors needs to create an account, we can add Role to here,

#### Schema

```ts
{
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}
```

## Enrollments

- Indicates when students are admitted and the duration of the Program
- This is a parent concept of Class, thus Enrollment has multiple classes
  (m1-0124-web, m2-0124-web, a1-0124-web, etc...)

#### Example

- 2023 winter, 2024 spring

#### Schema

- id : **string**
- start_date : **Date**
- end_date : **Date**
- classes : **Classes** (One to Many)

## Programs

- Each one of the classes are defined as 1 specific program
- Set of CourseContents for each classes will be different, depending on the Program

#### Example

- A1-0124

#### Schema

- id : **string**
- name : **string**
- classes : **Classes** (One to Many)
- course_contents : **CourseContents** (One to Many)

## CourseContents

- Content of course
- Have its name, required hours, topic

#### Example

- Campaign Management, Digital Marketing 1, Digital Marketing 2, SEO

#### Schema

- id : **string**
- name : **string**
- required_hours : **number**
- program_id : **string** (FK for program)
- courses : **Course** (One to Many)
- instructors: **Instructors** (Many to Many)

## Classes

- Have a concept of the time of day, the class group, the day it began, and the category.

#### Example

- m1-0124-web -> morning class of web dev 1 starts from Jan 24
- m2-0124-web -> morning class of web dev 2 starts from Jan 24
- a1-0124-web -> afternoon class of web dev starts from Jan 24
- e1-0124-web -> evening class of web dev starts from Jan 24
- In our case, it's a2-0523-web

#### Schema

- id : **string**
- name : **string**
- period_id : **string** (FK for PeriodOfDay)
- program_id : **string** (FK for program)
- courses : **Course** (One to Many)

## PeriodOfDay

- Concept of the time of day.
- There are only three values.(Morning, Afternoon, Evening)

#### Schema

- id : string
- name : **string**
- instructors : **Instructors[]**
- classes : **Classes[]**

## Courses

- The frame consists of `CourseContent`, `classroom`, and so on
- Has a flexible period specifying "start date" and "end date"

#### Schema

- id : **string**
- start_date : **Date**
- end_date : **Date**
- days_of_the_week : **DaysOfTheWeek** (Many to Many)
- class_id : **string** (FK for Class)
- content_id : **string** (FK for CourseContent)
- classroom_id : **string** (FK for Classroom)
- instructor_id : **string** (FK for Instructor)

## DaysOfTheWeek

- Concept of the days of the week.
- There are only five values.(Mon ~ Fri)

#### Schema

- id : **string**
- name : **string**

## Classrooms

#### Schema

- id : **string**
- name : **string**
- courses : **Courses** (One to Many)

## Instructors

#### Schema

- id : **string**
- name : **string**
- is_Active : **boolean**
- hours : **string**
- periods : **PeriodOfDay** (One to Many)
- days_of_the_week : **DaysOfTheWeek** (One to Many)
- course_content : **CourseContent** (One to Many)
- remaining_hours : **number**

## Hours

- Maximum hours of work per week
- There are only four values.(10h,20h,30h,40h)

#### Schema

- id : **string**
- name : **string**
