
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
        text: 'Please log into facebook to see the ranking of your 25 most recent photos uploaded.',
        start: 'icomoon icon-lab',
        buttons: [
          { text: "Like", attribute: "like" },
          { text: "Comment", attribute: "comment" }
        ],
        flows: [
          { text: "Log in with Facebook", 
            icon: 'icomoon icon-facebook'
          },
          {
            text: "Wait for the magic",
            icon: 'icomoon icon-lightning'
          },
          {
            text: "Profit",
            icon: 'icomoon icon-user2'
          }
        ]
      }
   });
};