//Stackmob Auth
StackMob.init({
  publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
  apiVersion:       1
});
//Creates Artist Music Videos Dynamicly
var artist_name = window.location.pathname.split('/');
var artist1 = artist_name[2].replace(/\-/g, ' ');
var artist = artist1.replace(/\b./g, function(m){ return m.toUpperCase(); });
var feat_artist = artist;
var video = StackMob.Model.extend({ schemaName: 'Music_Video' });
var videos = StackMob.Collection.extend({ model: video }); 
var items = new videos();
var q = new StackMob.Collection.Query();
q.orderAsc('video_title').equals('artists', artist);
items.query(q, {
  success: function(results) {
    $(".artist-page-band span").text(artist);
    var resultsAsJSON = results.toJSON();
    console.debug(resultsAsJSON[0].artists[1]);
    if(resultsAsJSON[0].artists[0] != artist) {
      // alert(' not equal');
      feat_artist = resultsAsJSON[0].artists[0];
    }
    document.title = "Inpired | " + artist + " - Music Video";
    $("#artist_cover_image").attr('src', 'http://inspiredapp.tv/img/music/artists/' + artist.replace(/\ /g, '-').toLowerCase() + '/large.png');
    for(var i = 0; i < resultsAsJSON.length; i++) {
      
      if(resultsAsJSON[i].video_title.indexOf("'") !== -1)
      {
        resultsAsJSON[i].video_title = resultsAsJSON[i].video_title.replace(/'/g, "&#39;");
      }

      $( "#grid" ).append(""+
          "<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/" +  feat_artist.replace(/\ /g, '-').toLowerCase() + "/" + resultsAsJSON[i].video_title + ".html\"' class='four columns artist-video-btn'>" +
            "<img class='video-img' src='http://inspiredapp.tv/img/music/artists/" + feat_artist.replace(/\ /g, '-').toLowerCase() + "/" + resultsAsJSON[i].video_title + ".png' />" +
            "<div class='video-info'>" +
              "<div class='video-title'>" +
                "<h5>" + resultsAsJSON[i].video_title + "</h5>" +
              "</div>" +
              // "<div class='artist-name'>" + resultsAsJSON[i].artists + "</div>" +
            "</div>" +
          "</a>");
    }

    var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
    if(!mobile){
      //Artist.html page
      $(".artist-video-btn").removeClass("four columns artist-video-btn").addClass("centred").wrap("<li class='element'></li>").prepend("<img class='shop-icon' src='http://inspiredapp.tv/img/icons/shop-icon-small.png' style='width: 55px; height: 55px;' />");
      $(".video-title").removeClass("video-title").addClass("artist-name");
	  
	  //No footer in Desktop view
	  $('.footer').css('display', 'none');
	  var tablet = navigator.userAgent.match(/iPad/i);		
	  if(tablet) {
		$('.footer').css('display', 'block');
	  }
    }
  }
});

//Artist Screen Add/Remove Follows
var artist_name = window.location.pathname.split('/');
var user = StackMob.getLoggedInUser();
var artist1 = artist_name[2].replace(/\-/g, ' ');
var artist = artist1.replace(/\b./g, function(m){ return m.toUpperCase(); });
var Follow = StackMob.Model.extend({ schemaName: 'Follows' });  
var Follows = StackMob.Collection.extend({ model: Follow });
var fol = new Follows();
var f = new StackMob.Collection.Query();
f.orderAsc('artist_name').equals('username', StackMob.getLoggedInUser()).equals('artist_name', artist);
fol.query(f, {
  success: function(results) {
    var resultsAsJSON = results.toJSON();
    for(var i = 0; i < resultsAsJSON.length; i++) {
      if (i >= 0) {
        $(".follow-btn").attr('class', 'follow-btn selected');
      } else {
        $(".follow-btn").attr('class', 'follow-btn');
      }
     }
  }
});

if(!StackMob.isLoggedIn()){
    $(".follow-btn").live('click',function(){
      //NEED TO BE EDITED.
      alert("not logged in!");
      prompt_login();
    });
} else {
  $(".follow-btn").live('click',function(){
    if($(".follow-btn").hasClass('selected')) {
    fol.destroyAll(f, {
      success: function(results) {
        $(".follow-btn").removeClass('selected');
      }
    });
  } else {
      var myFollow = new Follow({ artist_name: artist, cover_image: 'large.png', username: user});
      myFollow.create({
        success: function(model) {
          //console.debug('bookmark created');
          $(".follow-btn").addClass('selected');
        },
        error: function(model, response) {
          //console.debug(response);
        }
      });
    }
  });
}