const express = require("express");
const { getSearchedBlog } = require("../Controllers/blog-search.controller");
const router = express.Router();

router.get("/api/blog-search", getSearchedBlog);

module.exports = router;
