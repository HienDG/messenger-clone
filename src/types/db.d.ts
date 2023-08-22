import { Conversation, Message, User } from "@prisma/client";

export type ExtendMessageType = Message & {
   sender: User;
   seen: User[];
};

export type ExtendConversationWithUsers = Omit<ExtendConversationType, "messages">;

export type ExtendConversationType = Conversation & {
   users: User[];
   messages: ExtendMessageType[];
};
