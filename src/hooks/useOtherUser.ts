import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

import { ExtendConversationWithUsers } from "@src/types/db";

const useOtherUser = (data: ExtendConversationWithUsers | { users: User[] }) => {
   const session = useSession();

   const otherUser = useMemo(() => {
      const currentUserEmail = session.data?.user?.email;

      const otherUser = data.users.filter((user) => user.email !== currentUserEmail);

      return otherUser[0];
   }, [data?.users, session.data?.user?.email]);

   return otherUser;
};

export default useOtherUser;
