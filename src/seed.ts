import { faker } from "@faker-js/faker";
import { cmsDb, qnaDb } from "./db";

async function clearCmsDb() {
    await cmsDb.post.deleteMany();
    await cmsDb.user.deleteMany();
}

async function clearQnaDb() {
    await qnaDb.answer.deleteMany();
    await qnaDb.question.deleteMany();
}

async function clearDbs() {
    await clearCmsDb();
    await clearQnaDb();
}

async function seedCmsDb() {
    for (let i = 0; i < 10; i++) {
        await cmsDb.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                posts: {
                    create: [
                        {
                            title: faker.lorem.sentence(),
                            published: true,
                        },
                        {
                            title: faker.lorem.sentence(),
                            content: faker.lorem.paragraph(),
                        },
                    ],
                },
            },
        });
    }
}

async function seedQnaDb() {
    for (let i = 0; i < 10; i++) {
        const question = await qnaDb.question.create({
            data: {
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
            },
        });

        await qnaDb.answer.create({
            data: {
                description: faker.lorem.paragraph(),
                questionId: question.id,
            },
        });
    }
}

async function seedDbs() {
    await clearDbs();

    await seedCmsDb();
    await seedQnaDb();
}

export { seedDbs };
