const { Router } = require("express");
const controllersGetPosts = require("../controllers/get/posts");
const controllersPostPosts = require("../controllers/post/posts");
const controllersGetTags = require("../controllers/get/tags");
const controllersPostLogIn = require("../controllers/post/logIn");
const controllersPostSignUp = require("../controllers/post/signUp");
const passport = require("passport");
const controllersPostComments = require("../controllers/post/comments");

const routes = Router();

/**
 * ------------------- UNPROTECTED ROUTES -------------------
 */
routes.get("/posts", controllersGetPosts.allPosts);
routes.get("/posts/:postId", controllersGetPosts.singlePost);
routes.get("/tags", controllersGetTags.allTags);
routes.get("/tags/:tagName", controllersGetPosts.searchByTag);
routes.post("/login", controllersPostLogIn.logIn);
routes.post("/signup", controllersPostSignUp.signUp);

/**
 * ------------------- PROTECTED ROUTES -------------------
 */

// Passport authentication
require("../config/passport");
routes.use(passport.authenticate("jwt", { session: false }));

routes.post("/posts", controllersPostPosts.singlePost);
routes.patch("/posts/:postId", controllersPostPosts.updatePost);
routes.post("/posts/:postId/comments", controllersPostComments.singleComment);
routes.patch(
  "/posts/:postId/comments/:commentId",
  controllersPostComments.updateComment,
);

module.exports = routes;
