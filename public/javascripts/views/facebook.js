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


      this.$el.on('click touchStart', 'i', function(e) {
        e.stopPropagation();

        if (!this.model.get('loggedIn')) {

          this.tryLogin(function(response) {
            if (response.status === 'connected') {
              this.handleLogin();              
            } else {
              // they must not want to be logged in?
            }
          }.bind(this));;
        }
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
          xfbml      : true,
          cookie     : false,
          version    : 'v2.1',
          appId      : '571044009690564'
        });

        return callback();       
      }      
    },

    handleLogin: function() {

      this.checkLogin(function(loggedIn) {
        if (loggedIn) {
          
          APP.navState.set('footerTakeover', false);

          this.login = loggedIn;
          this.model.set('loggedIn', true);

        } else {
          this.askForLogin();
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
      APP.navState.set('footerTakeover', true);
      $('.icon-facebook').addClass('requested');

      return this;
    },

    tryLogin: function(callback) {
      if (FB) {
        FB.login(function(response) {
          if (response.status === 'connected') { 
            return callback(response);
          }
          else { 
            return callback(false);
          }
        }, { scope: 'public_profile,user_photos' } );
      }
    },

    getUser: function() {

      FB.api('/me', function(response) { 
        if (response.id && !response.error) {
          response.auth = this.login.authResponse.accessToken;
        } 

        this.userData = response;
        this.model.set('infoPulled', true);

      }.bind(this)); 

    },

    setUser: function() {
      var user = new APP.User(this.userData);

      APP.user = APP.user || new APP.Users(user);

      delete this.userData;

      if (APP.user) { this.model.set('created', true); } 
      else { this.model.set('created', false); }

      return this;

    }


  });
})();