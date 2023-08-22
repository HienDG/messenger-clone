"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import find from "lodash.find";
import { useRouter } from "next/navigation";

import { MdOutlineGroupAdd } from "react-icons/md";

import ConversationItem from "./ConversationItem";

import { useSlug } from "@src/hooks";
import { merge } from "@src/utils";
import pusherClient from "@src/lib/pusher_client";
import { ExtendConversationType } from "@src/types/db";

interface ConversationListProps {
   initialConversations: ExtendConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialConversations }) => {
   const session = useSession();
   const router = useRouter();

   const [conversations, setConversations] =
      useState<ExtendConversationType[]>(initialConversations);

   const slug = useSlug();

   const isOpen = useMemo(() => !!slug, [slug]);

   const email = useMemo(() => {
      return session.data?.user?.email;
   }, [session.data?.user?.email]);

   useEffect(() => {
      // check if usr not logged in
      if (!email) return;

      pusherClient.subscribe(email);

      const newConversationHandler = (cv: ExtendConversationType) => {
         setConversations((prevCv) => {
            if (find(prevCv, { id: cv.id })) {
               return prevCv;
            }

            return [cv, ...prevCv];
         });
      };

      const updateConversationHandler = (cv: ExtendConversationType) => {
         setConversations((prevCvs) => {
            return prevCvs.map((prevCv) => {
               if (prevCv.id === cv.id) {
                  return {
                     ...prevCv,
                     messages: cv.messages,
                  };
               }

               return { ...prevCv };
            });
         });
      };

      pusherClient.bind("conversation:new", newConversationHandler);
      pusherClient.bind("conversation:update", updateConversationHandler);
   }, [email, router]);

   return (
      <aside
         className={merge(
            "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r bg-base-100 border-[hsl(var(--bc)/.2)]",
            {
               ["hidden"]: isOpen,
               ["block w-full left-0"]: !isOpen,
            },
         )}
      >
         {/* Heading */}
         <div className="px-2">
            <div className="flex justify-between mb-4 py-3 bg-base-100">
               <div className="text-2xl font-bold">Messages</div>
               <div className="rounded-full p-2 bg-base-300 cursor-pointer hover:opacity-75 transition">
                  <MdOutlineGroupAdd size={20} />
               </div>
            </div>

            {/* User list */}
            <div className="space-y-2">
               {conversations.map((cv) => (
                  <ConversationItem conversation={cv} key={cv.id} selected={slug === cv.id} />
               ))}
            </div>
         </div>
      </aside>
   );
};
export default ConversationList;
