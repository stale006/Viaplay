
var viaplayApi = {
  url : "https://content.viaplay.se/pc-se/film/titanic-1997",
  options : {},
  fetchData : function(){
    $.getJSON( this.url, {})
    .done(function( data ) {
      viaplayApi.options = data;
      viaplayApi.buildContent();
    });
  },
  buildContent : function() {
    console.log(this.options);
    var content = {};
    try {
      var product = this.options._embedded['viaplay:blocks'][0]._embedded['viaplay:product'],
        content = product.content;

      content.genre = product._links['viaplay:genres'][0].title;
    } catch (e) {
      console.log("Error While Parsing Api",e)
    } finally {

      $('.previewImage img').attr('src', content.images.packshot.url);
      $('h1.title').text(content.title);
      $('.genre').text(content.genre);
      $('.time').text(content.duration.readable);
      $('.year').text(content.production.year);
      $('.rating').text(content.imdb.rating);
      $('.votes').text(content.imdb.votes);

      $('.synopsis').text(content.synopsis);
      $('.directors').text(content.people.directors);
      $('.actors').text(content.people.actors);
      $('.country').text(content.production.country);
      $('.parentalRating').text(content.parentalRating);

      // content.imdb.id;

    }

  }
};

$(document).ready(function(){

  $('.search-box button').click(function(event){
    var $this = $(this),
      $parent = $this.closest('.search-box'),
      $input = $parent.find('input.form-control'),
      is_visible = $input.width() > 0,
      animate_options = { "width": is_visible ? "0px" : "200px", "padding": is_visible ? "0px" : "6px 12px" };

    //event.preventDefault();
    console.log('a',animate_options, $input.width())
    $input.animate(animate_options, "slow" );
  });

  var image_array = $('[data-images]').data('images');
  var handle = setInterval(function(){
    var random = image_array[Math.floor(Math.random()*image_array.length)];
    $('[data-images]').attr('src',random )
    //code goes here that will be run every 5 seconds.
  }, 3000);

  $('.previewImage .icon').click(function() {
    var $this = $(this),
      $parent = $this.closest('.previewImage'),
      $video = $parent.parent().find('.videoContainer'),
      $iframe = $video.find('iframe');

    clearInterval(handle);
    $parent.fadeOut('slow',function(){
      $iframe.attr('src', $this.attr('data-url'));
      $video.fadeIn('slow');
    });


  });


  //

//  viaplayApi.fetchData();

});
