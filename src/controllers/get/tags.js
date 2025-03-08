const asyncHandler = require("express-async-handler");
const { prismaClientSelector } = require("../../helpers/prismaClientSelector");

const prisma = prismaClientSelector();

/**
 * Fetches all 'tags'.
 *
 * Returns all 'tags' with all the fields on the database.
 *
 * @return {Object} An object with the 'data' key whose value
 * is an array with 'tag' objects.
 */
module.exports.allTags = asyncHandler(async (req, res) => {
  const tags = await prisma.tag.findMany();
  return res.status(200).json({ data: tags });
});
