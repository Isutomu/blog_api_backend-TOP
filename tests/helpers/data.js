const {
  tagsToPrisma,
} = require("../../src/helpers/parsePostTagsForPrismaCreate");

module.exports.user = {
  id: "778fb80f-7621-4523-87b2-945629ecf5c8",
  username: "username",
  email: "email@email.com",
  password: "password",
};

module.exports.posts = [
  {
    id: "c14918bf-1787-4314-8748-949b22df9098",
    image: "image",
    title: "title1",
    content: "content",
    contentPreview: "contentPreview",
    tags: tagsToPrisma(["tag1", "tag2"]),
    userId: "778fb80f-7621-4523-87b2-945629ecf5c8",
    createdAt: "2025-02-07T20:34:42.965Z",
    updatedAt: "2025-02-07T20:34:42.965Z",
  },
  {
    id: "5396b84a-30a1-4ead-8fe2-7c4f55986a3f",
    image: "image",
    title: "title2",
    content: "content",
    contentPreview: "contentPreview",
    tags: tagsToPrisma(["tag1", "tag2"]),
    userId: "778fb80f-7621-4523-87b2-945629ecf5c8",
    createdAt: "2025-02-07T20:34:42.965Z",
    updatedAt: "2025-02-07T20:34:42.965Z",
  },
];

module.exports.tags = ["tag1", "tag2"];

module.exports.newUser = {
  username: "newUsername",
  email: "newEmail@email.com",
  password: "password",
};

module.exports.comments = [
  {
    postId: "c14918bf-1787-4314-8748-949b22df9098",
    content: "content",
    createdAt: "2025-02-07T20:34:42.965Z",
    updatedAt: "2025-02-07T20:34:42.965Z",
  },
];
