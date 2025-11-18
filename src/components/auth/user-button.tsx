"use client";

import { useSession } from "@/lib/auth-client";
import { useCredits } from "@/hooks/use-credits";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { SignOutButton } from "./sign-out-button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export function UserButton() {
  const { data: session, isPending } = useSession();
  const { credits, processingCount, availableCredits } = useCredits();

  if (isPending) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.preventDefault()}>
          <div className="flex items-center justify-between w-full">
            <span>Total Credits</span>
            <Badge variant="secondary">{credits}</Badge>
          </div>
        </DropdownMenuItem>
        {processingCount > 0 && (
          <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.preventDefault()}>
            <div className="flex items-center justify-between w-full">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Available</span>
                      {availableCredits === 0 && (
                        <AlertCircle className="h-3 w-3 text-yellow-600" />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{processingCount} credit{processingCount !== 1 ? 's' : ''} reserved for processing</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Badge variant={availableCredits === 0 ? "destructive" : "outline"}>
                {availableCredits}
              </Badge>
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
