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
    let query = Tag.findOne({name:name}).exec().catch(console.error);
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
    const name = req.body.name;
    let query = Tag.remove({name: name}).exec().catch(console.error);
    query.then(function (doc) {
        if(doc !== null) {
            return res.json(result(true, '删除成功'));
        }
    });
};

const modifyTag = function (req, res) {
    const _id = req.body._id;
    const name = req.body.name;
    let query = Tag.update({_id: _id}, {name: name}).exec().catch(console.error);
    query.then(function (doc) {
        if(doc !== null) {
            return res.json(result(true, '更新成功'));
        }
    });
};

const getAllTags = function (req, res) {
    let query2 = Tag.count().exec().catch(console.err);
    query2.then(function (total) {
        let query1 = Tag.find().exec().catch(console.error);
        query1.then(function (doc) {
            const data = {};
            if(doc.length !== 0) {
                const docArr = [];
                for (let i = 0, len = doc.length; i < len; i++) {
                    docArr.push(doc[i].toJSON());
                }
                data.data = docArr;
                data.total = total;
                return res.json(result(true, data));
            } else {
                data.data = "";
                data.total = total;
                return res.json(result(true, data));
            }
        });
    });
};

module.exports = {createTag, deleteTag, modifyTag, getAllTags};