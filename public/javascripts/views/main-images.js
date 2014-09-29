var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};
	APP.Views.MainImages = Backbone.View.extend({
		
		url: '/getImages',

		initialize: function(config) {
			this.template = APP.templates.images;
			this.listen().setDisabled();

			return this;
		},

		listen: function() {
			
			this.model.on('change:photos change:sortBy', function(model, inUse) {

				if (inUse) { 
					if (!model.changed.hasOwnProperty('sortBy')) {
						this.sortPhotos(inUse).renderPhotos( this.createPhotoObjects() );						
					} else if (model.changed.hasOwnProperty('sortBy')) { 
						this.sortPhotos().renderPhotos( this.createPhotoObjects() ).setDisabled(); 
					}
				}

			}.bind(this));

			this.$el.on('click touchStart', 'button', function(e) {
			
				this.model.set('sortBy', $(e.target).attr('data-sort'));					

			}.bind(this));

			return this;
		},

		sortPhotos: function(photos) {
		  var by = this.model.get('sortBy') || 'likes';

		  if (typeof photos === 'undefined') {
		  	photos = this.model.get('photos');
		  }

		  photos = photos.sort(function(a,b) {

		    a[by] 			= a[by] 		 || {};
		    a[by].data 	= a[by].data || [];
		    b[by] 			= b[by] 		 || {};
		    b[by].data 	= b[by].data || [];

		    return b[by].data.length - a[by].data.length;
			  
		  });

		  this.model.set( 'photos', photos );

		  return this;
		},

		createPhotoObjects: function() {

			function imgObject( photo , i ) {

				this.src = (i < 3) ? 
									 photo.images[4].source : 
									 photo.images[photo.images.length -1].source;

				this.alt = photo.name || "A photo from Facebook";
				this.num = i + 1;
				this.url = photo.link;
				this.ymd = photo.created_time;
				this.tag = photo.tags;
			}

			var toRender = { 
				images: {
					one: {},
					sec: [],
					rest: []
				} 
			};

			_.each(this.model.get( 'photos' ), function( photo, i ) {
				if (Object.keys(toRender.images.one).length < 1) {
					toRender.images.one = new imgObject( photo, i );
				} else if (Object.keys(toRender.images.sec).length <= 1) {
					toRender.images.sec.push(new imgObject( photo, i ));
				} else {
					toRender.images.rest.push(new imgObject( photo, i));
				}

			});

			this.model.set('structured', true);

			return toRender;
		},

		renderPhotos: function(data) {

		  $('#image-container').html(this.template.render(data));
		  this.model.set('rendered', true);

		  return this;
		},

		setDisabled: function() {

			var which = this.model.get('sortBy');

			$('.buttons button:not(.' + which + ')').removeClass('disabled');
			$('.buttons button.' + which).addClass('disabled');

			return this;
		}
	})
})();