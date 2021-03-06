
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
        text: 'Please log in with facebook to see the ranking of your 25 most recently uploaded photos by:',
        start: 'icon icon-menu',
        flows: [
          { text: "Log in", 
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