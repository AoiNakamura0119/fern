import { User } from '../../../domain/model/user';
import { UserRepository } from '../../../domain/usecase/user/mod';
import prisma from '../../../lib/prisma';

// ✅ interfaceを満たす形で実装
export const userRepositoryPrisma: UserRepository = {
    async gets(): Promise<User[]> {
        return await prisma.user.findMany();
    },
    async post(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    },
    async update(user: User): Promise<void> {
        const existing = await prisma.user.findUnique({
            where: { id: user.id },
        });
    
        if (!existing) {
            throw new Error('対象のユーザーが存在しません');
        }
    
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
            },
        });
    },
    async delete(id: string): Promise<void> {
        const existing = await prisma.user.findUnique({
            where: { id },
        });
    
        if (!existing) {
            throw new Error('対象のユーザーが存在しません');
        }
    
        await prisma.user.delete({
            where: { id },
        });
    },
};
