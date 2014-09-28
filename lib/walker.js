
exports.findAll = function(dir, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	var files	= options.toJSON ? {} : [];

	function checkStats(toRead, wait, list, done) {

	}



	function walk(directory, done) {

		fs.readdir(directory, function(err, list) {
			if (err) return done(err, 'Luke dirwalker thinks there is no such directory');
			var wait = list.length;
			// console.log(files);
			if (!wait) return done(null, true);

				list.forEach(function(file,i) {
					var toRead = path.join(directory,file);

					fs.stat(toRead, function(err, stat) {
						if (stat.isDirectory()) {

							if (options.toJSON) {
								setFolder(toRead);
							} 
							// console.log(files)
							walk(toRead, function(err, res) {

								if (!--wait) console.log(res);
							});

						} else {
							if (options.toJSON) {
								var tree = toRead.split(/[\/\\]/),
										parent = tree[tree.length - 2];
								if (parent === 'thumbs') {									
									var grandParent = tree[tree.length -3];
									files[grandParent][parent].push(toRead);

								} else if (files[parent] && 
													 files[parent].images instanceof Array) {

									files[parent].images.push(toRead);

								} else {
									// they're lowest level images (untouchables), 
									// and we don't want them in the JSON
								}

							}	else { files.push(toRead); }

							console.log(wait -1);
							if (!--wait) {
								done(null,true);
							}

						}
					});
				});


		});		
	}

	function setFolder(folder) {

		var slashes = '\\';
		if (process.env.SystemDrive === 'C\:') {
			slashes = '\\';
		} else { slashes = '/' }

		var directory = folder.slice(folder.lastIndexOf(slashes) + 1),
				origin 		= dir.slice(dir.lastIndexOf(slashes) + 1),
				parent 		= folder.slice(0,folder.lastIndexOf(slashes)).split(slashes);
				parent 		= parent[parent.length - 1];


		if (directory === origin) return true;
		
		else if (parent && parent !== origin) {
			files[parent] = files[parent] || {};
			files[parent][directory] = [];

			if (files[parent][directory]) return true;
			else return false;
		}
		else {
			files[directory] = files[directory] || { images: [] };
			if (files[directory]) return true;
			else return false;
		}
	}

	
	dir = path.normalize(dir);
	walk(dir, function(err, done) {
		if (err) {
			console.error(err);
			return callback(err, done);
		} else return callback(null, files);
	});
}








// var walk = function(dir, level, done) {
// 	var folders 	= [],
// 			files 		= options.toJSON ? {} : [];

// 			fs.readdir(dir, function(err, list) {
// 				if (err) { return done(err) }
// 				var wait = list.length;

// 				if (!wait && level < 11) { return done(null, files) }

// 				for (var i = 0; i < wait; i++) {
// 					var file = list[i],
// 							newPath = dir + s + file;

// 					fs.stat(newPath, function(err, stat) {

// 					})
// 				}
// 			})
// }
