const bcrypt = require("bcryptjs");
const {
  prismaClientSelector,
} = require("../../src/helpers/prismaClientSelector");

const addUser = async (user) => {
  const prisma = prismaClientSelector();
  bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
    if (err) {
      throw err;
    }

    await prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: hashedPassword,
        salt: "salt",
      },
    });
  });

  const newUser = await prisma.user.findFirst({
    where: { username: user.username },
  });
  return newUser;
};

module.exports = addUser;
