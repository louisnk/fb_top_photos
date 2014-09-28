var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};
	APP.Views.SingleImage = Backbone.View.extend({

		url: '/getImages',

		initialize: function(config) {
			this.listen();
			// this.template = APP.templates.single;
		},

		listen: function() {
			this.model.on( 'change:imageToShow', function(model, whichImage) {
				if (this.model.get( 'imagesOpen' )) {
					this.setImage(whichImage).fetchSingle();
				} else {
					this.model.set( 'imagesOpen', true)
				}
			}.bind(this));

			return this;
		},

		setImage: function(whichImage) {
			this.imageSet = this.model.get( 'imageSetToShow' );
			this.imageId = whichImage;

			return this;
		},

		fetchSingle: function() {

			$.ajax({
				url: this.url,
				data: {
					'pictureSet': this.imageSet, 
					'id': this.imageId
				},
				context: this,
				success: function(data, status) {
					this.picture = {image: data};
					this.renderTemplate().showImage();
				}
			});

			return this;
		},

		renderTemplate: function() {

			this.view = this.template.render(this.picture);

			return this;
		},

		showImage: function() {
			this.$el.html(this.view).removeClass('hidden').addClass('shown');

			return this;
		},

		hideImage: function() {
			this.$el.addClass('hidden').removeClass('shown');

			return this;
		}

	});
})();