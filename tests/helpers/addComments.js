const {
  prismaClientSelector,
} = require("../../src/helpers/prismaClientSelector");

const addComments = async (comments) => {
  const prisma = prismaClientSelector();
  for (const comment of comments) {
    await prisma.comment.create({ data: comment });
  }
  return true;
};

module.exports = addComments;
