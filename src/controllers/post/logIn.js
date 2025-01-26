const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports.logIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUniqueOrThrow({
    where: { username: username },
  });

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const opts = {};
    opts.expiresIn = 7200; // jwt expires in 2 hours
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, opts);

    return res.status(200).json({ message: "Auth Passed", token });
  }

  return res.status(401).json({ message: "Incorrect password!" });
});
