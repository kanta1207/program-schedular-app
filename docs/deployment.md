# How to deploy the project

This guide provides instructions on how to deploy the project for free, using [Vercel](https://vercel.com/) for frontend & API, and [Supabase](https://supabase.com/) for database.

## Database

Let's start from the database.
With Supabase, all you need to do in this project is just to create a project and check all of the environment variables.

#### Steps

1. Login to [Supabase](https://supabase.com/), create a project.
2. In the dashboard page, go to "Project Settings" from the sidebar.
3. In the setting page, you can see all of the environment variables in "Database" section.

## Backend (API)

After setting up the database, the next step is to deploy the backend API.

#### Why should we transfer this project into personal Github account?

We're recommending to somehow transfer this project into your personal Github account (in step 1-2), because Vercel will charge you if you want to deploy any project belongs to an organization. ([Reference](https://vercel.com/pricing))

#### Make sure you execute seeding only in first deploy

Since vercel doesn't allow us to manually execute commands in server, we decided to do migration & seeding on build. So our current build command is

```json
    "build": "nest build && npm run migration:run && npm run seed"
```

But we want to avoid seeding the database in every deployment, because it will initialize all of the tables.

Therefore, **please make it sure after the first deployment, change the build command to**

```json
   "build": "nest build && npm run migration:run"
```

#### Steps

1. Download ZIP of this project into your personal device.
2. Create private repository in your personal github, and upload all of the files you just downloaded. **You need to make this repository private because this project contains CICCC's actual instructor's names pr other credentials in seeding files.**
3. Login to [Vercel](https://vercel.com/), create a project.
4. Deploy the project. You need to select `backend` as root directory.
   Make it sure you use the environment variables(`Host`,`Database name`,`Port`,`User`,`Password`)
5. Go to "Project Settings" page, amd in "Deployment Protection", you need to disable `Vercel Authentication` to accept the request from the frontend.

### Frontend
