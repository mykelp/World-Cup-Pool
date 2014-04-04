
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/wcp-dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'WorldCupPool - Development'
    }
  },
  test: {
    db: 'mongodb://localhost/wcp-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'WorldCupPool - Test'
    }
  },
  production: {
    db: 'mongodb://wcpadmin:wcp2014!@oceanic.mongohq.com:10030/app23706039',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'WorldCupPool - Production'
    }
  }
}
