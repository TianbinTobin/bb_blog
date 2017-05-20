/**
 * Created by Tianbin on 2017/5/20.
 */
const jwt = require('jsonwebtoken');
const config = require('../configs');
const result = require('../utils/result');

module.exports = function (req, res, next) {

    const authorization = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if(!authorization){
        res.json(result(false, 'no token detected in http header \'Authorization\''), 400);
        return;
    }
    const token = authorization;
    let tokenContent;
    try {
        tokenContent = jwt.verify(token, config.jwt.secret);
        req.tokenContent = tokenContent;
    } catch (err) {
        if ('TokenExpiredError' === err.name) {
            res.json(result(false, 'token expired,请及时本地保存数据！'));
            return;
        }
        res.json(result(false, 'invalid token'));
        return;
    }
    next();
};