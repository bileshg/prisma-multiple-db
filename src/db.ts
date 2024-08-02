import { PrismaClient as CmsPrismaClient } from "./prisma/cms-client";
import { PrismaClient as QnaPrismaClient } from "./prisma/qna-client";

const cmsDb = new CmsPrismaClient();
const qnaDb = new QnaPrismaClient();

export { cmsDb, qnaDb };
