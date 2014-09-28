var APP = window.APP || {};

(function() {
  APP.User = Backbone.Model.extend({
    initialize: function(details) {
      this.setDetails(details);
    },

    defaults: {
      id:     0,
      auth:   0,
      last:   "Test2",
      first:  "Test"
    },

    setDetails: function(user) {
      this.id     = user.id;
      this.auth   = user.auth;
      this.last   = user.last_name;
      this.first  = user.first_name;

      return this;
    },

    getDetails: function(user) {

    }
  })
})();