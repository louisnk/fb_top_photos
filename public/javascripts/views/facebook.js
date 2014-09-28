var APP = window.APP || {};

(function() {
  APP.Views = APP.Views || {};
  APP.Views.Facebook = Backbone.View.extend({

    initialize: function(config) {
      this.model = config.model;

      this.listen().connectToFB(function() { 
        this.handleLogin();
      }.bind(this));

    }, 

    listen: function() {
      this.model.on('change:loggedIn', function(model, inUse) {
        if (inUse) { this.getUser(); }
        else {
          // thanks for visiting
        }
      }.bind(this));

      this.model.on('change:infoPulled', function(model, pulled) {
        if (pulled) { this.setUser(); }
      }.bind(this));

      this.model.on('change:set', function(model, set) {
        if (set) { console.log('info set'); }
      }.bind(this));

      return this;
    },

    connectToFB: function(callback) { 

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      window.fbAsyncInit = function() {
        FB.init({
          appId      : '571044009690564',
          xfbml      : true,
          version    : 'v2.1'
        });

        return callback();       
      }      
    },

    handleLogin: function() {

      this.checkLogin(function(loggedIn) {
        if (loggedIn) {

          this.login = loggedIn;
          this.model.set('loggedIn', true);

        } else {
          
          this.askForLogin(function(loggedIn) { 
            if (loggedIn.status === 'connected') { 
              this.login = loggedIn;
              this.model.set('loggedIn', true);
            }
          }.bind(this));

        }
      }.bind(this));

    },

    checkLogin: function(callback) {

      if (FB) {
        FB.getLoginStatus(function(response) {
          
          if (response.status === 'connected') {
            return callback(response);
          } else {
            return callback(false);
          }

        }.bind(this));
        
      } else {
        // Something's wrong
      }
    },

    askForLogin: function(callback) {

      if (FB) {

        FB.login(function(response) {
          console.log(response);
          if (response.status === 'connected') { return callback(response); }
          else { 
            return callback(false);
          }
        }, { scope: 'public_profile,user_photos' } );
      }
    },

    getUser: function() {

      FB.api('/me', function(data) { 
        if (data.id) {
          data.auth = this.login.authResponse.accessToken;
        } 

        this.userData = data;
        this.model.set('infoPulled', true);

      }.bind(this)); 

    },

    setUser: function() {
      console.log(this.userData);

      APP.user = new APP.User(this.userData);
      if (APP.user) { this.model.set('set', true); } 
      else { this.model.set('set', false); }

      console.log(APP.user);

      return this;

    },

    getAlbums: function() {
      // TODO
      if (FB) {

      }
    },


  });
})();