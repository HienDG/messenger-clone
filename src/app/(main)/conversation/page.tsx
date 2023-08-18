"use client";

import React from "react";

import { useSlug } from "@src/hooks";
import { merge } from "@src/utils";

interface ConversationPageProps {}

const ConversationPage: React.FC<ConversationPageProps> = () => {
   const slug = useSlug();

   return (
      <div className={merge("lg:pl-80 h-full lg:block", !!slug ? "block" : "hidden")}>
         Have a good coding
      </div>
   );
};
export default ConversationPage;
