import { Feedback } from "@prisma/client";
import { FeedbackRepository } from "../../../domain/usecase/feedback.ts/mod";
import prisma from "../../../lib/prisma";


export const FeedbackRepositoryPrisma: FeedbackRepository = {
    async gets(user_id: string): Promise<Feedback[]> {
        return await prisma.feedback.findMany({where: {userId: user_id}});
    },
    async post(feedback: Feedback): Promise<void> {
        await prisma.feedback.create({
            data: {
                id: feedback.id,
                userId: feedback.userId,
                title: feedback.title,
                content: feedback.content || null,
                cause: feedback.cause || null,
                solution: feedback.solution || null,
                createdAt: new Date()
            },
        });
    },
    async update(feedback: Feedback): Promise<void> {
        const existing = await prisma.feedback.findUnique({
            where: { id: feedback.id },
        });
    
        if (!existing) {
            throw new Error('対象のユーザーが存在しません');
        }
    
        await prisma.feedback.update({
            where: { id: feedback.id },
            data: {
                id: feedback.id,
                userId: feedback.userId,
                title: feedback.title,
                content: feedback.content || null,
                cause: feedback.cause || null,
                solution: feedback.solution || null,
                createdAt: new Date()
            },
        });
    },
    async delete(id: string): Promise<void> {
        const existing = await prisma.feedback.findUnique({
            where: { id },
        });
    
        if (!existing) {
            throw new Error('対象のフィードバックが存在しません');
        }
    
        await prisma.feedback.delete({
            where: { id },
        });
    },
};
