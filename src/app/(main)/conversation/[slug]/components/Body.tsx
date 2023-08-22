"use client";

import React, { useRef, useState, useEffect } from "react";
import find from "lodash.find";
import axios from "axios";
import toaster from "react-hot-toast";

import { Avatar } from "@src/components/ui";
import MessageBox from "./MessageBox";

import { useSlug, useOtherUser } from "@src/hooks";
import pusherClient from "@src/lib/pusher_client";
import { ExtendMessageType, ExtendConversationWithUsers } from "@src/types/db";

interface BodyProps {
   initialMessages: ExtendMessageType[];
   conversation: ExtendConversationWithUsers;
}

const Body: React.FC<BodyProps> = ({ initialMessages, conversation }) => {
   const slug = useSlug();

   const otherUser = useOtherUser(conversation);

   const bottomRef = useRef<HTMLDivElement>(null);
   const [messages, setMessages] = useState<ExtendMessageType[]>(initialMessages);

   useEffect(() => {
      pusherClient.subscribe(slug);
      bottomRef.current?.scrollIntoView();

      const messageHandler = (data: ExtendMessageType) => {
         axios.post(`/api/conversation/${slug}/seen`).catch((error) => {
            console.error(error);

            toaster.error("something went wrong");
         });

         setMessages((prev) => {
            if (find(data, { id: data.id })) {
               return [...prev];
            }

            return [...prev, data];
         });

         bottomRef.current?.scrollIntoView();
      };

      const updatedMessageHandler = (message: ExtendMessageType) => {
         setMessages((prev) => {
            return prev.map((prevMessage) => {
               if (prevMessage.id === message.id) {
                  return message;
               }

               return prevMessage;
            });
         });
      };

      pusherClient.bind("message:new", messageHandler);
      pusherClient.bind("message:update", updatedMessageHandler);

      return () => {
         pusherClient.unsubscribe(slug);
         pusherClient.unbind("message:new", messageHandler);
         pusherClient.unbind("message:update", updatedMessageHandler);
      };
   }, [slug]);

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
            {messages.map((message, i) => (
               <MessageBox message={message} isLast={messages.length - 1 === i} key={message.id} />
            ))}
         </div>

         <div className="pt-24" ref={bottomRef} />
      </div>
   );
};
export default Body;
