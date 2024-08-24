import { CardsActivityGoal } from "@/lib/examples/components/activity-goal";
import { CardsCalendar } from "@/lib/examples/components/calendar";
import { CardsChat } from "@/lib/examples/components/chat";
import { CardsCookieSettings } from "@/lib/examples/components/cookie-settings";
import { CardsCreateAccount } from "@/lib/examples/components/create-account";
import { CardsDataTable } from "@/lib/examples/components/data-table";
import { CardsMetric } from "@/lib/examples/components/metric";
import { CardsPaymentMethod } from "@/lib/examples/components/payment-method";
import { CardsReportIssue } from "@/lib/examples/components/report-issue";
import { CardsShare } from "@/lib/examples/components/share";
import { CardsStats } from "@/lib/examples/components/stats";
import { CardsTeamMembers } from "@/lib/examples/components/team-members";
import { cn } from "@/lib/utils";

type CardsDemoProps = {
  className?: string;
};

export default function CardsDemo({ className }: CardsDemoProps) {
  return (
    <div className={cn("md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4", className)}>
      <div className="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
        <CardsStats />
        <div className="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden">
          <CardsCalendar />
          <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
            <CardsActivityGoal />
          </div>
          <div className="pt-3 sm:col-span-2 xl:pt-4">
            <CardsMetric />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="space-y-4 xl:space-y-4">
            <CardsTeamMembers />
            <CardsCookieSettings />
            <CardsPaymentMethod />
          </div>
          <div className="space-y-4 xl:space-y-4">
            <CardsChat />
            <CardsCreateAccount />
            <div className="hidden xl:block">
              <CardsReportIssue />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
        <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
          <CardsCalendar />
          <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
            <CardsActivityGoal />
          </div>
          <div className="pt-3 sm:col-span-2 xl:pt-3">
            <CardsMetric />
          </div>
        </div>
        <div className="hidden md:block">
          <CardsDataTable />
        </div>
        <CardsShare />
        <div className="xl:hidden">
          <CardsReportIssue />
        </div>
      </div>
    </div>
  );
}
