import bcrypt from "bcrypt";
import crypto from "crypto";

import prisma_db from "@src/lib/prisma_db";
import { signUpSchema } from "@src/lib/validators";

export const POST = async (request: Request) => {
   try {
      const data = await request.json();

      const { email, password, username: name } = signUpSchema.parse(data);

      // generate a salt
      const salt = await bcrypt.genSalt(12);

      const myHashPassword = await bcrypt.hash(password, salt);

      // generate random username
      const username = crypto.randomBytes(16).toString("hex");

      // create new record
      const newUser = await prisma_db.user.create({
         data: {
            email,
            password: myHashPassword,
            name,
            username,
         },
      });

      return Response.json({
         message: "success",
         doc: newUser,
      });
   } catch (error: unknown) {
      console.error(error);

      return Response.json(
         { message: "something went wrong" },
         {
            status: 500,
         },
      );
   }
};
