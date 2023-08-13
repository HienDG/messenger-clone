"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FormController, InputField, Button } from "@src/components/ui";

import { signUpSchema, type SignUpSchema } from "@src/lib/validators";
import { SIGN_IN_URL, HOME_URL } from "@src/utils/config";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
   const router = useRouter();

   const {
      register,
      reset,
      formState: { isDirty, isValid, errors },
      handleSubmit,
   } = useForm<SignUpSchema>({
      resolver: zodResolver(signUpSchema),
      mode: "onChange",
      defaultValues: {
         username: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
      const { email, password, username, confirmPassword } = data;

      try {
         await axios.post("/api/auth/register", { email, password, username, confirmPassword });

         // if registration is successful, login with email, password
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
            label="Username"
            id="username"
            type="text"
            className="h-10"
            errorMessage={errors.username?.message}
            {...register("username")}
         />
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
         <InputField
            label="Confirm Password"
            id="ConfirmPassword"
            type="password"
            className="h-10"
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
         />

         <div>
            <Button
               type="submit"
               className="w-full rounded-full"
               variant="primary"
               disabled={!isDirty || !isValid}
            >
               Sign up
            </Button>
         </div>

         <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>Already have an account?</div>
            <a className="underline cursor-pointer hover:text-primary" href={SIGN_IN_URL}>
               Login
            </a>
         </div>
      </FormController>
   );
};
export default RegisterPage;
