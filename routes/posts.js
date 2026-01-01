const express = require("express");
const postController = require("../controller/post");

const router = express.Router();

router.get("/", postController.index);

module.exports = router;
