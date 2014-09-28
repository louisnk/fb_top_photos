var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};

	APP.Views.WelcomeContent = Backbone.View.extend({
		initialize: function(config) {
			this.model.on('change:homeView', function(model, isActive) {
				if (isActive) { this.showContent(); }
				else { this.hideContent(); }
			}.bind(this))
		},

		showContent: function() {
			// TODO show home template

		},

		hideContent: function() {
			// TODO hide home infos
			
		}
	})
})();