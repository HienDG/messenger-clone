"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FormController, InputField, Button } from "@src/components/ui";

import { signInSchema, type SignInSchema } from "@src/lib/validators";
import { SIGN_UP_URL, HOME_URL } from "@src/utils/config";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
   const router = useRouter();

   const {
      register,
      reset,
      formState: { isDirty, isValid, errors },
      handleSubmit,
   } = useForm<SignInSchema>({
      resolver: zodResolver(signInSchema),
      mode: "onChange",
      defaultValues: {
         password: "",
         email: "",
      },
   });

   const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
      const { email, password } = data;

      try {
         //  login with email, password
         const res = await signIn("credentials", { email, password, redirect: false });

         // if login is successful, navigate to home page
         if (!res?.ok) throw new Error(res?.error || "something went wrong");

         reset(); // clear data input

         router.push(HOME_URL);
      } catch (error: unknown) {
         console.error(error);

         toast.error("Something went wrong");
      }
   };

   return (
      <FormController className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
         <InputField
            label="Email"
            id="Email"
            type="email"
            className="h-10"
            errorMessage={errors.email?.message}
            {...register("email")}
         />

         <InputField
            label="Password"
            id="Password"
            type="password"
            className="h-10"
            errorMessage={errors.password?.message}
            {...register("password")}
         />

         <div>
            <div className="my-4 text-primary hover:underline font-semibold w-fit cursor-pointer">
               Forgot password?
            </div>

            <Button
               type="submit"
               className="w-full rounded-full"
               variant="primary"
               disabled={!isDirty || !isValid}
            >
               Sign In
            </Button>
         </div>

         <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>New to Messenger?</div>
            <a className="underline cursor-pointer hover:text-primary" href={SIGN_UP_URL}>
               Create an account
            </a>
         </div>
      </FormController>
   );
};
export default LoginPage;
