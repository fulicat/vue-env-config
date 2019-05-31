/*
* env.config.js
* @Author: Jack.Chan (971546@qq.com)
* @Date:   2019-05-31 11:41:33
* @Last Modified by:   Jack.Chan
* @Last Modified time: 2019-05-31 11:47:30
* @version v1.0
*/

module.exports = {
	development: {
		publicPath: '/',
		variables: {
			api_baseURL: '//daily.shebaotong.com/partners',
			api_timeout: 5000
		}
	},
	daily: {
		publicPath: '//cdn.hrwork.com/fulicat/sbt_partners_dashboard/daily/dist/',
		variables: {
			api_baseURL: '//daily.shebaotong.com/partners',
			api_timeout: 30000
		}
	},
	production: {
		publicPath: '//cdn.hrwork.com/fulicat/sbt_partners_dashboard/master/dist/',
		variables: {
			api_baseURL: '//www.shebaotong.com/partners',
			api_timeout: 30000
		}
	}
}