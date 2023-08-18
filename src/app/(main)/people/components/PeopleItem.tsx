"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { User } from "@prisma/client";

import { Avatar } from "@src/components/ui";

import { useLoading } from "@src/hooks";
import { CONVERSATION_URL } from "@src/utils/config";

interface PeopleItemProps {
   item: User;
}

const PeopleItem: React.FC<PeopleItemProps> = ({ item }) => {
   const router = useRouter();

   const { onOpen, onClose } = useLoading();

   const handleNavigate = useCallback(async () => {
      onOpen(); // show loading modal
      try {
         const { data } = await axios.post("/api/conversation", { userId: item.id });

         router.push(`${CONVERSATION_URL}/${data.data.id}`);
      } catch (error: unknown) {
         console.error(error);
      } finally {
         onClose(); // close loading modal
      }
   }, [item.id, onClose, onOpen, router]);

   return (
      <div
         className="w-full relative flex items-center space-x-3 bg-base-100 p-3 hover:bg-base-200 rounded-lg transition cursor-pointer"
         onClick={handleNavigate}
      >
         <Avatar user={item} />
         <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
               <span className="absolute inset-0" aria-hidden="true" />
               <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-bold text-[hsl(var(--bc)/1)]">{item.name}</p>
               </div>
            </div>
         </div>
      </div>
   );
};
export default PeopleItem;
