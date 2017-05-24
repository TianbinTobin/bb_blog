/**
 * Created by Tianbin on 2017/5/24.
 */
const $ = require('../../controllers/article_controller');
const result = require('../../utils/result');
const verify = require('../../middleware/verify');
const express = require('express');
const router = express.Router();

router.post('/save', $.createArticle);
router.get('/get/:id', $.getArticle);
module.exports = router;