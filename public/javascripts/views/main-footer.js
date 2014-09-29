var APP = window.APP || {};

(function() {
  APP.Views = APP.Views || {};

  APP.Views.MainFooter = Backbone.View.extend({
    events: {
      'click'       : 'toggleTakeover',
      'touchstart'  : 'toggleTakeover'
    },

    initialize: function(config) {
      this.model.on('change:footerAvailable', function(model, available) {
        if (available) { this.show(); }
        else { this.hide(); }
      }.bind(this));
        
      this.model.on('change:footerTakeover', function(model, shouldTakeOver) {
        if (shouldTakeOver) { this.takeOverScreen(); }
        else { this.surrenderScreen(); }
      }.bind(this));

      if (this.model.get('footerAvailable')) {
        if (this.model.get('footerTakeover')) { this.takeOverScreen(); }
        else { this.surrenderScreen(); }
      } else {
        this.hide();
      }

      APP.fbState.on('change:loggedIn change:structured change:infoPulled change:rendered', 
        function(model, inUse) {
          this.checkState(model);
      }.bind(this));
    },

    checkState: function(model) {
      var stages = {
        'photos': 'user',
        'rendered': 'user',
        'infoPulled': 'wand',
        'loggedIn': 'facebook'
      }

      _.each(model.changed, function(colored, stage) {
        var active = stages[stage];

        if (colored) { $('.icon-' + active).addClass('active'); }
        else { $('.icon-' + active).removeClass('active'); }

        if (stage === 'rendered') {
          setTimeout(function() { this.toggleTakeover(); }.bind(this), 1000);
        }
      }.bind(this));

      return this;
    },

    toggleTakeover: function() {
      this.model.set('footerTakeover', !this.model.get('footerTakeover'));
    },

    takeOverScreen: function() {
      this.$el.animate({ 'top': '80px' });
      return this;
    },

    surrenderScreen: function() {
      this.$el.animate({ 'top':  '90%' });
      return this;
    },

    show: function() {
      this.model.set('footerTakeover', false);
      this.$el.animate({ 'top':  '90%' });
      return this;
    },

    hide: function () {
      this.model.set('footerTakeover', false);
      this.$el.animate({ 'top':  '100%' });
      return this;
    }
  });

})();
