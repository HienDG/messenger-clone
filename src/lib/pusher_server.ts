import PusherServer from "pusher";

import { z } from "zod";

const stringSchema = z.string();

const appId = stringSchema.parse(process.env.NEXT_PUBLIC_PUSHER_APP_ID);
const key = stringSchema.parse(process.env.NEXT_PUBLIC_PUSHER_KEY);
const secret = stringSchema.parse(process.env.NEXT_PUBLIC_PUSHER_SECRET);
const cluster = stringSchema.parse(process.env.NEXT_PUBLIC_PUSHER_CLUSTER);

const pusherServer = new PusherServer({
   appId,
   key,
   secret,
   cluster,
   useTLS: true,
});

export default pusherServer;
