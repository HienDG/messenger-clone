import prisma_db from "../prisma_db";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
   try {
      const currentUser = await getCurrentUser();

      // check if user not logged in
      if (!currentUser) throw new Error("Unauthorized");

      // get all conversation records contain currentUser ID
      const conversations = await prisma_db.conversation.findMany({
         where: {
            userIds: {
               has: currentUser.id,
            },
         },
         orderBy: {
            lastMessageAt: "desc",
         },
         include: {
            users: true,
            messages: {
               include: {
                  seen: true,
                  sender: true,
               },
            },
         },
      });

      return conversations;
   } catch (error: unknown) {
      console.error(error);

      return [];
   }
};

export default getConversations;
