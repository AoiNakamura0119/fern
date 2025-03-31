// seed-user.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding 204e3604-4ed5-405b-9a5e-25b872b388d5 用データを作成中...');

  // 🎯 対象ユーザー取得
  const targetUser = await prisma.user.findUnique({
    where: { id: '204e3604-4ed5-405b-9a5e-25b872b388d5' }
  });

  if (!targetUser) {
    throw new Error('❌ ユーザーが見つかりません: 9ecf30af-1657-4720-96b1-39bda144cdc6');
  }

  // 🎯 カテゴリが必要なので取得（なければ作る）
  const categories = await prisma.category.findMany();
  const category = categories.length > 0
    ? faker.helpers.arrayElement(categories)
    : await prisma.category.create({
        data: {
          id: 'cat-default',
          title: 'デフォルトカテゴリ'
        }
      });

  // 🎯 フィードバックを5件作成
  const feedbacksData = Array.from({ length: 5 }).map((_, i) => ({
    id: faker.string.uuid(),
    userId: targetUser.id,
    title: `user@example.com のフィードバック #${i + 1}`,
    content: faker.lorem.sentences(2),
    cause: faker.lorem.sentence(),
    solution: faker.lorem.sentence(),
    createdAt: new Date()
  }));
  await prisma.feedback.createMany({ data: feedbacksData });

  // 🎯 チェックリストを2件作成
  const checklistsData = Array.from({ length: 2 }).map((_, i) => ({
    id: faker.string.uuid(),
    userId: targetUser.id,
    title: `user@example.com のチェックリスト #${i + 1}`,
    categoryId: category.id,
    forDate: faker.date.soon(),
    createdAt: new Date()
  }));
  await prisma.checklist.createMany({ data: checklistsData });

  console.log('✅ user@example.com 用シードデータ完了！');
}

main()
  .catch((e) => {
    console.error('❌ エラー:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
