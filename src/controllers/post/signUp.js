const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { prismaClientSelector } = require("../../helpers/prismaClientSelector");
const { body, validationResult } = require("express-validator");
const { sanitizeHTML } = require("../../helpers/sanitizeHTML");

const prisma = prismaClientSelector();
const saltRounds = 10;

const lengthErrUsername = "must be between 3 and 25 characters.";
const lengthErrEmail = "must be between 13 and 40 characters.";
const lengthErrPassword = "must be between 3 and 20 characters.";
const validateUser = [
  body("username")
    .isLength({ min: 3, max: 25 })
    .withMessage(`Username ${lengthErrUsername}`),
  body("email")
    .isLength({ min: 13, max: 40 })
    .withMessage(`Email ${lengthErrEmail}`),
  body("password")
    .isAlphanumeric()
    .withMessage("Password must contain only letters and numbers.")
    .isLength({ min: 3, max: 20 })
    .withMessage(`Password ${lengthErrPassword}`),
];

module.exports.signUp = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const sanitizedUsername = sanitizeHTML(username);
    if (username !== sanitizedUsername) {
      return res.status(400).json({
        errors: "The username should only contain letters and numbers.",
      });
    }

    const userUnavailable = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          {
            email: email,
          },
        ],
      },
    });
    if (!!userUnavailable) {
      return res
        .status(409)
        .send({ errors: "Username and/or email unavailable." });
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        throw err;
      }
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) throw err;

        const createdUser = await prisma.user.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
            admin: false,
            salt: salt,
          },
        });

        const responseData = {
          username: createdUser.username,
          email: createdUser.email,
          admin: createdUser.admin,
        };
        return res.status(201).json({ data: responseData });
      });
    });
  }),
];
