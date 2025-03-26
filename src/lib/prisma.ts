import { PrismaClient } from '@prisma/client';

// prismmaはDBコネクションプールなどを実装しなくても, よしなに管理してくれるらしい
const prisma = new PrismaClient();

export default prisma;
