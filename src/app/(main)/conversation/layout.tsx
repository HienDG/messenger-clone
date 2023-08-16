import React from "react";

import ConversationList from "./components/ConversationList";

import { getConversations } from "@src/lib/actions";

const layout: React.FC<React.PropsWithChildren> = async ({ children }) => {
   const conversations = await getConversations();

   return (
      <div className="h-full">
         <ConversationList initialConversations={conversations} />
         <div>{children}</div>
      </div>
   );
};
export default layout;
