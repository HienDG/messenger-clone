import React from "react";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

import { getCurrentUser } from "@src/lib/actions";

const Sidebar: React.FC<React.PropsWithChildren> = async ({ children }) => {
   const currentUser = await getCurrentUser();

   return (
      <div className="h-full">
         <DesktopSidebar user={currentUser} />
         <main className="lg:pl-20 h-full">{children}</main>
         <MobileFooter />
      </div>
   );
};
export default Sidebar;
