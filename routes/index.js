
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', 
    { title: {
        title: 'facebook top photo rankings',
        icon: 'icon icon-menu'
      },
      fb: {
        title: 'Facebook Top Photo Rankings',
        text: 'Please log into facebook to see the ranking of your 25 most recently uploaded photos by:',
        start: 'icomoon icon-lab',
        flows: [
          { text: "Log in with Facebook", 
            icon: 'icomoon icon-facebook2 active'
          },
          {
            text: "Wait for the magic",
            icon: 'icomoon icon-wand'
          },
          {
            text: "Profit",
            icon: 'icomoon icon-user'
          }
        ]
      }
   });
};