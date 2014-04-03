var mongoose = require('mongoose')
  , async = require('async')
  , Prediction = mongoose.model('Prediction')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var prediction = new Prediction(req.body)
  prediction._id = "prediction_id_" + req.user.username
  prediction.predictor = req.user
  prediction.predictions = req.body.predictions
  prediction.save()
  res.jsonp(prediction)
}
 
exports.show = function(req, res){
  res.jsonp(req.prediction);
}
 
exports.prediction = function(req, res, next, id){
  var Prediction = mongoose.model('Prediction')
  Prediction.load(id, function (err, prediction) {
    if (err) return next(err)
    if (!prediction) return next(new Error('Failed to load prediction ' + id))
    req.prediction = prediction
    next()
  })
}
 
exports.all = function(req, res){
 Prediction.find().populate('predictor').exec(function(err, predictions) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(predictions);
   }
 });
}
 
exports.update = function(req, res){
  var prediction = req.prediction
  prediction = _.extend(prediction, req.body)
  prediction.save(function(err) {
    res.jsonp(prediction)
  })
}
 
exports.destroy = function(req, res){
  var prediction = req.prediction
  prediction.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}