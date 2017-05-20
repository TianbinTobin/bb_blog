/**
 * Created by Tianbin on 2017/5/20.
 */
module.exports = {
    app: {
        port: process.env.PORT || 8889,
        baseApi: '/api'
    },
    mongodb: {
        url: 'mongodb://localhost:27017/bb_blog'
    },
    jwt: {
        secret: 'Tianbin' //默认
    },
    mongodbSecret: { //mongodb用户和密码
        user: '',
        pass: ''
    },
    admin: {  //后台初始化的用户名密码
        user: 'admin',
        pwd: '123456'
    }
};