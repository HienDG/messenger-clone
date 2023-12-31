"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Avatar } from "@src/components/ui";

import { useOtherUser } from "@src/hooks";
import { merge } from "@src/utils";
import { CONVERSATION_URL } from "@src/utils/config";
import { ExtendConversationType } from "@src/types/db";

interface ConversationItemProps {
   conversation: ExtendConversationType;
   selected?: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, selected }) => {
   const router = useRouter();
   const otherUser = useOtherUser(conversation);
   const session = useSession();

   const handleNavigate = useCallback(() => {
      router.push(`${CONVERSATION_URL}/${conversation.id}`);
   }, [conversation.id, router]);

   // get last message
   const lastMessage = useMemo(() => {
      const messages = conversation.messages ?? [];

      return messages[messages.length - 1];
   }, [conversation.messages]);

   const userEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

   const hasSeen = useMemo(() => {
      if (!lastMessage) {
         return false;
      }

      const seenArray = lastMessage.seen || [];

      if (!userEmail) {
         return false;
      }

      return seenArray.filter((user) => user.email === userEmail).length !== 0;
   }, [userEmail, lastMessage]);

   // create last message text
   const lastMessageText = useMemo(() => {
      // if user send image
      if (lastMessage?.image) return "Sent an image";
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
               <p
                  className={merge(`truncate text-sm opacity-80`, {
                     ["text-neutral/50"]: hasSeen,
                     ["text-neutral"]: !hasSeen,
                  })}
               >
                  {lastMessageText}
               </p>
            </div>
         </div>
      </div>
   );
};
export default ConversationItem;
