var fs = require('fs');
var path = require('path');
var s = process.platform == 'win32' ? '\\' : '/';

module.exports = {
  sendJSON: function(res, data) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.end(data);
  },
  processImages: function(imageArray, pictureSet, subset) {
    subset = subset || '.';
    return {
      files: [],
      pushFiles: function() {
        imageArray.forEach(function(file,i) {
          this.files.push( module.exports.makeObj(file, pictureSet, subset) );
        }.bind(this));

        return this;     
      }
    }.pushFiles().files;
  },
  makeObj: function(file, pictureSet, subset) {
    return {
      src: path.join('/', 'images', pictureSet, subset, file).replace(/[\\]/g, '/'),
      description: 'A picture from the ' + pictureSet,
      id: this.generateHash(file) + pictureSet,
      set: pictureSet
    }
  },
  generateHash: function(file) {
    if (file.match('_')) {
      return parseInt(file.split('_')[1].slice(0,-4));
    } else {
      for (var i = 0; i < file.length; i++) {
        var n = file.charAt(i);
        if (typeof n === 'number') {
          return this.hash = this.hash.concat(n);
        }
      }
    }
    // return parseInt(Math.random() * 10e8);
  },

  // takes array of paths, makes JSON
  makeImagesJSON: function(files, origin) {
    return {
      num: files.length,
      tree: {},
      makeThe: function() {
        var setNode = function(filePath) {
          var dir = filePath.split(s)[0],
              file = filePath.split(s)[1];

          if (dir !== origin) {
            if (!this.tree[dir] && !file.match(/[\\\/]/)) {

              this.tree[dir] = { images: [file] };

            } else if (!file.match(/[\\\/]/) && !file.match('thumbs')) {
              this.tree[dir].images.push(file);
            } 
            else if (file.match('thumbs')) {
              var filename = filePath.split(s)[2];
              if (!this.tree[dir].thumbs) {
                this.tree[dir].thumbs = [filename];
              } else {
                this.tree[dir].thumbs.push(filename);
              }
            }
          } 
        }.bind(this);

        for (var i = 0; i < this.num; i++) {
          var file = files[i].split('images' + s)[1];
          if (file.match(/[\/\\]/)) {
            setNode(file);
          }
        }
        return this;
      }
    }.makeThe().tree;
  }    
} 
  