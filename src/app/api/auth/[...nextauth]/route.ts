import NextAuth from "next-auth";

import { authOptions } from "@src/lib/auth";

const handLer = NextAuth(authOptions);

export { handLer as GET, handLer as POST };
