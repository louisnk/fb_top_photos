var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};
	APP.Views.MainImages = Backbone.View.extend({
		
		url: '/getImages',

		initialize: function(config) {
			// this.template = APP.templates.images,

			this.listen();

			return this;
		},

		listen: function() {
			
			this.model.on('change:imagesOpen', function(model, inUse) {
				if (inUse) { 
					this.fetchPictures(this.model.get('imageSetToShow'))
							.model.set('imagesLoaded', false);
				}
				else { this.hidePictures();	}
			}.bind(this));

			this.model.on('change:imageSetToShow', function(model, whichSet) {
				if (this.model.get( 'imagesOpen' )) {
					this.fetchPictures(whichSet).model.set('imagesLoaded', false);
				} else { this.hidePictures(); } 
			}.bind(this));

			this.model.on('change:imagesLoaded', function(model, loaded) {
				if (loaded) { this.renderTemplate().showPictures(); }
				else this.hidePictures();
			}.bind(this));

			return this;
		},

		orderPhotos: function(photos) {
			console.log(photos);
			console.log(APP.user.get('photos'));
			// photos = photos.order(function(a,b) {

			// })
		},

		fetchPictures: function(whichSet) {
			
			// TODO: get pics from FB

			return this;
		},

		renderTemplate: function() {
			this.view = this.template.render(this.pictures);

			return this;
		},

		showPictures: function() {

			this.$el.html(this.view)
					.removeClass('hidden')
					.addClass('shown');
			
			return this;
		},

		hidePictures: function() {

			this.$el.removeClass('shown')
					.addClass('hidden');

			return this;
		}

	})
})();