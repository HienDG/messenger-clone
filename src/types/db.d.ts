import { Conversation, Message, User } from "@prisma/client";

export type ExtendMessageType = Message & {
   sender: User;
   seen: User[];
};

export type ExtendConversationType = Conversation & {
   users: User[];
   messages: ExtendMessageType[];
};
