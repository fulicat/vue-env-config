/*
* env.config.js
* @Author: Jack.Chan (971546@qq.com)
* @Date:   2019-05-31 11:41:33
* @Last Modified by:   Jack.Chan
* @Last Modified time: 2019-05-31 13:36:13
* @version v1.0.1
*/

module.exports = {
	development: {
		publicPath: '/',
		variables: {
			api_baseURL: '//daily.fulicat.com/api',
			api_timeout: 5000
		}
	},
	daily: {
		publicPath: '//cdn.fulicat.com/fulicat/dashboard/daily/dist/',
		variables: {
			api_baseURL: '//daily.fulicat.com/api',
			api_timeout: 30000
		}
	},
	production: {
		publicPath: '//cdn.fulicat.com/fulicat/dashboard/master/dist/',
		variables: {
			api_baseURL: '//www.fulicat.com/api',
			api_timeout: 30000
		}
	}
}