import Link from "next/link";
import Providers from "./providers";
import { NavItem } from "@/components/nav-item";
import HeaderAuth from "@/components/header-auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { House } from "lucide-react";
import { AppWindow } from "lucide-react";
import AdminBreadcrumbs from "./AdminBreadcrumbs";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:pl-14 h-[100vh]">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:py-4  sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-between">
            <MobileNav />
            <AdminBreadcrumbs />
            <HeaderAuth />
          </header>
          <main className="flex flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            <div className="w-full flex flex-col gap-4 mt-4 mb-4">
              {children}
            </div>
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <LayoutGrid />
          <span className="sr-only">RAG Admin</span>
        </Link>

        <NavItem href="home" label="Home">
          <House />
        </NavItem>

        <NavItem href="applications" label="Applications">
          <AppWindow />
        </NavItem>
      </nav>
      {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav> */}
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <LayoutGrid />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="home"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <House />
            Home
          </Link>
          <Link
            href="applications"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <AppWindow />
            Applications
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
