import React from "react";

import { cn } from "@/lib/utils";
import Heading from "@/components/Heading";
import { CardTitle } from "@/components/ui/card";
import If from "@/components/If";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  leftSection?: React.ReactNode;
}

interface AppPageProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeader = ({ title, description, className, leftSection }: PageHeaderProps) => {
  return (
    <section className={cn("mb-6 flex items-center justify-between", className)}>
      <div>
        <Heading type={1} className="font-bold">
          {title}
        </Heading>
        <CardTitle className="text-md font-normal text-light">{description}</CardTitle>
      </div>

      <If condition={leftSection}>{leftSection}</If>
    </section>
  );
};

const AppPage = ({ children, className }: AppPageProps) => {
  return <main className={cn("container p-4 md:p-8", className)}>{children}</main>;
};

AppPage.Header = PageHeader;

export default AppPage;
