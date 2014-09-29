var APP = window.APP || {};

(function() {
  APP.User = Backbone.Model.extend({
    initialize: function(details) {
    },

    defaults: {
      id:   0,
      auth:   0,
      last_name:   "Smith",
      first_name:  "John",
      sortBy: "likes"
    }
  });

  APP.Users = Backbone.Collection.extend({
    initialize: function(user) {

      this.model = user;
      this.listen();
    },
    
    model: APP.User,

    listen: function() {

      APP.fbState.on('change:created', function(model, inUse) {
        if (inUse && this.length > 0 ) {
          this.getPhotos();
        } 
      }.bind(this));

      this.model.on('change:photos', function(model, inUse) {
        if (inUse.length > 0) { APP.fbState.set('photos', inUse); }
        else console.log(inUse);

      }.bind(this));

    },

    getPhotos: function() {
      if (FB) {
        FB.api('/' + this.model.get('id') + '/photos/uploaded', function(photos) {
          if (photos.data.length > 0) {
            this.model.set('photos', photos.data);            
          } else {

            // TODO: tell them they have no photos
          }
        }.bind(this));
        // this.model.set('photos', [ { likes: [1,2] }, {likes: [2,3,4] }, { likes: [1] } ])
      }
    }


  })
})();