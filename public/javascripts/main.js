var APP = window.APP || {};

(function(APP) {
  APP = _.extend(APP, {

    navState: new Backbone.Model({
      navOpen: false,
      navType: 'link', // link, toggle, radio
      navPosition: 'left',
      footerAvailable: true,
      footerTakeover: true,
      mainBg: 'url(/images/waterbg.jpg)'
    }),

    pageState: new Backbone.Model({
      homeView: true,
      imagesOpen: false,
      imageToShow: '000',
      imagesLoaded: false,
      imageSetToShow: false
    }),

    userState: new Backbone.Model({
      set: false,
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
          pageConfig = function(selector) {
            return { el: selector, model: this.pageState };
          }.bind(this),
          userConfig = function(selector) {
            return { el: selector, model: this.userState };
          }.bind(this);

      this.activeViews = {
        nav: new Views.NavSidebar(viewConfig('#nav-container')),
        mainContent: new Views.MainContent(viewConfig('#main-content')),
        mainHeader: new Views.MainHeader(viewConfig('#mobile-header')),
        mainFooter: new Views.MainFooter(viewConfig('#mobile-footer'))
      };

      this.availableViews = {
        // home: new Views.WelcomeContent(pageConfig('#home-content')),
        facebook: new Views.Facebook(userConfig('#image-scroller')),
        images: new Views.MainImageView(pageConfig('#image-scroller')),
        singleImage: new Views.SingleImage(pageConfig('#image-scroller'))
      };

      this.mainRouter = new APP.Routers.Main({model: this.pageState});
      // Backbone.history = Backbone.history || new Backbone.history(); 
      Backbone.history.start({pushState: true});

      this.bindNavAction().stopLocalLinks().checkEntryPoint();
      
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

        this.mainRouter.navigate(
          $(e.target).parents('a').attr('href'), {
           trigger: true 
         });
      }.bind(this));
      return this;
    },

    checkEntryPoint: function() {
      if (window.location.pathname !== '/') {
        this.mainRouter.navigate(window.location.pathname, { trigger: true });
      }

      return this;
    }
    

  });

  $(document).ready(function() {
    APP.init();
  });

})(APP);
