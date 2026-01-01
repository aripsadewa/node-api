const { where } = require("sequelize");
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

function show(req, res) {
  const id = req.params.id;

  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "something wrong",
      });
    });
}

function index(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something wrong",
      });
    });
}

function update(req, res) {
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.categoryId,
  };

  const userId = 1;

  models.Post.update(updatedPost, { where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Update succesful",
        post: updatedPost,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something wrong",
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;
  const userId = 1;
  models.Post.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Delete succesful",
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
  show: show,
  index: index,
  update: update,
  destroy: destroy,
};
