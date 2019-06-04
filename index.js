/*!
 * vue-env-config.js
 * (c) 2019 Jack.Chan <fulicat@qq.com>
 * Released under the MIT License.
 * @Author: Jack.Chan (fulicat@qq.com)
 * @Date:   2019-05-31 11:32:20
 * @Last Modified by:   Jack.Chan
 * @Last Modified time: 2019-06-04 11:39:00
 * @version v1.0.7
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
* const ENV = require('vue-env-config')();
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
	options = Object.assign({}, {config: '@/env.config.js', debug: false, log: false, dist: '@/dist'}, options);

	const fs = require('fs');
	const path = require('path');
	const run_path = path.resolve(__dirname);
	const work_path = process.cwd();
	// const work_path = path.resolve('./');
	
	let file_config = options.config;
	if (file_config.substr(0, 1)==='~') {
		file_config = run_path + file_config.substr(1);
	}
	if (file_config.substr(0, 1)==='@') {
		file_config = work_path + file_config.substr(1);
	}
	file_config = path.resolve(file_config);


	let file_log = '';
	if (process.env.NODE_ENV!=='development' && options.log) {
		file_log = options.dist;
		if (file_log.substr(0, 1)==='~') {
			file_log = file_log.replace('@', run_path);
		}
		if (file_log.substr(0, 1)==='@') {
			file_log = file_log.replace('@', work_path);
		}
		file_log = path.resolve(file_log +'/log.txt');
	}

	if (options.debug) {
		console.log('\n');
		console.log('    run_path : '+ run_path);
		console.log('   work_path : '+ work_path);
		console.log(' file_config : '+ file_config);
		if (file_log) {
			console.log('    file_log : '+ file_log);
		}
		console.log('\n');
	};

	if (!fs.existsSync(file_config)) {
		console.log('\n\x1b[41m%s\x1b[0m%s\x1b[33m%s\x1b[0m', 'Error:', ' ', 'env config file not found.\n');
		process.exit(0);
	} else {
		let ENV_CONFIG_LIST = require(file_config);
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
			console.log('\x1b[41m%s\x1b[0m%s\x1b[33m%s\x1b[0m', '', ' ', '\n=== >>> command not found ...\n');
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
				if (file_log) {
					try {
						process.on('exit', function() {
							let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
							let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().replace(/T/, ' ').replace(/\..+/, '')
							let logContent = [];
							logContent.push('time: '+ localISOTime);
							logContent.push('process.env.NODE_ENV: '+ process.env.NODE_ENV);
							logContent.push('process.env.ENV_CONFIG: '+ process.env.ENV_CONFIG);
							let file_log_path = path.dirname(file_log);
							fs.mkdirSync(file_log_path, { recursive: true });
							fs.writeFileSync(file_log, logContent.join('\r\n'));
							console.log('\x1b[42m%s\x1b[0m%s\x1b[32m%s\x1b[0m', 'Log:', ' ', file_log);
						})
					} catch (err) {
						console.log('\x1b[41m%s\x1b[0m%s\x1b[33m%s\x1b[0m', 'Error:', ' ', 'write log file failed');
						console.log(err);
					}
					console.log('\n');
				}
			}
			console.log('________________________________________________________________\n');
		} else {
			console.log('\x1b[41m%s\x1b[0m%s\x1b[33m%s\x1b[0m', '', ' ', '\n=== >>> config not found ...\n');
		}
		return env;
	}
};

