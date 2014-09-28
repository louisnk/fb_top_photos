var utils = require('../lib/utils');
var s = process.platform === 'win32' ? '\\' : '/';


describe('Utils', function() {
  it('creates hash', function() {
    is(utils.generateHash('a/b/c/abc_123.jpg'), 123);
  });

  it('makes a model for image data', function() {
    var file = 'abc_123.png', 
        picset = 'day',
        subset = '.';

    var testObj = utils.makeObj(file, picset, subset);
    is(typeof testObj, 'object');
    is(testObj.src, '/images/day/abc_123.png');
    is(testObj.description, 'A picture from the day');
    is(testObj.id, '123day');
    is(testObj.set, 'day');
  });

  it('Properly processes image arrays into Objects', function() {
    var imgArray = [ 'DSC_8951.JPG', 'DSC_9002.JPG' ],
        set = 'night',
        subset = 'thumbs',

        imgObjects = utils.processImages(imgArray, set, subset);

        is(imgObjects instanceof Array, true);
        is(typeof imgObjects[0], 'object');
        
  });

  it('Makes JSON of images array', function() {
    var imgArray, origin, imgJSON;
    if (s === '\\') {
      imgArray = ['C:\\web\\phlog\\public\\images\\day\\DSC_2015.JPG',
                  'C:\\web\\phlog\\public\\images\\day\\thumbs\\DSC_2015.JPG',
                  'C:\\web\\phlog\\public\\images\\night\\DSC_8951.JPG',
                  'C:\\web\\phlog\\public\\images\\night\\thumbs\\DSC_8951.JPG' ];

      origin = "C:\\web\\phlog\\public\\images";
    } else {
      imgArray = ['/home/louis/Desktop/web/phlog_easy/public/images/day/dsc_1.jpg',
                  '/home/louis/Desktop/web/phlog_easy/public/images/day/thumbs/dsc_1.jpg',
                  '/home/louis/Desktop/web/phlog_easy/public/images/night/dsc_1.png',
                  '/home/louis/Desktop/web/phlog_easy/public/images/night/thumbs/dsc_1.png' ];
      origin = "/home/louis/Desktop/web/phlog_easy/public/images";
    }

    imgJSON = utils.makeImagesJSON(imgArray, origin);

    is(typeof imgJSON, 'object')
    is(typeof  imgJSON.day, 'object');
    is(imgJSON.day.images.length, 1);
    is(Array.isArray(imgJSON.day.images), true);
    is(imgJSON.day.thumbs.length, 1);
  });


});