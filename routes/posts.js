const express = require("express");
const postController = require("../controller/post");

const router = express.Router();

router.post("/", postController.save);
router.get("/:id", postController.show);
router.get("/", postController.index);
router.patch("/:id", postController.update);
router.delete("/:id", postController.destroy);

module.exports = router;
