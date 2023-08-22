import prisma_db from "@src/lib/prisma_db";
import { getCurrentUser } from "@src/lib/actions";

interface ParamsProps {
   slug: string;
}
export const DELETE = async (_request: Request, { params }: { params: ParamsProps }) => {
   const { slug } = params;

   try {
      const currentUser = await getCurrentUser();

      // check if user not logged in
      if (!currentUser) return Response.json({ message: "Unauthorized" }, { status: 401 });

      // find existing conversation by id
      const existingConversation = await prisma_db.conversation.findUnique({
         where: {
            id: slug,
         },
         include: { users: true },
      });

      // check if conversation not exist or can't find conversation by this id
      if (!existingConversation)
         return Response.json({ message: "Invalid Conversation id" }, { status: 400 });

      const deletedConversation = await prisma_db.conversation.deleteMany({
         where: {
            id: slug,
            userIds: {
               hasSome: [currentUser.id],
            },
         },
      });

      return Response.json(deletedConversation);
   } catch (error: unknown) {}
};
