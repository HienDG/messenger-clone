"use client";

import React from "react";
import Link from "next/link";
import type { IconType } from "react-icons";

import { merge } from "@src/utils";

interface MobileItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
   icon: IconType;
   href?: string;
   active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = (props) => {
   const { icon: Icon, href = "/", active, onClick, ...restProps } = props;

   const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      // prevent navigate when passed onClick prop
      if (onClick) {
         event.preventDefault();

         return onClick(event);
      }
   };

   return (
      <Link
         onClick={handleClick}
         href={href}
         className={merge(
            "group flex gap-x-3 text-sm cursor-pointer leading-6 font-semibold w-full justify-center p-4 hover:bg-[hsl(var(--bc)/.2)]",
            {
               ["bg-[hsl(var(--bc)/.2)]"]: active,
            },
         )}
         {...restProps}
      >
         <Icon className="h-6 w-6" />
      </Link>
   );
};
export default MobileItem;
