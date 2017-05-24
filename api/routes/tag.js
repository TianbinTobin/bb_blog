/**
 * Created by Tianbin on 2017/5/20.
 */
const $ = require('../../controllers/tag_controller');
const result = require('../../utils/result');
const verify = require('../../middleware/verify');
const express = require('express');
const router = express.Router();

router.post('/save', verify, $.createTag);
router.post('/delete', verify, $.deleteTag);
router.post('/update', verify, $.modifyTag);
router.post('/list', $.getAllTags);

module.exports = router;