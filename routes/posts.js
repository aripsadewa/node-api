const express = require("express");
const postController = require("../controller/post");

const router = express.Router();

router.post("/", postController.save);
router.get("/:id", postController.show);

module.exports = router;
