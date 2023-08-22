"use client";

import React, { Fragment, useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import { Avatar } from "@src/components/ui";
import { ImageModal } from "@src/components/modal";

import { useModalStore } from "@src/hooks";
import { merge } from "@src/utils";

import { ExtendMessageType } from "@src/types/db";

interface MessageBoxProps {
   message: ExtendMessageType;
   isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, isLast = false }) => {
   const session = useSession();

   const { onOpen, view } = useModalStore();

   const isOwn = useMemo(() => {
      return session.data?.user?.email === message.sender.email;
   }, [message.sender.email, session.data?.user?.email]);

   const seenList = useMemo(
      () =>
         (message.seen || [])
            .filter((user) => user.email !== message?.sender?.email)
            .map((user) => user.name)
            .join(", "),
      [message.seen, message?.sender?.email],
   );

   return (
      <div className={merge("flex gap-3 p-4", isOwn && "justify-end")}>
         <div className={merge(isOwn && "order-2")}>
            <Avatar user={message.sender} />
         </div>
         <div className={merge("flex flex-col gap-2", isOwn && "items-end")}>
            <div className="flex items-center gap-1">
               <div className="text-sm font-bold">{message.sender.name}</div>
               <div className="text-xs opacity-70">{format(new Date(message.createdAt), "p")}</div>
            </div>

            <div
               className={merge(
                  "text-sm w-fit overflow-hidden",
                  isOwn ? "bg-info/50" : "bg-neutral/30",
                  message.image ? "rounded-md p-0" : "rounded-full py-2 px-4",
               )}
            >
               <div>
                  {message.image ? (
                     <Image
                        alt="Image"
                        height="288"
                        width="288"
                        src={message.image}
                        className="object-cover cursor-pointer hover:scale-110 transition translate"
                        onClick={() => onOpen("image")}
                     />
                  ) : (
                     <div>{message.body}</div>
                  )}
               </div>
            </div>

            <Fragment>
               {isLast && isOwn && seenList.length > 0 && (
                  <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>
               )}
            </Fragment>
         </div>

         <Fragment>
            {message.image && view === "image" && <ImageModal src={message.image} />}
         </Fragment>
      </div>
   );
};
export default MessageBox;
