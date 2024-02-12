import mongoose from 'mongoose';
import { IMessage } from '../interfaces/message.interface';

const messageSchema = new mongoose.Schema(
    {
        subject: { type: String, required: true },
        content: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        from: { type: String, required: true },
        to: { type: String, required: true },
        senderName: { type: String },
    },
    {
        timestamps: true,
    }
);

export const MessageModel = mongoose.model<IMessage>('Message', messageSchema);
