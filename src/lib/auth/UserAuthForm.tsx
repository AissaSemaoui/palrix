"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { mutations, requests } from "@/api-client";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const signInWithGoogle = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/google";
  };

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
