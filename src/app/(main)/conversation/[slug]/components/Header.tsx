"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

import { Avatar } from "@src/components/ui";

import { ExtendConversationType } from "@src/types/db";

type ExtendConversationWithUsers = Omit<ExtendConversationType, "messages">;

interface HeaderProps {
   conversation: ExtendConversationWithUsers;
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
   const session = useSession();

   const otherUser = useMemo(() => {
      const currentUserEmail = session.data?.user?.email;

      const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

      return otherUser[0];
   }, [conversation.users, session.data?.user?.email]);

   return (
      <div className="bg-base-100 w-full flex border-b sm:px-4 py-3 px-4 border-b-[hsl(var(--bc)/.2)] lg:px-6 justify-between items-center shadow-sm">
         <div className="flex gap-3 items-center">
            <Link
               href="/conversation"
               className="lg:hidden block text-info hover:text-primary transition cursor-pointer"
            >
               <HiChevronLeft size={32} />
            </Link>
            <Avatar user={otherUser} />
            <div className="flex flex-col">
               <div className="capitalize font-bold">{conversation.name || otherUser.name}</div>
               <div className="text-sm font-light italic opacity-75">Active</div>
            </div>
         </div>

         <div>
            <HiEllipsisHorizontal
               size={32}
               className="text-info cursor-pointer hover:text-primary transition"
            />
         </div>
      </div>
   );
};
export default Header;
