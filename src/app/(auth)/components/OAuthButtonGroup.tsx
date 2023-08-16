"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

import { AiOutlineGoogle, AiFillGithub } from "react-icons/ai";

import { Button } from "@src/components/ui";

interface OAuthButtonGroupProps {}

const OAuthButtonGroup: React.FC<OAuthButtonGroupProps> = () => {
   const signInWithProvider = async (provider: BuiltInProviderType) => {
      return await signIn(provider);
   };

   return (
      <div className="join join-vertical gap-4 mb-5 w-full">
         <Button variant="primary" className="p-3 h-12" onClick={() => signInWithProvider("google")}>
            <AiOutlineGoogle className="w-6 h-6" />
            <span>Continue With Google</span>
         </Button>

         <Button variant="neutral" className="p-3 h-12" onClick={() => signInWithProvider("github")}>
            <AiFillGithub className="w-6 h-6" />
            <span>Continue With Github</span>
         </Button>
      </div>
   );
};
export default OAuthButtonGroup;
