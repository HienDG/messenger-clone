"use client";

import React from "react";
import Link from "next/link";
import type { IconType } from "react-icons";

import { merge } from "@src/utils";

interface DesktopItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
   label: string;
   icon: IconType;
   href?: string;
   active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = (props) => {
   const { label, icon: Icon, href = "/", active, onClick, ...restProps } = props;

   const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      // prevent navigate when passed onClick prop
      if (onClick) {
         event.preventDefault();

         return onClick(event);
      }
   };

   return (
      <li key={label}>
         <Link
            href={href}
            onClick={handleClick}
            className={merge(
               "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold  hover:bg-[hsl(var(--bc)/.2)]",
               {
                  ["bg-primary"]: active,
               },
            )}
            {...restProps}
         >
            <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            <span className="sr-only">{label}</span>
         </Link>
      </li>
   );
};
export default DesktopItem;
