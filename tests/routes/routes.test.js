// local imports
const routes = require("../../src/routes/routes");
const {
  prismaClientSelector,
} = require("../../src/helpers/prismaClientSelector");
const addUser = require("../helpers/addUser");
const addPosts = require("../helpers/addPosts");

//3rd party imports
const request = require("supertest");
const express = require("express");
const addComments = require("../helpers/addComments");

// server setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

// Auxiliary functions
const cleanDatabase = async () => {
  const prisma = prismaClientSelector();
  await prisma.comment.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
};

// tests
describe("Get tests", () => {
  const testData = require("../helpers/data");

  // pre-test
  beforeAll(async () => {
    await cleanDatabase();

    // add couple entries for all tables
    await addUser(testData.user);
    await addPosts(testData.posts);
  });
  // post-test
  afterAll(async () => await cleanDatabase());

  test("Get alls posts route work", (done) => {
    request(app)
      .get("/posts")
      .expect("Content-Type", /json/)
      .expect({
        data: testData.posts.map((post) => ({
          ...post,
          tags: testData.tags.map((tag) => ({ name: tag })),
        })),
      })
      .expect(200, done);
  });

  test("Get single post route work", (done) => {
    const testPost = testData.posts[0];

    request(app)
      .get(`/posts/${testPost.id}`)
      .expect("Content-Type", /json/)
      .expect({
        data: {
          ...testPost,
          tags: testData.tags.map((tag) => ({ name: tag })),
        },
      })
      .expect(200, done);
  });

  test("Get all posts with a certain tag", (done) => {
    const testTag = testData.tags[0];

    request(app)
      .get(`/tags/${testTag}`)
      .expect("Content-Type", /json/)
      .expect({
        data: testData.posts.map((post) => ({
          ...post,
          tags: testData.tags.map((tag) => ({ name: tag })),
        })),
      })
      .expect(200, done);
  });
});

describe("Test posts", () => {
  const testData = require("../helpers/data");

  // pre-test
  beforeAll(async () => {
    await cleanDatabase();

    await addUser(testData.user);
    await addPosts([testData.posts[1]]);
  });
  //post-test
  afterAll(async () => await cleanDatabase());

  const login = () =>
    request(app)
      .post("/login")
      .type("json")
      .send(testData.user)
      .expect("Content-Type", /json/);

  test("Post user login info, and returns JWT", (done) => {
    login().expect(200, done);
  });

  test("Post single post", (done) => {
    const testPost = testData.posts[0];
    const partialPostResponse = {
      image: testPost.image,
      title: testPost.title,
      content: testPost.content,
      userId: testPost.userId,
      contentPreview: "content...",
    };

    login().then((res) => {
      request(app)
        .post("/posts")
        .type("json")
        .set("Authorization", `Bearer ${res.body.token}`)
        .send({ ...testPost, tags: testData.tags })
        .expect("Content-Type", /json/)
        .expect((res) =>
          expect(res.body.data).toEqual(
            expect.objectContaining(partialPostResponse),
          ),
        )
        .expect(201, done);
    });
  });

  test("Patch single post", (done) => {
    const testPost = testData.posts[1];
    const partialPostResponse = {
      ...testPost,
      contentPreview: "content...",
    };
    delete partialPostResponse["tags"];
    delete partialPostResponse["updatedAt"];

    login().then((res) => {
      request(app)
        .patch(`/posts/${testPost.id}`)
        .type("json")
        .set("Authorization", `Bearer ${res.body.token}`)
        .send({ ...testPost, tags: testData.tags })
        .expect("Content-Type", /json/)
        .expect((res) =>
          expect(res.body.data).toEqual(
            expect.objectContaining(partialPostResponse),
          ),
        )
        .expect(200, done);
    });
  });

  test("Create a new user", (done) => {
    const expectedPartialData = {
      username: testData.newUser.username,
      email: testData.newUser.email,
    };

    request(app)
      .post("/signup")
      .type("json")
      .send(testData.newUser)
      .expect("Content-Type", /json/)
      .expect((res) =>
        expect(res.body.data).toEqual(
          expect.objectContaining(expectedPartialData),
        ),
      )
      .expect(201, done);
  });
});

describe("Test comments", () => {
  const testData = require("../helpers/data");

  // pre-test
  beforeAll(async () => {
    await cleanDatabase();

    // add couple entries for all tables
    await addUser(testData.user);
    await addPosts(testData.posts);
    await addComments([testData.comments[1]]);
  });
  // post-test
  afterAll(async () => await cleanDatabase());

  const login = () =>
    request(app)
      .post("/login")
      .type("json")
      .send(testData.user)
      .expect("Content-Type", /json/);

  test("POST comment", (done) => {
    const testComment = testData.comments[0];
    const partialCommentResponse = {
      content: testComment.content,
    };

    login().then((res) => {
      request(app)
        .post(`/posts/${testComment.postId}/comments`)
        .type("json")
        .set("Authorization", `Bearer ${res.body.token}`)
        .send(partialCommentResponse)
        .expect("Content-Type", /json/)
        .expect((res) =>
          expect(res.body.data).toEqual(
            expect.objectContaining(partialCommentResponse),
          ),
        )
        .expect(201, done);
      // .end((err, res) => {
      //   if (err) {
      //     console.error(res.error);
      //   }
      //   done(err);
      // });
    });
  });

  test("PATCH comment", (done) => {
    const testComment = testData.comments[1];
    const partialCommentResponse = { ...testComment, content: "new content" };
    delete partialCommentResponse["postId"];

    login().then((res) => {
      request(app)
        .patch(`/posts/${testComment.postId}/comments/${testComment.id}`)
        .type("json")
        .set("Authorization", `Bearer ${res.body.token}`)
        .send(partialCommentResponse)
        .expect("Content-Type", /json/)
        .expect((res) =>
          expect(res.body.data).toEqual(
            expect.objectContaining(partialCommentResponse),
          ),
        )
        .expect(200, done);
      // .end((err, res) => {
      //   if (err) {
      //     console.error(res.error);
      //   }
      //   done(err);
      // });
    });
  });
});
