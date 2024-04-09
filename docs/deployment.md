# How to deploy the project

This guide provides instructions on how to deploy the project for free, using [Vercel](https://vercel.com/) for frontend, [render](https://render.com/) for backend API, and [Supabase](https://supabase.com/) for database.

## Database

Let's start from the database.
With Supabase, all you need to do in this project is just to create a project and check if all of the environment variables are available.

#### Steps

1. Login to [Supabase](https://supabase.com/), create a project.
2. In the dashboard page, go to "Project Settings" from the sidebar.
3. In the setting page, you can see all of the environment variables in "Database" section.

## Backend API

After setting up the database, the next step is to deploy the backend API.
We will use [render](https://render.com/) for it, considering the pricing. It'd be free as of Apr 9. 2024 ([Reference](https://render.com/pricing))

There is one thing you need to be careful on your deployment.

#### Make sure you execute seeding only in first deploy

Since render doesn't allow us to manually execute commands in server, we decided to do migration & seeding on build.

But we want to avoid seeding the database in every deployment, because it will initialize all of the tables.

So we decided to have 2 types of build commands.

```json
    "build:initial-prod": "npm install -g @nestjs/cli && npm install && npm run migration:run && npm run seed",
    "build:prod": "npm install -g @nestjs/cli && npm install && npm run migration:run",
```

**Only when you deploy the whole application including backend for the first time, use `build:initial-prod` as build command.** It includes seeding.

**After the first deployment, please don't forget to change the build command setting to `build:prod`**. It doesn't contain seeding command.

#### Steps

1. Login to [render](https://render.com/).
2. Click "New" button in the dashboard, and select "Create a new Web Service".
3. Select "Build and deploy from a Git repository", and select the repository. You can deploy the project there.
   - Select `backend` as rood directory.
   - Select `Node` for runtime.
   - For build command,
     - If it's the first deployment including database, use `npm run build:initial-prod`
     - If you don't want to initialize the database, please use `npm run build:prod`
   - For start command, use `npm run start:prod`
   - Add the environment variables from Supabase(`Host`,`Database name`,`Port`,`User`,`Password`).

## Frontend

Finally, let's deploy frontend side of this application.
Considering the price and compatibility with Next.js, we decided to use Vercel.
To deploy the project on Vercel, We're recommending to somehow transfer this project into your personal Github account (in step 1-2), because Vercel will charge you if you want to deploy any project belongs to an organization. ([Reference](https://vercel.com/pricing))

#### Steps

1. Download ZIP of this project into your personal device.
2. Create private repository in your personal github, and upload all of the files you just downloaded. **You need to make this repository private because this project contains CICCC's actual instructor's names pr other credentials in seeding files.**
3. Login to [Vercel](https://vercel.com/)
4. Deploy the project by importing the repository from your Github.
   - Choose `frontend` as root directory if you upload all of this project into your personal Github account.
   - Make it sure add the backend API url from render to `NEXT_PUBLIC_API_URL` as environment variable.
