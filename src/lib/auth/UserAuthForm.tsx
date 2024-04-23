"use client";

import * as React from "react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";

import { cn } from "@/lib/utils";
import { useUserMe } from "@/hooks/use-user";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const user = useUserMe();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const signInWithGoogle = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/google";
  };

  console.log(user?.id);

  return (
    <div className={cn(className)} {...props}>
      <Button
        variant="outline"
        size="lg"
        className="mt-6 flex w-full items-center justify-center gap-2"
        onClick={signInWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <img src={`https://www.material-tailwind.com/logos/logo-google.png`} alt="google" className="h-6 w-6" />
        )}
        sign in with google
      </Button>
    </div>
  );
}
