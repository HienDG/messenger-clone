"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import toaster from "react-hot-toast";
import { useSession } from "next-auth/react";

import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";

import { FormController, InputField, Button } from "@src/components/ui";

import { useSlug } from "@src/hooks";

import { ExtendConversationType } from "@src/types/db";

type ExtendConversationWithUsers = Omit<ExtendConversationType, "messages">;

interface FormProps {
   conversation: ExtendConversationWithUsers;
}

const Form: React.FC<FormProps> = ({ conversation }) => {
   const slug = useSlug();
   const router = useRouter();
   const session = useSession();

   const otherUser = useMemo(() => {
      const currentUserEmail = session.data?.user?.email;

      const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

      return otherUser[0];
   }, [conversation.users, session.data?.user?.email]);

   const {
      register,
      formState: { errors },
      setValue,
      handleSubmit,
   } = useForm<FieldValues>({
      defaultValues: {
         content: "",
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      setValue("content", "", { shouldValidate: true });

      try {
         await axios.post("/api/message", { ...data, conversationId: slug, userId: otherUser.id });

         router.refresh();
      } catch (error: unknown) {
         console.error(error);
         toaster.error("Something went wrong");
      }
   };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleUpload = async (result: any) => {
      try {
         await axios.post("/api/message", {
            image: result.info.secure_url,
            conversationId: slug,
            userId: otherUser.id,
         });
      } catch (error: unknown) {
         console.error(error);
         toaster.error("Something went wrong");
      }
   };

   return (
      <div className="p-2 bg-base-100 border-t border-t-[hsl(var(--bc)/.2)] flex items-center gap-2 lg:gap-4 w-full">
         <CldUploadButton options={{ maxFiles: 1 }} uploadPreset="mtntbo4z" onUpload={handleUpload}>
            <HiPhoto size={30} className="text-sky-500" />
         </CldUploadButton>

         <FormController
            className="flex items-center gap-2 lg:gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
         >
            <InputField
               className="w-full flex-1 h-10"
               wrapperClassName="w-full"
               id="message"
               required
               placeholder="Write a message"
               errorMessage={errors["content"]?.message as string}
               {...register("content")}
            />
            <Button type="submit" className="rounded-full p-2 h-10" variant="ghost">
               <HiPaperAirplane className="text-primary w-5 h-5" />
            </Button>
         </FormController>
      </div>
   );
};
export default Form;
