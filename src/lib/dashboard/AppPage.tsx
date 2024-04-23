import React from "react";

import { cn } from "@/lib/utils";
import Heading from "../../components/heading";

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
      <p className="text-lg text-light">{description}</p>
    </section>
  );
};

const AppPage = ({ children, className }: AppPageProps) => {
  return <main className={cn("p-8", className)}>{children}</main>;
};

AppPage.Header = PageHeader;

export default AppPage;
