import { SignIn } from "@clerk/nextjs";

import { paths } from "@/config/navigations";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <SignIn fallbackRedirectUrl={paths.dashboard.home} />
    </div>
  );
}
