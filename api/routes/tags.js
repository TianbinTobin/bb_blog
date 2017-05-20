/**
 * Created by Tianbin on 2017/5/20.
 */
const User = require('../../models/user');
const result = require('../../utils/result');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
    let user = User.find().exec();
    user.then(function (doc) {
        res.json(result(true, doc));
    })
});

module.exports = router;