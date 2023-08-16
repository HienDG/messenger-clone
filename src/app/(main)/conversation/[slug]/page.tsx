import React from "react";
import { redirect } from "next/navigation";

import { getConversationById } from "@src/lib/actions";
import { HOME_URL } from "@src/utils/config";

interface ConversationDetailProps {
   params: {
      slug: string;
   };
}

const ConversationDetail: React.FC<ConversationDetailProps> = async ({ params }) => {
   const { slug } = params;

   const conversation = await getConversationById(slug);

   // if conversation does not exist ,  redirect to home page
   if (!conversation) return redirect(HOME_URL);

   return <div>Have a good coding</div>;
};
export default ConversationDetail;
