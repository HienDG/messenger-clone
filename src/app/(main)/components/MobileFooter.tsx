"use client";

import React from "react";

import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

import MobileItem from "./MobileItem";

import { useSlug } from "@src/hooks";
import { CONVERSATION_URL, PEOPLE_URL } from "@src/utils/config";

interface MobileFooterProps {}

const MobileFooter: React.FC<MobileFooterProps> = () => {
   const slug = useSlug();

   if (!!slug) return null;

   return (
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-base-100 border-t lg:hidden">
         <MobileItem icon={HiChat} href={CONVERSATION_URL} />
         <MobileItem icon={HiUsers} href={PEOPLE_URL} />
         <MobileItem icon={HiArrowLeftOnRectangle} />
      </div>
   );
};
export default MobileFooter;
