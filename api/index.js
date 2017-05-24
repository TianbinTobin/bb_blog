/**
 * Created by Tianbin on 2017/5/20.
 */
const token = require('./routes/token');
const tag = require('./routes/tag');
const article = require('./routes/article');

module.exports = function (app) {
    app.use('/api/token', token);
    app.use('/api/article', article);
    app.use('/api/tag', tag);
};