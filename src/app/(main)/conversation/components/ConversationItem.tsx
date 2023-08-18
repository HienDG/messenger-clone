"use client";

import React, { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Avatar } from "@src/components/ui";

import { merge } from "@src/utils";
import { CONVERSATION_URL } from "@src/utils/config";
import { ExtendConversationType } from "@src/types/db";

interface ConversationItemProps {
   conversation: ExtendConversationType;
   selected?: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, selected }) => {
   const session = useSession();
   const router = useRouter();

   const otherUser = useMemo(() => {
      const currentUserEmail = session.data?.user?.email;

      const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

      return otherUser[0];
   }, [conversation.users, session.data?.user?.email]);

   const handleNavigate = useCallback(() => {
      router.push(`${CONVERSATION_URL}/${conversation.id}`);
   }, [conversation.id, router]);

   // get last message
   const lastMessage = useMemo(() => {
      const messages = conversation.messages || [];

      return messages[messages.length - 1];
   }, [conversation.messages]);

   // create last message text
   const lastMessageText = useMemo(() => {
      // if user send image
      if (lastMessage?.image) return "Sent an  image";
      // if user send text
      if (lastMessage?.body) return lastMessage.body;
      // if user just started a conversation
      return "Started a conversation";
   }, [lastMessage?.body, lastMessage?.image]);

   return (
      <div
         className={merge(
            "w-full relative flex items-center space-x-3 p-3 hover:bg-[hsl(var(--bc)/.15)] rounded-lg transition cursor-pointer",
            {
               ["bg-[hsl(var(--bc)/.15)]"]: selected,
               ["bg-base-100"]: !selected,
            },
         )}
         onClick={handleNavigate}
      >
         <div>
            <Avatar user={otherUser} />
         </div>

         <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
               <span className="absolute inset-0" aria-hidden="true" />
               <div className="flex justify-between items-center mb-1">
                  <p className="text-md font-bold text-[hsl(var(--bc)/1)]">{otherUser.name}</p>
               </div>
               <p className={merge(`truncate text-sm opacity-80`)}>{lastMessageText}</p>
            </div>
         </div>
      </div>
   );
};
export default ConversationItem;
