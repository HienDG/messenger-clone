import React from "react";
import type { User } from "@prisma/client";

import PeopleItem from "./PeopleItem";

interface PeopleListProps {
   items: User[];
}

const PeopleList: React.FC<PeopleListProps> = ({ items }) => {
   return (
      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-[hsl(var(--bc)/.2)] block w-full left-0">
         <div className="px-5">
            <div className="flex-col">
               <div className="text-2xl font-bold py-4">People</div>
            </div>
         </div>

         <div>
            {items.map((item) => (
               <PeopleItem key={item.id} item={item} />
            ))}
         </div>
      </aside>
   );
};
export default PeopleList;
