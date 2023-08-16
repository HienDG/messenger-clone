import React from "react";

import PeopleList from "./components/PeopleList";

import { getAllPeople } from "@src/lib/actions";

const PeopleLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
   const users = await getAllPeople();

   return (
      <div className="h-full">
         <PeopleList items={users} />
         <div className="hidden lg:block lg:pl-80 h-full">{children}</div>
      </div>
   );
};
export default PeopleLayout;
