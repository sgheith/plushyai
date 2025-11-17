"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CreditBadge } from "@/components/credits/credit-badge";
import { useSession } from "@/lib/auth-client";
import { useCredits } from "@/hooks/use-credits";
import { SignInButton } from "@/components/auth/sign-in-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navigation: Array<{ name: string; href: string }>;
}

export function MobileMenu({ open, onClose, navigation }: MobileMenuProps) {
  const { data: session, isPending } = useSession();
  const { credits } = useCredits();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Slide-out Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[300px] bg-background border-l shadow-lg transition-transform duration-300 md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Loading State */}
          {isPending && (
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </div>
          )}

          {/* Sign In Prompt - show when not authenticated */}
          {!isPending && !session && (
            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Sign in to access your account
              </p>
              <SignInButton />
            </div>
          )}

          {/* User Profile Section - show when authenticated */}
          {!isPending && session && (
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? "User"} />
                  <AvatarFallback>{session.user.name?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </div>

              <Link href="/pricing" onClick={onClose}>
                <CreditBadge creditCount={credits} className="w-fit" />
              </Link>
            </div>
          )}

          <Separator />

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-accent"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Separator />

          {/* Bottom Actions */}
          {!isPending && session && (
            <div className="p-4 space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/profile" onClick={onClose}>
                  View Profile
                </Link>
              </Button>
              <SignOutButton />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
