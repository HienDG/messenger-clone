import prisma_db from "../prisma_db";
import getUserSession from "./getUserSession";

const getAllPeople = async () => {
   try {
      const session = await getUserSession();

      if (!session?.user?.email) throw new Error("User not logged in");

      // get all user record
      const people = await prisma_db.user.findMany({
         orderBy: {
            createdAt: "desc",
         },

         where: {
            NOT: {
               email: session.user.email,
            },
         },
      });

      return people;
   } catch (error: unknown) {
      console.error(error);

      return [];
   }
};

export default getAllPeople;
