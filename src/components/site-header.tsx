"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { PlushifyLogo } from "./plushify-logo";
import { CreditBadge } from "./credits/credit-badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSession } from "@/lib/auth-client";
import { useCredits } from "@/hooks/use-credits";
import { SignInButton } from "./auth/sign-in-button";
import { SignOutButton } from "./auth/sign-out-button";
import { MobileMenu } from "./navigation/mobile-menu";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Generate", href: "/generate" },
  { name: "Gallery", href: "/gallery" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const { credits } = useCredits();

  // Filter navigation based on authentication state
  const protectedRoutes = ["/dashboard", "/generate", "/gallery"];
  const visibleNavigation = navigation.filter(
    (item) => session || !protectedRoutes.includes(item.href)
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <PlushifyLogo size="md" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {visibleNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Credit Badge - only show when authenticated */}
            {session && (
              <Link href="/pricing" className="hidden sm:block">
                <CreditBadge creditCount={credits} />
              </Link>
            )}

            {/* Dark Mode Toggle */}
            <ModeToggle />

            {/* Loading State */}
            {isPending && (
              <div className="hidden md:flex h-8 w-8 animate-pulse rounded-full bg-muted" />
            )}

            {/* Sign In Button - show when not authenticated */}
            {!isPending && !session && (
              <div className="hidden md:block">
                <SignInButton />
              </div>
            )}

            {/* User Profile Dropdown - show when authenticated */}
            {!isPending && session && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hidden md:flex"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? "User"} />
                      <AvatarFallback>
                        {session.user.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pricing">Buy Credits</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={visibleNavigation}
      />
    </>
  );
}
