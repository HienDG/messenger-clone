import PusherClient from "pusher-js";
import { z } from "zod";

const stringSchema = z.string();

const key = stringSchema.parse(process.env.NEXT_PUBLIC_PUSHER_KEY);
const cluster = stringSchema.parse(process.env.NEXT_PUBLIC_PUSHER_CLUSTER);

const pusherClient = new PusherClient(key, {
   channelAuthorization: {
      endpoint: "/api/pusher/auth",
      transport: "ajax",
   },
   cluster,
});

export default pusherClient;
