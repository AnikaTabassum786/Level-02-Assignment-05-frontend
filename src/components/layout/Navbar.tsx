

"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const { data: session } = authClient.useSession();

  const role = (session?.user as { role?: string })?.role;

  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    ...(role === "CUSTOMER"
      ? [
          { title: "Cart", url: "/cart" },
          { title: "Order", url: "/orders" },
        ]
      : []),
    ...(role ? [{ title: "Dashboard", url: "/dashboard" }] : []),
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logout Successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={cn("py-4 border-b", className)}>
      <div className="container mx-auto px-4">

        {/* ================= DESKTOP ================= */}
        <nav className="hidden lg:flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-6">
            <span className="text-lg font-semibold">MediCare</span>

            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.url}
                      className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {session ? (
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {session.user.email}- {session.user.role}
                </p>

                <Button onClick={handleLogout} size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-muted">
                    Login
                  </button>
                </Link>

                <Link href="/signup">
                  <button className="px-3 py-1.5 bg-black text-white rounded-md text-sm">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* ================= MOBILE ================= */}
        <div className="lg:hidden flex items-center justify-between">

          <span className="font-semibold">MediCare</span>

          <Sheet>
            <SheetTrigger>
              <div className="p-2 border rounded-md">
                <Menu className="w-4 h-4" />
              </div>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>MediCare</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-6">

                {menu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="text-base font-medium"
                  >
                    {item.title}
                  </Link>
                ))}

                <ModeToggle />

                {session ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">
                      {session.user.email}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 bg-black text-white rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/login">
                      <button className="px-3 py-2 border rounded-md w-full">
                        Login
                      </button>
                    </Link>

                    <Link href="/signup">
                      <button className="px-3 py-2 bg-black text-white rounded-md w-full">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}

              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </section>
  );
};

export { Navbar };