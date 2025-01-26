/**
 * Creates an object for including 'tags' in a 'post' create request.
 *
 * Parses a 'tags' array to an object, used to configure a search/creation of a
 * 'tag' entry in the database.
 *
 * @param {Array} tags An array of strings, each being a 'tag' name.
 *
 * @return {Object} An object with the 'connectOrCreate' key for the configuration
 * of the 'tags' field on the prisma request.
 */
module.exports.tagsToPrisma = (tags) => {
  return {
    connectOrCreate: tags.map((tag) => ({
      where: { name: tag },
      create: { name: tag },
    })),
  };
};
