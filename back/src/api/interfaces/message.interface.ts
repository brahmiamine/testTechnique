import { Document, Types } from 'mongoose';

export interface IMessage extends Document {
    _id?: Types.ObjectId;
    subject: string;
    content: string;
    isRead: boolean;
    from: string;
    to: string;
    senderName?: string;
    createdAt: Date;
    updatedAt: Date;
}