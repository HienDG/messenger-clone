import { z } from "zod";

import prisma_db from "@src/lib/prisma_db";
import { getCurrentUser } from "@src/lib/actions";
import pusherServer from "@src/lib/pusher_server";

export const POST = async (request: Request) => {
   try {
      // get user document
      const currentUser = await getCurrentUser();

      // check if user logged in
      if (!currentUser) return Response.json({ message: "Unauthorized" }, { status: 401 });

      const data = await request.json();

      // make sure TYPEOF userId is  STRING
      const { userId } = z
         .object({
            userId: z.string(),
         })
         .parse(data);

      // find all existing conversation
      const existingConversation = await prisma_db.conversation.findMany({
         where: {
            OR: [
               {
                  userIds: {
                     equals: [userId, currentUser.id],
                  },
               },
               {
                  userIds: {
                     equals: [currentUser.id, userId],
                  },
               },
            ],
         },
      });

      if (existingConversation.length > 0) {
         return Response.json({ data: existingConversation[0] });
      }

      //  create new conversation
      const newConversation = await prisma_db.conversation.create({
         data: {
            users: {
               connect: [
                  {
                     id: currentUser.id,
                  },
                  {
                     id: userId,
                  },
               ],
            },
         },
         include: {
            users: true,
         },
      });

      // Update all connections with new conversation
      newConversation.users.map((user) => {
         if (user.email) {
            pusherServer.trigger(user.email, "conversation:new", newConversation).catch((err) => {
               console.error(err);
            });
         }
      });

      return Response.json({
         data: newConversation,
      });
   } catch (error: unknown) {
      console.error(error);

      return Response.json("Internal Error", { status: 500 });
   }
};
