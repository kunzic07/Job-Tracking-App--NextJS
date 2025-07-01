# Jobify Tracking Web App - NextJS

---

## Project Summary

**Jobify Tracking App** is a full-featured, modern job application tracking system built with [Next.js](https://nextjs.org/) (App Router), TypeScript, [Clerk](https://clerk.com/) authentication, [Prisma](https://www.prisma.io/) ORM, [React Query](https://tanstack.com/query), [shadcn/ui](https://ui.shadcn.com/), and [Tailwind CSS](https://tailwindcss.com/). It empowers job seekers to efficiently organize and analyze their job search journey via an intuitive dashboard, CRUD operations, analytics, authentication, theming, and a highly modular structure. This project is an excellent resource for learning and sharing advanced Next.js, React, and TypeScript techniques.

- **Live-Demo:** _Coming Soon!_

---

## Table of Contents

1. [Project Summary](#project-summary)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [Core Functionality Walkthrough](#core-functionality-walkthrough)
7. [API & Routing](#api--routing)
8. [Component Overview](#component-overview)
9. [Theming & Customization](#theming--customization)
10. [Code Examples](#code-examples)
11. [Learning Outcomes & Keywords](#learning-outcomes--keywords)
12. [Conclusion](#conclusion)

---

## Features

- **User Authentication:** Secure login/signup with Clerk.
- **Job CRUD:** Add, view, edit, and delete job applications.
- **Dashboard Analytics:** Visual statistics of your job search (Recharts).
- **Responsive UI:** Beautiful, mobile-friendly layouts using shadcn/ui and Tailwind CSS.
- **Dark/Light Mode:** Toggle themes with next-themes and shadcn/ui.
- **Reusable Components:** Modular, extensible codebase.
- **Type Safety:** TypeScript everywhere for reliability.
- **API Routes:** Server actions, RESTful endpoints with Prisma ORM.
- **State Management:** Powered by React Query.
- **Form Handling & Validation:** react-hook-form + zod for strong, type-safe forms.
- **Modern Tooling:** ESLint, Prettier, and Next.js 14+ features.

---

## Technology Stack

- **Frontend:** Next.js 14+, React 18, TypeScript, shadcn/ui, Tailwind CSS, Lucide Icons
- **Authentication:** Clerk
- **Backend/ORM:** Prisma, SQLite/PostgreSQL
- **State/Data:** React Query
- **Styling:** Tailwind CSS, CSS Modules
- **Forms:** react-hook-form, zod
- **Theming:** next-themes
- **Build Tools:** ESLint, Prettier
- **Charts:** Recharts

---

## Project Structure

> _Partial file/folder listing. For a full view, see [the repo tree](https://github.com/arnobt78/Job-Tracking-App--NextJS/tree/main)._

```bash

Job-Tracking-App--NextJS/
├── app/                # Next.js app directory (pages, layouts, providers)
│   ├── (dashboard)/    # Dashboard routes (add-job, jobs, stats)
│   ├── providers.tsx   # React context and theme providers
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Landing/Home page
├── assets/             # Logo, SVG, and static assets
├── components/         # Reusable UI (Navbar, Sidebar, Forms, etc.)
│   ├── ui/             # shadcn/ui components (Button, Input, etc.)
├── lib/                # Utility libraries (API, helpers)
├── middleware.ts       # Clerk authentication middleware
├── prisma/             # Prisma schema and migrations
├── public/             # Public/static files
├── utils/              # Types, constants, links, etc.
│   ├── types.ts        # Job types, enums, schema
│   ├── links.tsx       # Navigation links
├── .env.example        # Example environment variables
├── package.json
├── tailwind.config.js/.ts
├── README.md
├── ...
```

---

## Setup & Installation

### 1. Create a New Next.js Project

```sh
npx create-next-app@14 projectName
```

- Choose TypeScript and ESLint when prompted.

### 2. Install Dependencies

```sh
npm install
```

**Main Libraries:**

```sh
npm install @clerk/nextjs@^4.27.7 @prisma/client@^5.7.0 @tanstack/react-query@^5.14.0 @tanstack/react-query-devtools@^5.14.0 dayjs@^1.11.10 next-themes@^0.2.1 recharts@^2.10.3
npm install prisma@^5.7.0 -D
```

### 3. Install and Setup shadcn/ui

```sh
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add form input select dropdown-menu
```

- See [shadcn/ui docs](https://ui.shadcn.com/) for more.

### 4. Environment Variables

- Copy `.env.example` to `.env` and add your Clerk and database credentials.

````env

// Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.[supabase-project-db-id]:[supabase-project-db-password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

// Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.[supabase-project-db-id]:[supabase-project-db-password]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
´´´

### 5. Prisma Database Setup

```sh
npx prisma generate
````

- To push changes to the DB schema:

```sh
npx prisma db push
```

### 6. Run the Development Server

```sh
npm run dev
```

- Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Core Functionality Walkthrough

### Authentication

- Uses Clerk for user authentication.
- `middleware.ts` ensures only the home page is public; dashboard pages are protected.
- Sign in/out with Clerk's `<UserButton />`.

#### Example: Clerk Middleware

```tsx
import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/"],
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

---

### Dashboard

- After signing in, access `/add-job`, `/jobs`, `/stats`.
- **Sidebar & Navbar:** Navigation between dashboard sections.
- **LinksDropdown:** Hamburger dropdown for navigation on mobile.

### Example: Dashboard Layout

```tsx
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { PropsWithChildren } from "react";
function layout({ children }: PropsWithChildren) {
  return (
    <main className="grid lg:grid-cols-5">
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      <div className="lg:col-span-4">
        <Navbar />
        <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </main>
  );
}
export default layout;
```

---

### Job Management

- **Add Job:** `/add-job` page with a form (react-hook-form + zod validation).
- **All Jobs:** `/jobs` page lists your jobs, with edit/delete.
- **Stats:** `/stats` visualizes job status using Recharts.

### Example: Job Type Enums and Schema (utils/types.ts)

```ts
import * as z from "zod";
export enum JobStatus {
  Pending = "pending",
  Interview = "interview",
  Declined = "declined",
}
export enum JobMode {
  FullTime = "full-time",
  PartTime = "part-time",
  Internship = "internship",
}
export const createAndEditJobSchema = z.object({
  position: z
    .string()
    .min(2, { message: "position must be at least 2 characters." }),
  company: z
    .string()
    .min(2, { message: "company must be at least 2 characters." }),
  location: z
    .string()
    .min(2, { message: "location must be at least 2 characters." }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});
export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
```

---

### Theming

- Switch between light/dark/system mode with a Toggle (next-themes, Tailwind).
- ThemeProvider wraps the app; see `app/providers.tsx`.

### Example: Theme Toggle Component

```tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## API & Routing

- **API Routes:** Located in `app/api/`, handled via Next.js Route Handlers and Prisma.
- **Protected Routes:** Dashboard routes require authentication.
- **State Management:** React Query fetches and mutates job data.

---

## Component Overview

- **Navbar / Sidebar:** Layout and navigation.
- **LinksDropdown:** Mobile navigation.
- **ThemeToggle:** Light/dark switch.
- **FormComponents:** Custom input/select fields for job forms.
- **CreateJobForm:** Main form for adding jobs.
- **Stats Component:** Visualizes stats with Recharts.

### Example: Sidebar Component

```tsx
"use client";
import Logo from "@/assets/images/logo.svg";
import links from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <Image src={Logo} alt="logo" className="mx-auto" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => (
          <Button
            asChild
            key={link.href}
            variant={pathname === link.href ? "default" : "link"}
          >
            <Link href={link.href} className="flex items-center gap-x-2 ">
              {link.icon} <span className="capitalize">{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}
export default Sidebar;
```

---

## Theming & Customization

- **shadcn/ui:** Highly customizable UI primitives.
- **Tailwind CSS:** Utility-first styling; edit `tailwind.config.js` to tweak the palette or breakpoints.
- **Dark/Light Mode:** Powered by `next-themes`, easily expand with new themes.

---

## Code Examples

### Example: Add Job Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAndEditJobSchema, CreateAndEditJobType } from "@/utils/types";

function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: "pending",
      mode: "full-time",
    },
  });
  function onSubmit(values: CreateAndEditJobType) {
    // handle job creation
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ...other fields */}
        <Button type="submit">Add Job</Button>
      </form>
    </Form>
  );
}
export default CreateJobForm;
```

---

## Learning Outcomes & Keywords

**Keywords:** Next.js, TypeScript, Job Tracker, Clerk, Prisma, React Query, shadcn/ui, Tailwind CSS, React Hook Form, zod, API Routes, Dashboard, Theming, Recharts, Authentication

**Learning Outcomes:**

- Build a robust full-stack app with modern Next.js 14+.
- Implement authentication and protected routes with Clerk.
- Use Prisma for type-safe ORM/database access.
- Manage complex state/data fetching with React Query.
- Create accessible, responsive UI with shadcn and Tailwind.
- Structure and modularize large React/Next.js codebases.
- Add dark/light mode and theme switching.
- Validate forms using Zod and React Hook Form.

---

## Conclusion

Jobify Tracking App is both a practical job search companion and a powerful learning project. Explore the code, customize it, and extend it for your needs. Contributions and issues are welcome!

---

> **Happy Coding!** 🚀  
> Thank you for exploring and using Jobify Tracking App!

---
