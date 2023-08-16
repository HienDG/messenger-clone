import { getServerSession } from "next-auth";

import { authOptions } from "../auth";

export default async function getUserSession() {
   return await getServerSession(authOptions);
}
