
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'FB Top Photo Finder' });
};