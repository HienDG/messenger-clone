import React from "react";
import { redirect } from "next/navigation";

import { Header, Body, Form } from "./components";

import { getConversationById, getAllMessageById } from "@src/lib/actions";
import { CONVERSATION_URL } from "@src/utils/config";

interface ConversationDetailProps {
   params: {
      slug: string;
   };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ConversationDetail: React.FC<ConversationDetailProps> = async ({ params }) => {
   const { slug } = params;

   // Initiate both requests in parallel
   const conversationData = getConversationById(slug);
   const messagesData = getAllMessageById(slug);

   // Wait for the promises to resolve
   const [conversation, messages] = await Promise.all([conversationData, messagesData]);

   // if conversation does not exist ,  redirect to conversation page
   if (!conversation) return redirect(CONVERSATION_URL);

   return (
      <div className="lg:pl-80 h-full">
         <div className="flex flex-col bg-base-200 h-screen">
            <Header conversation={conversation} />
            <Body initialMessages={messages} />
            <Form conversation={conversation} />
         </div>
      </div>
   );
};
export default ConversationDetail;
