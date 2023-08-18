"use client";

import React, { useRef, useMemo } from "react";

import { Avatar } from "@src/components/ui";
import MessageBox from "./MessageBox";

import { ExtendMessageType } from "@src/types/db";

interface BodyProps {
   initialMessages: ExtendMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
   // const slug = useSlug();
   const bottomRef = useRef<HTMLDivElement>(null);
   // const [messages, setMessages] = useState<ExtendMessageType[]>(initialMessages);

   const otherUser = useMemo(() => initialMessages[0].seen[0], [initialMessages]);

   return (
      <div className="flex-1 overflow-y-auto h-[calc(100vh-148px)]">
         <div>
            <div className="flex flex-col max-w-full">
               <div className="h-5 w-full"></div>
               <div className="px-3 py-5">
                  <div className="flex items-center justify-center">
                     <div>
                        <Avatar user={otherUser} className="w-14 h-14" />
                     </div>
                  </div>
                  <div className="my-3 w-full font-bold text-lg text-center">{otherUser.name}</div>
               </div>
               <div className="h-5 w-full"></div>
            </div>
         </div>

         <div>
            {initialMessages.map((message, i) => (
               <MessageBox
                  message={message}
                  isLast={initialMessages.length - 1 === i}
                  key={message.id}
               />
            ))}
         </div>

         <div className="pt-24" ref={bottomRef} />
      </div>
   );
};
export default Body;
