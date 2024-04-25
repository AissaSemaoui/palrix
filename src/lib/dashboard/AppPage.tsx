import React from "react";

import { cn } from "@/lib/utils";
import Heading from "@/components/Heading";
import { CardTitle } from "@/components/ui/Card";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

interface AppPageProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeader = ({ title, description, className }: PageHeaderProps) => {
  return (
    <section className={cn("mb-6", className)}>
      <Heading type={1}>{title}</Heading>
      <CardTitle className="text-lg text-light">{description}</CardTitle>
    </section>
  );
};

const AppPage = ({ children, className }: AppPageProps) => {
  return <main className={cn("p-4 md:p-8", className)}>{children}</main>;
};

AppPage.Header = PageHeader;

export default AppPage;
