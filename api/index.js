/**
 * Created by Tianbin on 2017/5/20.
 */
const token = require('./routes/token');
const tags = require('./routes/tag');
const verify = require('../middleware/verify');

module.exports = function (app) {
    app.use('/api/token', token);
    app.use('/api/tag', verify, tags);
};