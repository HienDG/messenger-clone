"use client";

import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";

import { merge } from "@src/utils";

interface AvatarProps {
   user?: User | null;
   className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user, className }) => {
   return (
      <div className="relative">
         <div
            className={merge(
               "relative inline-block rounded-full overflow-hidden h-10 w-10",
               className,
            )}
         >
            <Image
               src={user?.image || "/assets/placeholder.jpg"}
               alt="Avatar"
               width={1000}
               height={1000}
               className="w-full h-full"
            />
         </div>
      </div>
   );
};
export default Avatar;
