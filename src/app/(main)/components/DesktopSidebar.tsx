"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

import DesktopItem from "./DesktopItem";
import { Avatar } from "@src/components/ui";

import { CONVERSATION_URL, PEOPLE_URL } from "@src/utils/config";

interface DesktopSidebarProps {
   user?: User | null;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ user }) => {
   return (
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-base-100 lg:border-r lg:pb-4 lg:border-r-[hsl(var(--bc)/.2)] lg:flex lg:flex-col justify-between">
         <nav className="mt-4 flex flex-col justify-between">
            <ul role="list" className="flex flex-col items-center space-y-1">
               <DesktopItem icon={HiChat} label="Chats" href={CONVERSATION_URL} />
               <DesktopItem icon={HiUsers} label="People" href={PEOPLE_URL} />
               <DesktopItem
                  icon={HiArrowLeftOnRectangle}
                  label="Log out"
                  onClick={() => signOut()}
               />
            </ul>
         </nav>

         <nav className="mt-4 flex flex-col justify-between items-center">
            <div className="cursor-pointer hover:opacity-75 transition">
               <Avatar user={user} />
            </div>
         </nav>
      </div>
   );
};
export default DesktopSidebar;
