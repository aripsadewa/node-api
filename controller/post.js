const models = require("../models");

function save(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.categoryId,
    userId: 1,
  };

  models.Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: "Create succesful",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something wrong",
        error: error,
      });
    });
}

module.exports = {
  save: save,
};
