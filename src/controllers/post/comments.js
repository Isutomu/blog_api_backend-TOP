const asyncHandler = require("express-async-handler");
const { prismaClientSelector } = require("../../helpers/prismaClientSelector");

const prisma = prismaClientSelector();

module.exports.singleComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  const comment = {
    content,
    user: { connect: { id: userId } },
    post: { connect: { id: postId } },
  };

  const databaseComment = await prisma.comment.create({ data: comment });
  return res.status(201).json({ data: databaseComment });
});

module.exports.updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  const comment = { content };

  const databaseComment = await prisma.comment.update({
    where: { id: commentId },
    data: comment,
  });
  return res.status(200).json({ data: databaseComment });
});
