function uploadImage(req, res) {
    if(!req.file) {
        return res.status(400).json({
            message: 'No image uploaded'    
        });
    } else {
        return res.status(200).json({
            message: 'Image uploaded successfully',
            fileName: req.file.filename
        });
    }
}

module.exports = {
    uploadImage: uploadImage
}