
var async = require('async')

module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../app/controllers/users')
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)
  app.put('/users/:userId', auth.requiresLogin, users.update)
  
  app.param('userId', users.user)
  
  // Team Routes
  var teams = require('../app/controllers/teams')
  app.get('/teams', teams.all)
  app.get('/teams/:teamId', teams.show)

  app.param('teamId', teams.team)

  // Match Routes
  var matches = require('../app/controllers/matches')
  app.get('/matches', matches.all)
  app.get('/matches/:matchId', matches.show)

  app.param('matchId', matches.match)

  // Group Routes
  var stages = require('../app/controllers/stages')
  app.get('/groups', stages.groups)
  app.get('/groups/:groupId', stages.show)

  app.param('groupId', stages.stage)

  // Prediction Routes
  var predictions = require('../app/controllers/predictions')  
  app.post('/predictions', auth.requiresLogin, predictions.create)
  app.get('/predictions/:predictionId', predictions.show)
  app.put('/predictions/:predictionId', auth.requiresLogin, predictions.update)
  app.del('/predictions/:predictionId', auth.requiresLogin, predictions.destroy)
 
  app.param('predictionId', predictions.prediction)

  // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)
}