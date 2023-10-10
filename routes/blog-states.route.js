const express = require("express");
const router = express.Router();
const { getBlogStates } = require("../Controllers/blog-states.controller");

router.get("/api/blog-states", getBlogStates);

module.exports = router;
