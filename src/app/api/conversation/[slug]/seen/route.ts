import prisma_db from "@src/lib/prisma_db";
import { getCurrentUser } from "@src/lib/actions";
import pusherServer from "@src/lib/pusher_server";

interface ParamsProps {
   slug: string;
}

export const POST = async (request: Request, { params }: { params: ParamsProps }) => {
   const { slug } = params;

   try {
      const currentUser = await getCurrentUser();

      // check if user not logged in
      if (!currentUser?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });

      // find existing conversation by c_id
      const existingConversation = await prisma_db.conversation.findUnique({
         where: {
            id: slug,
         },

         include: {
            messages: {
               include: {
                  seen: true,
               },
            },
            users: true,
         },
      });

      // check if conversation not exist or can't find conversation with c_id
      if (!existingConversation) return Response.json({ message: "Invalid Id" }, { status: 400 });

      // find the last message
      const lastMessage = existingConversation.messages[existingConversation.messages.length - 1];

      // check if last message not exist
      if (!lastMessage) return Response.json(existingConversation);

      // update seen of the last message
      const updatedMessage = await prisma_db.message.update({
         where: {
            id: lastMessage.id,
         },

         // populate seen, sender
         include: {
            seen: true,
            sender: true,
         },
         data: {
            seen: {
               connect: {
                  id: currentUser.id,
               },
            },
         },
      });

      // update all conversation with new seen
      await pusherServer.trigger(currentUser.email, "conversation:update", {
         id: slug,
         message: [updatedMessage],
      });

      // check if user has already seen the message, no need to go go further
      if (lastMessage.seenIds.indexOf(currentUser.id) !== -1)
         return Response.json(existingConversation);

      // update last  message seen
      await pusherServer.trigger(slug, "message:update", updatedMessage);

      return Response.json({ message: "success" });
   } catch (error: unknown) {
      console.error(error);

      return Response.json({ message: "Internal Error" }, { status: 500 });
   }
};
