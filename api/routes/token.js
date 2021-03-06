/**
 * Created by Tianbin on 2017/5/20.
 */
const $ = require('../../controllers/token_controller');
const express = require('express');
const router = express.Router();

$.initUser();
router.post('/', $.login);
router.post('/register', $.register);
router.post('/check', $.check);

module.exports = router;

