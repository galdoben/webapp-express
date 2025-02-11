const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')

const filmController = require('../controllers/filmController')

router.get('/', filmController.index);
router.get('/:id', filmController.show);

router.post('/:id/reviews', filmController.postReview)

router.post('/', upload.single('image'), filmController.postMovie)

module.exports = router;