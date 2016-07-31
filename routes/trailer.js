var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

router.get('/', function(req, res, next) {
  var getMovies = ["ted-2-2015", "ted-2-2015", "pitch-perfect-2-2015", "pitch-perfect-2-2015", "trainwreck-2015", "trainwreck-2015", "straight-outta-compton-2015", "straight-outta-compton-2015", "jurassic-world-2015", "jurassic-world-2015", "sword-of-vengeance-2015", "sword-of-vengeance-2015", "min-lilla-syster-2015", "min-lilla-syster-2015", "lost-river-2014", "lost-river-2014", "the-mechanic-2011", "the-mechanic-2011", "twilight-2008", "twilight-2008", "dope-2015", "dope-2015", "the-right-kind-of-wrong-2013", "the-right-kind-of-wrong-2013", "5-to-7-2014", "5-to-7-2014", "barely-lethal-2015", "barely-lethal-2015", "taken-3-2014", "taken-3-2014", "x-men-days-of-future-past-2014", "x-men-days-of-future-past-2014", "the-twilight-saga-breaking-dawn-part-2-2012", "the-twilight-saga-breaking-dawn-part-2-2012", "safe-2012", "safe-2012", "the-twilight-saga-new-moon-2009", "the-twilight-saga-new-moon-2009", "return-to-sender-2015", "return-to-sender-2015", "fifty-shades-of-grey-2015", "fifty-shades-of-grey-2015", "fathers-and-daughters-2015", "fathers-and-daughters-2015", "paul-blart-mall-cop-2-2015", "paul-blart-mall-cop-2-2015"];
  res.redirect('/trailer/'+ getMovies[Math.floor(Math.random()*getMovies.length)]);
});

router.get('/:movie_name', function(req, res, next) {
  var options = { title : "Viaplay" };
  options.header_menu_list = [];
  options.logo_url = "http://assets.viaplay.tv/frontend-2016072601/images/header-logo-large.png";
  options.footer_logo_url = "http://assets.viaplay.tv/frontend-2016072601/images/footer_logo_on_dark.png";
  options.user = {name : "John Doe"};
  options.viaplay = "";
  options.footer_menu_list = [];
  options.base_path = "https://content.viaplay.se/pc-se/film/";
  options.path = options.base_path + req.params.movie_name;
  options.footer_menu_list.push( { heading: "Viaplay", list: ["Serier", "Film", "Sports", "Rio 2016", "Children", "Store", "Try Viaplay"] } );
  options.footer_menu_list.push( { heading: "About US", list: ["PressJob", "Viaplay includes"], sub_item : {heading: "Viasat Customer", list: ["Viasat Includes"]} } );
  options.footer_menu_list.push( { heading: "Information", list: ["If Rio 2016", "Customer service", "Fix and Hints for the Rio 2016", "Our platforms", "System Requirements","Terms and Conditions","Privacy Policy","Cookies"] } );
  options.footer_menu_list.push( { heading: "Follow US", list: ["Facebook", "Twitter", "LinkedIn", "Instagram"] } );
  options.footer_menu_list.push( { heading: "TV", list: ["TV3", "TV10", "TV6", "Viasat Film"] } );

  request(options.path, function (error, response, body) {
    options.viaplay = JSON.parse(body);
    if (!!options.viaplay.responseCode) {

      options.product = options.viaplay._embedded['viaplay:blocks'][0]._embedded['viaplay:product'];
      options.content = options.product.content;
      options.content.genre = options.product._links['viaplay:genres'][0].title;
      options.content.flags = options.product.system.flags;
      options.header_menu_list = options.viaplay._links['viaplay:sections'];
      options.video_url = '//www.youtube.com/embed/ePbKGoIGAXY?autoplay=1';
      res.render('trailer', options);
    } else {
      res.render('error', {
        message: req.params.movie_name + " Not found",
        error: {status : 422}
      });
    }
  });
});

module.exports = router;
