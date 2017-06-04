/**
 * Created by Tianbin on 2017/5/21.
 */
const Tag = require('../models/tag');
const result = require('../utils/result');

/**
 * 添加标签
 * @param req
 * @param res
 */
const createTag = function (req, res) {
    const name = req.body.name;
    if (name === undefined || name === "") {
        return res.json(result(false, '标签名不能为空'));
    }
    let query = Tag.findOne({name: name}).exec().catch(console.error);
    query.then(function (doc) {
        if (doc !== null) {
            return res.json(result(false, '该标签已存在'));
        } else {
            let tag = new Tag({name: name});
            tag.save(function (err, doc) {
                if (err) {
                    return res.json(result(false, '服务器错误'), 500);
                }
                return res.json(result(true, doc));
            });
        }
    });
};

/**
 * 删除标签
 * @param req
 * @param res
 */
const deleteTag = function (req, res) {
    const _id = req.body._id;
    let query = Tag.remove({_id: _id}).exec().catch(console.error);
    query.then(function (doc) {
        if (doc !== null) {
            return res.json(result(true, '删除成功'));
        }
    });
};

/**
 * 修改标签
 * @param req
 * @param res
 */
const modifyTag = function (req, res) {
    const _id = req.body._id;
    const name = req.body.name;
    let query = Tag.update({_id: _id}, {name: name}).exec().catch(console.error);
    query.then(function (doc) {
        if (doc !== null) {
            return res.json(result(true, '更新成功'));
        }
    });
};

/**
 * 获取所有标签
 * @param req
 * @param res
 */
const getAllTags = function (req, res) {
    let name = req.body.name;
    let page = req.body.page ? req.body.page : 1;
    let size = req.body.size ? req.body.size : 10;
    let param = {};
    if (name) {
        param.name = name;
    }
    let query2 = Tag.count(param).exec().catch(console.err);
    query2.then(function (total) {
        let query1 = Tag.find(param).skip((page - 1) * size).limit(size).exec().catch(console.error);
        query1.then(function (doc) {
            const data = {};
            if (doc.length !== 0) {
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