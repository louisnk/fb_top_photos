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
      sortBy: "comments"
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
        if (inUse && this.length > 0) {
          this.getPhotos();
        } 
      }.bind(this));

      this.model.on('change:photos', function(model, inUse) {
        console.log(model);
        if (inUse.length > 0) { this.sortPhotos(inUse); }
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
      }
    },

    sortPhotos: function(photos) {
      var by = this.model.get('sortBy');

      photos = photos.sort(function(a,b) {

        a[by] = a[by] || {};
        a[by].data = a[by].data || [];

        b[by] = b[by] || {};
        b[by].data = b[by].data || [];
        
        return a[by].data.length < b[by].data.length;
      });

      this.photos = photos;

      return this;
    },

    renderPhotos: function() {
      console.log(this.photos);



      return this;
    },


  })
})();