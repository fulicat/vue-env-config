/*
* test.js
* @Author: Jack.Chan (971546@qq.com)
* @Date:   2019-05-31 11:41:33
* @Last Modified by:   Jack.Chan
* @Last Modified time: 2019-06-04 11:35:10
* @version v1.1
*/


var ENV = require('./index')({
	config: '@/env.config.js',
	debug: true,
	log: true, // for dist
	dist: '@/dist'
});

console.log('TEST RESULT:\n');
console.log(ENV);