var APP = window.APP || {};

(function() {
	APP.Routers = APP.Routers || {};
	APP.Routers.Main = Backbone.Router.extend({
		routes: {
			'': 'home',
			'bio': 'about',
			'photos/:whichSet': 'photos',
			'photos/:whichSet/:id': 'photoById'
		},

		initialize: function(config) {
			this.model = config.model;
		},

		home: function() {
			this.setActiveView( 'homeView' );

			return this;

		},

		photos: function(whichSet) {
			this.model.set( 'imageSetToShow', whichSet);
			this.setActiveView( 'imagesOpen' );

			return this;
		},

		photoById: function(whichSet, id) {
			this.model.set( 'imageSetToShow', whichSet);
			this.setActiveView( 'imagesOpen' ).model.set( 'imageToShow', id);

			return this;
		},

		setActiveView: function(activePage) {
			_.each(this.model.attributes, function(open, page) {
				if (page !== 'imageSetToShow' && page !== 'imageToShow' ) {
					this.model.set(page, (activePage === page));
				}
			}.bind(this));

			return this;
		}

	});
})();
