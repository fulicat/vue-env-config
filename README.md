

> Easy to configure development environment for Vue CLI 3.

## Installation

### Node.js

`vue-env-config` is available on [npm](http://npmjs.org) or [yarn](https://yarnpkg.com).

    $ npm install vue-env-config --save-dev

    $ yarn add vue-env-config --dev

## Usage

### Primary

#### 1. add env.config.js file:

```js
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
```

#### 2. modify vue.config.js file like this:

```js
const ENV = require('./env.config')();

module.exports = {
	// options...
	publicPath: ENV.config.publicPath
}
```

#### 3. modify package.json file like this ( add command in scripts or manual execute ):

```js
  "dev-daily": "vue-cli-service serve --open --ENV_CONFIG=daily",
  "dev-prod": "vue-cli-service serve --open --ENV_CONFIG=production",
  "build-daily": "vue-cli-service build --ENV_CONFIG=daily",
  "build-prod": "vue-cli-service build --ENV_CONFIG=production",
```

## Note:
    variables will export to process.env.VUE_APP_[variable key]


#### arguments

```js
const ENV = require('./env.config')({
	config: './env.config.js',
	debug: false,
	log: false,
	dist: '../dist'
});
```



#### test

```js
    $ npm node test
    $ npm node test --ENV_CONFIG=development       (default)
    $ npm node test --ENV_CONFIG=daily
    $ npm node test --ENV_CONFIG=production
    ...
```




## License

(The MIT License)

Copyright (c) 2013 Jake Luer <jake@alogicalparadox.com> (http://alogicalparadox.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
