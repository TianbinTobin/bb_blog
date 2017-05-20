/**
 * Created by Tianbin on 2017/5/20.
 */
module.exports = function (boolean, content) {
    const result = {};
    if(boolean) {
        result.code = 0;
        result.msg = 'success';
        result.result = {data: content};
    } else {
        result.code = -1;
        result.msg = content;
        result.result = {};
    }
    return result;
};