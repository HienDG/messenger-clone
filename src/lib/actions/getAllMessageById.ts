import prisma_db from "../prisma_db";
import getCurrentUser from "./getCurrentUser";

const getAllMessageById = async (c_id: string) => {
   try {
      const currentUser = await getCurrentUser();

      // check if user not logged in
      if (!currentUser) throw new Error("Unauthorized");

      // query all message contain conversation id and populate seen and sender
      const messages = await prisma_db.message.findMany({
         where: {
            conversationId: c_id,
         },
         include: {
            seen: true,
            sender: true,
         },
         orderBy: {
            createdAt: "asc",
         },
      });

      return messages;
   } catch (error: unknown) {
      console.error(error);

      return [];
   }
};

export default getAllMessageById;
