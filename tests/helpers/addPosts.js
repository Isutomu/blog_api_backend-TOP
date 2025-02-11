const {
  prismaClientSelector,
} = require("../../src/helpers/prismaClientSelector");
const {
  tagsToPrisma,
} = require("../../src/helpers/parsePostTagsForPrismaCreate");

const addPosts = async (posts) => {
  const prisma = prismaClientSelector();
  for (const post of posts) {
    await prisma.post.create({ data: post });
  }
  return true;
};

module.exports = addPosts;
