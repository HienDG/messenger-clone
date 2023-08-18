import prisma_db from "../prisma_db";
import { getCurrentUser } from "@src/lib/actions";

const getConversationById = async (cid: string) => {
   try {
      const currentUser = await getCurrentUser();

      // check if user not logged in
      if (!currentUser) throw new Error("Unauthorized");

      // get conversation record by id and populate users
      const conversation = await prisma_db.conversation.findUnique({
         where: {
            id: cid,
         },

         include: {
            users: true,
         },
      });

      // check conversation does not exist
      if (!conversation) throw new Error("Conversation does not exist");

      return conversation;
   } catch (error: unknown) {
      console.error(error);

      return null;
   }
};

export default getConversationById;
