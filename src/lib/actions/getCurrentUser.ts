import prisma_db from "../prisma_db";
import getUserSession from "./getUserSession";

const getCurrentUser = async () => {
   try {
      const session = await getUserSession();

      if (!session?.user?.email) {
         throw new Error("User not logged in");
      }

      // get user doc with session email
      const currentUser = await prisma_db.user.findUnique({
         where: {
            email: session.user.email,
         },
      });

      // check if current user exist
      if (!currentUser) throw new Error("User does not exist");

      return currentUser;
   } catch (error: unknown) {
      console.error(error);

      return null;
   }
};

export default getCurrentUser;
