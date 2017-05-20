/**
 * Created by Tianbin on 2017/5/20.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    avatar: String,
    createTime: Date
}, {versionKey: false});

module.exports = mongoose.model('user', userSchema);