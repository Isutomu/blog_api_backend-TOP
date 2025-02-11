const asyncHandler = require("express-async-handler");
const { prismaClientSelector } = require("../../helpers/prismaClientSelector");

const prisma = prismaClientSelector();

/**
 * Fetches all 'posts'.
 *
 * Returns all 'posts' with all the fields on the database,
 * with the exception on 'content' (so only the short
 * version 'contentPreview' is sent.)
 *
 * @return {Object} An object with the 'data' key whose value
 * is an array with 'post' objects.
 */
module.exports.allPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      tags: { select: { name: true } },
    },
  });

  return res.status(200).json({ data: posts });
});

/**
 * Fetches a single post.
 *
 * Returns a single post with all the fields on the database,
 * with the exception on 'contentPreview' (so only the full
 * version 'content' is sent.)
 *
 * @return {Object} An object with the 'data' key whose value
 * is a "post" object.
 */
module.exports.singlePost = asyncHandler(async (req, res) => {
  const post = await prisma.post.findFirst({
    where: { id: req.params.postId },
    include: {
      tags: { select: { name: true } },
    },
  });

  return res.status(200).json({ data: post });
});

/**
 * Fetches all 'posts' that have the required tag.
 *
 * Returns all 'posts' with all the fields on the database,
 * with the exception on 'content' (so only the short
 * version 'contentPreview' is sent.) that have the required tag
 * as one of its tags
 *
 * @return {Object} An object with the 'data' key whose value
 * is an array with 'post' objects.
 */
module.exports.searchByTag = asyncHandler(async (req, res) => {
  const posts = await prisma.tag.findFirst({
    where: { name: req.params.tagName },
    select: {
      posts: { include: { tags: { select: { name: true } } } },
    },
  });

  return res.json({ data: posts?.posts });
});
