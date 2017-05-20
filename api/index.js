/**
 * Created by Tianbin on 2017/5/20.
 */
const token = require('./routes/token');
const tags = require('./routes/tags');
const verify = require('../middleware/verify');

module.exports = function (app) {
    app.use('/token', token);
    app.use('/tags', verify, tags);
};