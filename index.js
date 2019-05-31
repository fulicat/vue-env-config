/*!
 * vue-env-config.js
 * (c) 2019 Jack.Chan <fulicat@qq.com>
 * Released under the MIT License.
 * @Author: Jack.Chan (fulicat@qq.com)
 * @Date:   2019-05-31 11:32:20
 * @Last Modified by:   Jack.Chan
 * @Last Modified time: 2019-05-31 13:45:05
 * @version v1.0.2
 */

/*!
 * Primary Exports
 */

var exports = module.exports = VUE_ENV_CONFIG;


/*
* Easy to configure development environment for Vue CLI 3
* 
* Usage:
* 1. modify vue.config.js file like this:
* 
* const ENV = require('./env.config')();
* 
* module.exports = {
* 	// options...
* 	publicPath: ENV.config.publicPath
* }
*
* 
* 2. modify package.json file like this ( add command in scripts or manual execute ):
* "dev-daily": "vue-cli-service serve --open --ENV_CONFIG=daily",
* "dev-prod": "vue-cli-service serve --open --ENV_CONFIG=production",
* "build-daily": "vue-cli-service build --ENV_CONFIG=daily",
* "build-prod": "vue-cli-service build --ENV_CONFIG=production",
*
* Note:
* variables will export to process.env.VUE_APP_[variable key]
* ============================================================================================================
*/
function VUE_ENV_CONFIG (options = {}) {
	options = Object.assign({}, {config: './env.config.js', debug: false, log: false, dist: './dist'}, options);
	let ENV_CONFIG_LIST = require(options.config);
	let argv = process.argv.slice(2, process.argv.length);
	let env = {ENV_CONFIG: 'development'};
	if (argv.length) {
		console.log('________________________________________________________________\n');
		env = {ENV_CONFIG: 'development'};
		argv.forEach((item, itemIndex) => {
			item = item.replace('--ENV_CONFIG', 'ENV_CONFIG');
			item = item.split('=');
			if (item[0]==='ENV_CONFIG') {
				if (options.debug) {
					console.log('\n=== >>> parsing command ...');
					console.log('...');
				}
				if (item[1]) {
					env[item[0]] = item[1];
					if (options.debug) {
						console.log('\n=== >>> found command ...\n');
						console.log('ENV_CONFIG:'+ item[1]);
					}
				}
			}
		});
		env.NODE_ENV = process.env.NODE_ENV;
	} else {
		console.error('\x1b[41m%s\x1b[0m%s\x1b[33m%s\x1b[0m', '', ' ', '\n=== >>> command not found ...\n');
	};
	if (env.ENV_CONFIG) {
		env.config = ENV_CONFIG_LIST[env.ENV_CONFIG];
		if (env.config instanceof Object) {
			if (options.debug) {
				console.log('\n=== >>> found config ...\n');
				console.log(env);
				console.log('\n=== >>> merging config ...\n');
			}
			process.env['ENV_CONFIG'] = process.env['VUE_APP_ENV_CONFIG'] = env.ENV_CONFIG;
			if (env.config.variables instanceof Object) {
				env.variables = env.config.variables;
				delete env.config.variables;
				Object.keys(env.variables).forEach( (key) => {
					process.env['VUE_APP_'+ key] = env.variables[key];
				});
				if (options.debug) {
					console.log('\n=== >>> merged');
					console.log('...');
				}
			}
			console.log('\n=== >>> starting ...');
			console.log('\n');
			console.log('\x1b[42m%s\x1b[0m%s\x1b[32m%s\x1b[0m', 'process.env.NODE_ENV:  ', ' ', process.env.NODE_ENV);
			console.log('\x1b[42m%s\x1b[0m%s\x1b[32m%s\x1b[0m', 'process.env.ENV_CONFIG:', ' ', process.env.ENV_CONFIG);
			console.log('\n');
			if (process.env.NODE_ENV!=='development' && options.log) {
				try {
					const fs = require('fs');
					let logContent = [];
					logContent.push('time: '+ (new Date()).toLocaleString('en-US', {hour12: false}));
					logContent.push('process.env.NODE_ENV: '+ process.env.NODE_ENV);
					logContent.push('process.env.ENV_CONFIG: '+ process.env.ENV_CONFIG);
					let logFile = options.dist +'/log.txt';
					fs.writeFileSync(logFile, logContent.join('\r\n'));
					console.log('\x1b[42m%s\x1b[0m%s\x1b[32m%s\x1b[0m', 'Log:', ' ', logFile);
				} catch (err) {
					console.log('\x1b[41m%s\x1b[0m%s\x1b[33m%s\x1b[0m', 'Error:', ' ', 'write log file failed');
					console.error(err);
				}
				console.log('\n');
			}
		}
		console.log('________________________________________________________________\n');
	} else {
		console.error('\x1b[41m%s\x1b[0m%s\x1b[33m%s\x1b[0m', '', ' ', '\n=== >>> config not found ...\n');
	}
	return env;
};

