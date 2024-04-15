import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

import { UserAuthForm } from "@/lib/auth/UserAuthForm";

const RegisterPage = () => {
  return (
    <section className="flex-1 bg-white">
      <div className="min-h-screen lg:grid lg:grid-cols-12">
        <section className="relative flex  items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="px-8 py-8 sm:px-12 lg:relative lg:col-span-7 lg:block lg:px-16 lg:py-12 ">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <Icons.logo className="h-10 w-10" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Welcome to {siteConfig.name}</h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam, quibusdam aperiam
              voluptatum.
            </p>
          </div>
        </section>

        <main className="flex w-full items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <UserAuthForm className="w-full" />
        </main>
      </div>
    </section>
  );
};

export default RegisterPage;
