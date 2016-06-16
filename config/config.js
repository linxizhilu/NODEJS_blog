var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'hello-blog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/hello-blog-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'hello-blog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/hello-blog-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'hello-blog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/hello-blog-production'
  }
};

module.exports = config[env];
