/**
 * Created by Tianbin on 2017/5/20.
 */
const $ = require('../../controllers/tag_controller');
const Tag = require('../../models/tag');
const result = require('../../utils/result');
const express = require('express');
const router = express.Router();

router.post('/save', $.createTag);

module.exports = router;