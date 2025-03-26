import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding 開始...');

    // ✅ ユーザー10人
    const usersData = Array.from({ length: 10 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
    }));
    await prisma.user.createMany({ data: usersData, skipDuplicates: true });

    // ✅ カテゴリ10個
    const categoriesData = Array.from({ length: 10 }).map((_, i) => ({
        id: `cat-${i}`,
        title: `カテゴリ ${i + 1}`,
    }));
    await prisma.category.createMany({ data: categoriesData, skipDuplicates: true });

    // ✅ フィードバック50件（ユーザーランダム）
    const feedbacksData = Array.from({ length: 50 }).map((_, i) => ({
        id: `fb-${i}`,
        userId: faker.helpers.arrayElement(usersData).id,
        title: `フィードバック #${i + 1}`,
        content: faker.lorem.sentences(2),
        cause: faker.lorem.sentence(),
        solution: faker.lorem.sentence(),
        createdAt: faker.date.recent(),
    }));
    await prisma.feedback.createMany({ data: feedbacksData, skipDuplicates: true });

    // ✅ フィードバック ↔ カテゴリ の関連
    const feedbackCategoryLinks = feedbacksData.map((fb) => ({
        feedbackId: fb.id,
        categoryId: faker.helpers.arrayElement(categoriesData).id,
    }));
    await Promise.all(
        feedbackCategoryLinks.map((link) =>
        prisma.feedbackCategory.create({ data: link }).catch(() => {})
        )
    );

    // ✅ チェックリスト20件
    const checklistsData = Array.from({ length: 20 }).map((_, i) => ({
        id: `cl-${i}`,
        userId: faker.helpers.arrayElement(usersData).id,
        title: `チェックリスト ${i + 1}`,
        categoryId: faker.helpers.arrayElement(categoriesData).id,
        forDate: faker.date.soon(),
        createdAt: faker.date.recent(),
    }));
    await prisma.checklist.createMany({ data: checklistsData, skipDuplicates: true });

    // ✅ チェックリスト × フィードバック → インスペクション（最大3つ/チェックリスト）
    const inspectionsData = checklistsData.flatMap((cl) => {
        const relatedFeedbacks = faker.helpers.shuffle(feedbacksData).slice(0, 3);
        return relatedFeedbacks.map((fb) => ({
        id: faker.string.uuid(),
        checklistId: cl.id,
        feedbackId: fb.id,
        result: faker.datatype.boolean(),
        note: faker.lorem.sentence(),
        createdAt: faker.date.recent(),
        }));
    });
    await prisma.inspection.createMany({ data: inspectionsData, skipDuplicates: true });

    console.log('✅ Seed 完了！');
}

main()
    .catch((e) => {
        console.error('❌ エラー:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
