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

  const { mutate: googleMutate, isPending: isGoogleLoading, isError: isGoogleError } = mutations.useSignIn({});

  const signInWithGoogle = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className={cn(className)} {...props}>
      <Button
        type="button"
        className={cn("w-full", " font-bold")}
        onClick={signInWithGoogle}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
        Google
      </Button>
    </div>
  );
}
