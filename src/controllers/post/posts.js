const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { sanitizeHTML } = require("../../helpers/sanitizeHTML");
const { sliceContent } = require("../../helpers/parseAndSliceContent");
const { tagsToPrisma } = require("../../helpers/parsePostTagsForPrismaCreate");

const prisma = new PrismaClient();

/**
 * Adds a 'post' to the database.
 *
 * Besides adding the post, if a 'tag' is used on said post that is not yet
 * on the 'tags' database this 'tag' is also going to be added (to the 'Tag' database).
 *
 * @return {Object} An object with the 'data' key whose value
 * is the added 'post'.
 */
module.exports.singlePost = asyncHandler(async (req, res) => {
  const { image, title, content, tags } = req.body;
  const userId = req.user.id;
  const contentPreview = sliceContent(sanitizeHTML(content));

  const post = {
    image,
    title,
    content,
    userId,
    contentPreview,
  };

  const databasePost = await prisma.post.create({
    data: { ...post, tags: tagsToPrisma(tags) },
  });
  return res.status(201).json({ data: databasePost });
});

/**
 * Update a 'post' from the database.
 *
 * Besides updating the post, if a 'tag' is used on said post that is not yet
 * on the 'tags' database this 'tag' is also going to be added (to the 'Tag' database).
 *
 * @return {Object} An object with the 'data' key whose value
 * is the added 'post'.
 */
module.exports.updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { image, title, content, tags } = req.body;
  const userId = req.user.id;
  const contentPreview = sliceContent(sanitizeHTML(content));

  const post = {
    image,
    title,
    content,
    userId,
    contentPreview,
    updatedAt: new Date(),
  };

  const databasePost = await prisma.post.update({
    where: { id: postId },
    data: { ...post, tags: tagsToPrisma(tags) },
  });
  return res.status(200).json({ data: databasePost });
});
