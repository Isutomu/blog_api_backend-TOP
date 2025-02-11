module.exports.prismaClientSelector = () => {
  const { PrismaClient } = require("@prisma/client");

  const databaseUrl =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL;

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
};
