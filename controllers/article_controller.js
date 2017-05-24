/**
 * Created by Tianbin on 2017/5/24.
 */
const Article = require('../models/article');
const result = require('../utils/result');

const createArticle = function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const abstract = req.body.abstract;
    const publish = req.body.publish;
    const tags = req.body.tags;
    const createTime = new Date();
    const lastEditTime = new Date();
    if (title === null || title === undefined) {
        return res.json(result(false, '标题不能为空'));
    }
    if (content === null || title === undefined) {
        return res.json(result(false, '内容不能为空'));
    }
    const article = new Article({
        title,
        content,
        abstract,
        publish,
        tags,
        createTime,
        lastEditTime
    });
    let createResult = article.save().catch(function (err) {
        return res.json(result(false, '服务器内部错误'), 500);
    });
    createResult.then(function (doc) {
        Article.populate(doc, {path: 'tags'}, function (err, doc) {
            return res.json(result(true, doc));
        });
    });
};

const getArticle = function (req, res) {
    const id = req.params.id;
    if (!id) {
        return res.json(result(false, 'id不能为空'));
    }
    const query = Article.findById(id).exec().catch(function (err) {
        return res.json(result(false, '服务器内部错误'), 500);
    });
    query.then(function (doc) {
        return res.json(result(true, doc));
    });
};

module.exports = {createArticle, getArticle};