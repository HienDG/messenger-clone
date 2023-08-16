"use client";

import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarProps {
   user?: User | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
   return (
      <div className="relative">
         <div className="relative inline-block rounded-full overflow-hidden h-10 w-10">
            <Image
               src={user?.image || "/assets/placeholder.jpg"}
               alt="Avatar"
               width={100}
               height={100}
               className="w-full h-full"
            />
         </div>
      </div>
   );
};
export default Avatar;
