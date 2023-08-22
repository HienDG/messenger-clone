"use client";

import React, { Fragment, useCallback, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import axios from "axios";
import toaster from "react-hot-toast";

import { Avatar } from "@src/components/ui";

import { useModalStore, useOtherUser } from "@src/hooks";
import { ExtendConversationWithUsers } from "@src/types/db";
import { CONVERSATION_URL } from "@src/utils/config";

interface ProfileDrawerProps {
   data: ExtendConversationWithUsers;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data }) => {
   const router = useRouter();
   const { isOpen, onClose } = useModalStore();
   const otherUser = useOtherUser(data);

   const joinedDate = useMemo(() => {
      return format(new Date(otherUser.createdAt), "PP");
   }, [otherUser.createdAt]);

   const title = useMemo(() => {
      return data.name || otherUser.name;
   }, [data.name, otherUser.name]);

   const handleDeleteConversation = useCallback(async () => {
      try {
         await axios.delete(`/api/conversation/${data.id}`);

         router.push(CONVERSATION_URL);
         toaster.success("Conversation has been deleted");
         router.refresh();
      } catch (error: unknown) {
         console.error(error);

         toaster.error("Something went wrong");
      }
   }, [data.id, router]);

   return (
      <Transition.Root show={isOpen} as={Fragment}>
         <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-500"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-500"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
               <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                     <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                     >
                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                           <div className="flex h-full flex-col overflow-y-scroll bg-base-100 py-6 shadow-xl">
                              <div className="px-4 sm:px-6">
                                 <div className="flex items-start justify-end">
                                    <div className="ml-3 flex h-7 items-center">
                                       <button
                                          type="button"
                                          className="rounded-md bg-base-100 hover:text-neutral focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                          onClick={onClose}
                                       >
                                          <span className="sr-only">Close panel</span>
                                          <IoClose size={24} aria-hidden="true" />
                                       </button>
                                    </div>
                                 </div>
                              </div>
                              <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                 <div className="flex flex-col items-center">
                                    <div className="mb-2">
                                       <Avatar user={otherUser} />
                                    </div>
                                    <div>{title}</div>
                                    <div className="text-sm text-gray-500">
                                       {/* {statusText} */}
                                    </div>
                                    <div className="flex gap-10 my-8">
                                       <div
                                          className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                                          onClick={handleDeleteConversation}
                                       >
                                          <div className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center">
                                             <IoTrash size={20} />
                                          </div>
                                          <div className="text-sm font-light text-neutral-600">
                                             Delete
                                          </div>
                                       </div>
                                    </div>
                                    <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                       <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                          <div>
                                             <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                Email
                                             </dt>
                                             <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                {otherUser.email}
                                             </dd>
                                          </div>

                                          <hr />

                                          <div>
                                             <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                Joined
                                             </dt>
                                             <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                <time dateTime={joinedDate}>{joinedDate}</time>
                                             </dd>
                                          </div>
                                       </dl>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   );
};
export default ProfileDrawer;
