import { z } from "zod";

import { getCurrentUser } from "@src/lib/actions";
import prisma_db from "@src/lib/prisma_db";

export const POST = async (request: Request) => {
   try {
      const currentUser = await getCurrentUser();
      const body = await request.json();

      const { content, image, conversationId, userId } = z
         .object({
            content: z.string().nullish(),
            image: z.string().nullish(),
            conversationId: z.string(),
            userId: z.string(),
         })
         .parse(body);

      // check if user not logged in
      if (!currentUser) return Response.json({ message: "Unauthorized" }, { status: 401 });

      // create new message and populate seen and sender
      const newMessage = await prisma_db.message.create({
         include: {
            seen: true,
            sender: true,
         },
         data: {
            body: content,
            image,
            conversation: {
               connect: {
                  id: conversationId,
               },
            },

            sender: {
               connect: { id: currentUser.id },
            },
            seen: {
               connect: {
                  id: userId,
               },
            },
         },
      });

      // update current conversation
      await prisma_db.conversation.update({
         where: {
            id: conversationId,
         },
         data: {
            lastMessageAt: new Date(),
            messages: {
               connect: {
                  id: newMessage.id,
               },
            },
         },

         include: {
            users: true,
            messages: { include: { seen: true } },
         },
      });

      return Response.json(newMessage);
   } catch (error: unknown) {
      console.error(error);

      return Response.json("Error", { status: 500 });
   }
};
