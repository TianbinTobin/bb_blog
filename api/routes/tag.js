/**
 * Created by Tianbin on 2017/5/20.
 */
const $ = require('../../controllers/tag_controller');
const Tag = require('../../models/tag');
const result = require('../../utils/result');
const express = require('express');
const router = express.Router();

router.post('/save', $.createTag);
router.post('/delete', $.deleteTag);
router.post('/update', $.modifyTag);
router.post('/list', $.getAllTags);

module.exports = router;