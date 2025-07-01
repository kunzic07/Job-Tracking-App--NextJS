// import Image from "next/image";
// import Logo from "../assets/logo.svg";
// import LandingImg from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 ">
        <img src="/logo.svg" alt="logo" width={164} height={50} />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4 text-justify">
            <strong>Jobify Tracking App</strong> is a modern, full-featured job
            application tracker designed for job seekers who want to organize,
            track, and analyze their job search journey. Built with Next.js 14+,
            TypeScript, Clerk authentication, Prisma ORM, React Query,
            shadcn/ui, and Tailwind CSS, Jobify offers a beautiful and
            responsive dashboard, secure authentication, analytics, and theming.
            Effortlessly add, edit, and manage job applications, visualize your
            progress with insightful stats, and enjoy a seamless user experience
            across devices. Whether you&apos;re actively searching for a new
            role or want to keep your career organized, Jobify is your
            open-source companion for a smarter job search.
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <img
          src="/main.svg"
          alt="landing"
          className="hidden lg:block "
          width="400"
          height="400"
        />
      </section>
    </main>
  );
}
