import React, { Fragment } from "react";

import ConversationList from "./components/ConversationList";

import { getConversations } from "@src/lib/actions";

const layout: React.FC<React.PropsWithChildren> = async ({ children }) => {
   const conversations = await getConversations();

   if (conversations.length === 0) return;

   return (
      <div className="h-full">
         <ConversationList initialConversations={conversations} />
         <Fragment>{children}</Fragment>
      </div>
   );
};
export default layout;
