import { cmsDb, qnaDb } from "./db";
import { seedDbs } from "./seed";

async function main() {
    // Seed the databases
    await seedDbs();

    // Query the databases
    const users = await cmsDb.user.findMany({
        include: {
            posts: true,
        },
    });

    console.log("=== Users & Posts ===");
    for (const user of users) {
        const { posts, ...userData } = user;
        console.log(userData);
        console.log("Posts:");
        for (const post of posts) {
            console.log(post);
        }
        console.log();
    }

    const questions = await qnaDb.question.findMany({
        include: {
            answers: true,
        },
    });

    console.log("=== Questions & Answers ===");
    for (const question of questions) {
        const { answers, ...questionData } = question;
        console.log("Question:");
        console.log(questionData);
        console.log("Answer:");
        for (const answer of answers) {
            console.log(answer);
        }
        console.log();
    }
}

main()
    .then(async () => {
        await cmsDb.$disconnect();
        await qnaDb.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await cmsDb.$disconnect();
        await qnaDb.$disconnect();
        process.exit(1);
    });
