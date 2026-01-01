function index(req, res) {
  const posts = "list post";
  res.send(posts);
}

module.exports = {
  index: index,
};
