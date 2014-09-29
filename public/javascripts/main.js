var APP = window.APP || {};

(function(APP) {
  APP = _.extend(APP, {

    navState: new Backbone.Model({
      navOpen: false,
      navType: 'link', // link, toggle, radio
      navPosition: 'left',
      footerTakeover: true,
      footerAvailable: true
    }),

    fbState: new Backbone.Model({
      photos: false,
      created: false,
      sortBy: 'likes',
      loggedIn: false,
      infoPulled: false,
      photosPulled: false,
      albumsSelected: false
    }),

    init: function() {
      var Views = this.Views,
          viewConfig = function(selector) {
            return { el: selector, model: this.navState };
          }.bind(this),
          fbConfig = function(selector) {
            return { el: selector, model: this.fbState };
          }.bind(this);



      this.activeViews = {
        facebook: new Views.Facebook(fbConfig('#fb-loading')),
        nav: new Views.NavSidebar(viewConfig('#nav-container')),
        mainImages: new Views.MainImages(fbConfig('#main-images')),
        mainFooter: new Views.MainFooter(viewConfig('#mobile-footer')),
        mainContent: new Views.MainContent(viewConfig('#main-content'))
      };


     this.bindNavAction().stopLocalLinks();
      
      // this.navState.set('footerAvailable', false);
    },

    bindNavAction: function() {
      $('.nav-toggle').bind('click touchstart', function(e) {
        e.stopPropagation();

        this.navState.set('navOpen', !this.navState.get('navOpen'));
      }.bind(this));
      return this;
    }, 

    stopLocalLinks: function() {
      $('body').on('click touchstart', 'a[href^="/"]', function(e) {
        e.preventDefault();

        // do nothing, there's no navigation
      }.bind(this));
      return this;
    }


  });

  $(document).ready(function() {
    APP.init();
  });

})(APP);
