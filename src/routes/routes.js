const { Router } = require("express");
const controllersGetPosts = require("../controllers/get/posts");
const controllersPostPosts = require("../controllers/post/posts");
const controllersPostLogIn = require("../controllers/post/logIn");
const passport = require("passport");

const routes = Router();

/**
 * ------------------- UNPROTECTED ROUTES -------------------
 */
routes.get("/posts", controllersGetPosts.allPosts);
routes.get("/posts/:postId", controllersGetPosts.singlePost);
routes.get("/tags/:tagName", controllersGetPosts.searchByTag);
routes.post("/login", controllersPostLogIn.logIn);

/**
 * ------------------- PROTECTED ROUTES -------------------
 */

// Passport authentication
require("../config/passport");
routes.use(passport.authenticate("jwt", { session: false }));

routes.post("/posts", controllersPostPosts.singlePost);
routes.patch("/posts/:postId", controllersPostPosts.updatePost);

module.exports = routes;
