/**
 * Created by Tianbin on 2017/5/20.
 */
const User = require('../models/user');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../configs');
const result = require('../utils/result');

const initUser = function () {
    let query = User.find().exec().catch(console.error);
    query.then(function (doc) {
        if (doc.length === 0) {
            const user = new User({
                name: 'Tianbin',
                username: config.admin.user,
                password: md5(config.admin.pwd),
                avatar: '',
                createTime: new Date().getTime()
            });
            user.save().catch(console.error)
        }
    });
};

const login = function (req, res) {
    const username = req.body.username;
    const password = md5(req.body.password);
    let query = User.findOne({username: username}).exec().catch(console.error);
    query.then(function (user) {
        if (user !== null) {
            if (user.password === password) {
                /**
                 * 生成token
                 */
                const token = jwt.sign({
                    uid: user._id,
                    name: user.name,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60  //1 hours
                }, config.jwt.secret);

                const body = {
                    success: true,
                    uid: user._id,
                    name: user.name,
                    token: token
                };
                res.json(result(true, body));
            } else {
                res.json(result(false, '密码错误'));
            }
        } else {
            res.json(result(false, '用户名错误'));
        }
    });
};

const check = function (req, res) {
    const username = req.body.username;
    let query = User.findOne({username: username}).exec().catch(console.error);
    query.then(function (doc) {
        if (doc === null) {
            return res.json(result(true, '该用户名可以使用'));
        } else {
            return res.json(result(false, '该用户名已存在'));
        }
    })
};

const register = function (req, res) {
    const username = req.body.username;
    const password = md5(req.body.password);
    const name = md5(req.body.name);
    let query = User.findOne({username: username}).exec().catch(console.error);
    query.then(function (doc) {
        if (doc === null) {
            const user = new User({
                name: name,
                username: username,
                password: password,
                avatar: '',
                createTime: new Date().getTime()
            });
            user.save(function (err) {
                if (err) {
                    return res.json(result(false, '用户注册失败'));
                }
                return res.json(result(true, '注册成功'));
            });
        } else {
            return res.json(result(false, '该用户名已存在'));
        }
    })
};

module.exports = {initUser: initUser, login: login, register: register, check: check};