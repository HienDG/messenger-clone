"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";

import { MdOutlineGroupAdd } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

import ConversationItem from "./ConversationItem";

import { merge } from "@src/utils";
import { ExtendConversationType } from "@src/types/db";

interface ConversationListProps {
   initialConversations: ExtendConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialConversations }) => {
   const [conversations, setIsConversations] =
      useState<ExtendConversationType[]>(initialConversations);
   const params = useParams();

   // check if params not exist
   const conversationId = useMemo(() => {
      if (!params.slug) return null;

      return params.slug as string;
   }, [params.slug]);

   return (
      <aside
         className={merge(
            "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r bg-base-100 border-[hsl(var(--bc)/.2)]",
         )}
      >
         {/* Heading */}
         <div className="px-2">
            <div className="flex justify-between mb-4 pt-4">
               <div className="text-2xl font-bold">Messages</div>
               <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
                  <MdOutlineGroupAdd size={20} />
               </div>
            </div>

            {/* Search bar */}
            <div className="pt-[6px] pb-3 relative">
               <div>
                  <div className="flex flex-col w-full">
                     <div className="px-4">
                        <div className="flex items-center w-full">
                           <label
                              htmlFor=""
                              className="flex relative rounded-full items-stretch min-h-[36px] bg-base-300"
                           >
                              <span className="flex items-center pl-2.5">
                                 <AiOutlineSearch />
                              </span>

                              <input
                                 type="text"
                                 className="h-9 flex-1 pt-[7px] px-[6px] pb-[9px] outline-none border-none bg-transparent focus:outline-0 focus:ring-0"
                                 placeholder="Search Messenger"
                              />
                           </label>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* User list */}
            <div className="space-y-2">
               {conversations.map((cv) => (
                  <ConversationItem
                     conversation={cv}
                     key={cv.id}
                     selected={conversationId === cv.id}
                  />
               ))}
            </div>
         </div>
      </aside>
   );
};
export default ConversationList;