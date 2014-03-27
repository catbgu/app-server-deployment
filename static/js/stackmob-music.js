//Stackmob Auth
StackMob.init({
	publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
	apiVersion:       1
});
//MUSIC.HTML GET ACTIVE ARTISTS
var artist = StackMob.Model.extend({ schemaName: 'Artist' });
var artists = StackMob.Collection.extend({ model: artist }); 
var items = new artists();
var q = new StackMob.Collection.Query();
q.orderAsc('artist_name').equals('active', true);

items.query(q, {
  success: function(results) {
    var resultsAsJSON = results.toJSON();
    for(var i = 0; i < resultsAsJSON.length; i++) {
      $( "#grid" ).append(""+
			"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/" + resultsAsJSON[i]['artist_name'].replace(' ', '-').toLowerCase()  + "/artist.html\";return false;' class='four columns artist-btn'>" +
		    	"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/" + resultsAsJSON[i]['artist_name'].replace(/\ /g, '-').toLowerCase() + "/small.png'>" +
			    "<div class='artist-name'>" + resultsAsJSON[i]['artist_name'] + "</div>" +
		    "</a>");
    }
    var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
	if(!mobile){
		//Music.html page
		$(".artist-btn").removeClass("four columns artist-btn").addClass("centred").wrap("<li class='element'></li>").prepend("<img class='music-icon' src='http://inspiredapp.tv/img/icons/music-icon-small.png' />");
		$(".artist-name").wrap("<div class='video-info'></div>");
		$(".artist-name").wrapInner("<h5></h5>");
		
		//No footer in Desktop view
		$('.footer').css('display', 'none');
	    var tablet = navigator.userAgent.match(/iPad/i);		
	    if(tablet) {
			$('.footer').css('display', 'block');
		}
	}
  }
});

$(document).ready(function(){
	//MUSIC.HTML IMAGE SLIDER
	var featured = StackMob.Model.extend({ schemaName: 'Music_Video' });
	var featured_artists = StackMob.Collection.extend({ model: featured }); 
	var items2 = new featured_artists();
	var b = new StackMob.Collection.Query();
	b.orderAsc('video_title').equals('featured', 'true');
	items2.query(b, {
		success: function(results) {
		 	var resultsAsJSON = results.toJSON();
			var b = 1;
			var c = 1;
			var f = 1;

			for(var i = 0; i < resultsAsJSON.length; i++) {

				var firstartist = resultsAsJSON[i].artists.toString()
				//CHECKS IF COMMA(,) EXISTS IN THE STRING
				if(firstartist.indexOf(',') == -1) {
					firstartist = resultsAsJSON[i].artists.toString();
				} else {
					firstartist = firstartist.toString().substr(0, firstartist.indexOf(','))
				}

			 	$('.item').each(function(){
					$('.item' + b).attr('src', 'http://inspiredapp.tv/img/music/artists/' + firstartist.replace(/\ /g, '-').toLowerCase() + '/large.png');
					$('.item' + b).attr('onclick', 'location.reload();location.href="http://inspiredapp.tv/artists/' + firstartist.replace(/\ /g, '-').toLowerCase() + '/artist.html"');
			  	});
			  	b++;
			}

			for(var i = 0; i < resultsAsJSON.length; i++) {
				$('.band').each(function(){
					$('.band' + c).html('' + resultsAsJSON[i].artists + ' - ' + resultsAsJSON[i].video_title);
			  	});
			  	c++;
			}
			$(".featured-music-videos").css("height", $(".fx-container").height());
		}
	});
	
});


