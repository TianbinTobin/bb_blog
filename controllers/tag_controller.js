/**
 * Created by Tianbin on 2017/5/21.
 */
const Tag = require('../models/tag');
const result = require('../utils/result');

const createTag = function (req, res) {
    const name = req.body.name;
    if (name === undefined || name === "") {
        return res.json(result(false, '标签名不能为空'));
    }
    let query = Tag.findOne({name:name}).exec();
    query.then(function (doc) {
        if (doc !== null) {
            return res.json(result(false, '该标签已存在'));
        } else {
            let tag = new Tag({name: name});
            tag.save(function (err) {
                if (err) {
                    return res.json(result(false, '服务器错误'), 500);
                }
                return res.json(result(true, tag.toJSON()));
            });
        }
    });
};

const deleteTag = function (req, res) {

};

const modifyTag = function (req, res) {

};

const getAllTags = function (req, res) {

};

module.exports = {createTag, deleteTag, modifyTag, getAllTags};