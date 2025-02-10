const express = require('express');
const router = express.Router();

const filmController = require('../controllers/filmController')

router.get('/', filmController.index);
router.get('/:id', filmController.show);

router.post('/:id/reviews', filmController.postReview)

module.exports = router;