const expess = require('express');
const imageController = require('../controllers/image');
const upload = require('../helpers/image-uploader');
const checkAuthMiddleware = require("../middleware/check-auth");
const router = expess.Router();
router.post('/upload', checkAuthMiddleware.checkAuth, upload.single('image'), imageController.uploadImage);

module.exports = router;
