import React from "react";
import Image from "next/image";

import OAuthButtonGroup from "./components/OAuthButtonGroup";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
   return (
      <main className="bg-base-200/70 flex min-h-screen">
         <section className="px-4 py-6 flex-1 max-w-7xl mx-auto w-full h-full">
            <header>
               <div className="flex  items-center gap-3">
                  <Image
                     src="/assets/logo.png"
                     alt="logo"
                     width={100}
                     height={100}
                     className="w-10 h-10"
                  />
                  <span className="text-3xl font-bold italic text-primary">Next Social</span>
               </div>
            </header>

            <div className="w-[540px] mt-8 mx-auto p-12 rounded-lg shadow-md bg-base-100 ring-1 ring-neutral-content">
               <OAuthButtonGroup />
               <div className="mb-4 relative text-center after:block after:border after:border-solid after:border-[hsl(var(--bc)/0.2)] after:absolute after:top-1/2 after:w-full after:rounded-md">
                  <span className="font-semibold bg-base-100 inline-block relative px-4 z-[1]">
                     Or
                  </span>
               </div>
               <div>{children}</div>
            </div>
         </section>
      </main>
   );
};
export default AuthLayout;
