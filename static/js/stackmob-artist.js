//Stackmob Auth
StackMob.init({
  publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
  apiVersion:       1
});
$(document).ready(function() {
	$("a.back-btn").on('click',function(){
	  window.location = "http://inspiredapp.tv/app/templates/music.html";    
	});
	$("a.name").on('click',function(){
	window.location = "http://inspiredapp.tv/app/templates/music.html";    
	});	


/* Top-bar Settings dropdown, and panels */  
    var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
	var tablet = navigator.userAgent.match(/iPad/i);
    if(!mobile && !tablet){
		/* -- Adding the settings dropdown to top right -- */
	//	$('.top-bar').prepend('<a name="dropdown-btn" class="btn with-icon white-top" style="width: 175px;text-align:center;"><div class="divider"></div><span class></span></a>'); 

		/* -- Adding the 'Music Videos/New Releases' panel to the left -- */
	//	$('.top-bar').append('<div class="panel-container"><ul name="artist-videos" class="artist-page artist-videos-panel"><h5>New Releases</h5><hr /></ul></div>');
		
		/* -- Need to dynamically insert other artist music videos: No more than 4 videos, b/c of more videos button -- */
		$('.artist-videos-panel').append("<li class='drop-item'>"+
		"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/antonia/Hurricane (English version).html\"'>" +
			"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/antonia/Hurricane (English version).png'>" +
			"<div>Hurricane (English version)</div>" +
		"</a>"+
		"</li>"
		);
		$('.artist-videos-panel').append("<li class='drop-item'>"+
		"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/antonia/Hurricane (English version).html\"'>" +
			"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/antonia/Hurricane (English version).png'>" +
			"<div>Hurricane (English version)</div>" +
		"</a>"+
		"</li>"
		);
		
		$('.artist-videos-panel').append("<li class='drop-item'>"+
		"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/antonia/Hurricane (English version).html\"'>" +
			"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/antonia/Hurricane (English version).png'>" +
			"<div>Hurricane (English version)</div>" +
		"</a>"+
		"</li>"
		);
		
		$('.artist-videos-panel').append("<li class='drop-item'>"+
		"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/antonia/Hurricane (English version).html\"'>" +
			"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/antonia/Hurricane (English version).png'>" +
			"<div>Hurricane (English version)</div>" +
		"</a>"+
		"</li>"
		);
		
		/* -- The last element in the list (dynamically insert current artist name); always the more artist videos button -- */
		$('.artist-videos-panel').children().last().after('<li class="drop-item" style="padding-top:20px;"><a href="http://inspiredapp.tv/artists/antonia/artist.html">More music videos...<a/></li>');
		
		/* -- Adding the 'similar artists/Who's Trending' panel to the left -- */
		$('.panel-container').append("<ul name='similar-aritsts' class='artist-page similar-artists-panel'><h5>Who's Trending</h5><hr /></ul>");
		
		/* -- Need to dynamically insert the artists pages and photos here: No more than 4 artists b/c "more artists" button is there.-- */
		$('.similar-artists-panel').append("<li class='drop-item'>"+
		"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/lily-allen/artist.html\"'>" +
			"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/lily-allen/small.png'>" +
			"<div>Lily Allen</div>" +
		"</a>"+
		"</li>"
		);
		$('.similar-artists-panel').append("<li class='drop-item'>"+
		"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/kylie-minogue/artist.html\"'>" +
			"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/kylie-minogue/small.png'>" +
			"<div>Kylie Minogue</div>" +
		"</a>"+
		"</li>"
		);
		$('.similar-artists-panel').append("<li class='drop-item'>"+
		"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/kacey-musgraves/artist.html\"'>" +
			"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/kacey-musgraves/small.png'>" +
			"<div>Kacey Musgraves</div>" +
		"</a>"+
		"</li>"
		);
		$('.similar-artists-panel').append("<li class='drop-item'>"+
		"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/jennifer-hudson/artist.html\"'>" +
			"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/jennifer-hudson/small.png'>" +
			"<div>Jennifer Hudson</div>" +
		"</a>"+
		"</li>"
		);
		
		/* -- The last element in the list; always the more artists button -- */
		$('.similar-artists-panel').children().last().after('<li class="drop-item" style="padding-top:20px;"><a href="http://inspiredapp.tv/app/templates/music.html">More artists...<a/></li>');
		
		/* -- Dynamically substitute for user email -- */
		var getuser = StackMob.getLoggedInUser();
		if (StackMob.getLoggedInUser() == null) {
			getuser = "Guest";
		}
		$('.btn span').html(getuser);
		
		$('.top-bar').after('<img src="/app/static/img/dropdown.png" class="drop-img"/><ul class="dropdown-list"></ul>');
		$('.dropdown-list').append('<li id="settings-tab" class="drop-item">Settings</li>');
		$('.dropdown-list').append('<li id="bookmark-tab" class="drop-item">Bookmarks</li>');
		$('.dropdown-list').append('<li id="following-tab" class="drop-item">Following</li>');
		$('.dropdown-list').append('<hr>');
		$('.dropdown-list').append('<li id="logout-tab" class="drop-item">Log Out</li>');
		
		/* This is the dropdown for Bookmarks -height is dynamic */
		$('.dropdown-list').after('<ul class="bookmark-list"></ul>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item1</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item2</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item3</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item4</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item5</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item6</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item7</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item8</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item9</li>');
		$('.bookmark-list').append('<li class="drop-item">Bookmark Item10</li>');
		
		/* This is the dropdown for Following -height is dynamic */
		$('.dropdown-list').after('<ul class="following-list"></ul>');
		$('.following-list').append('<li class="drop-item">Following Item1</li>');
		$('.following-list').append('<li class="drop-item">Following Item2</li>');
		$('.following-list').append('<li class="drop-item">Following Item3</li>');
		$('.following-list').append('<li class="drop-item">Following Item4</li>');
		
		
		/* Same panel-container code as below, but for Firefox */
		if (navigator.userAgent.search("Firefox") >= 0) {
			var halfWidth = $('.page-container').width()/2;
		
			var fullWidth = $('.page-container').width();
			
			var currMarg = parseInt($('.panel-container').css('margin-right'));
		
			$('.panel-container').css('margin-right', currMarg+fullWidth+halfWidth+20+'px');
			$('.panel-container').css('margin-top', '10px');
		} else {
		/* Moving the panel-container (containing Music Videos, and Similar Artists) over to the left of YouTube video */
			var halfPanelWidth = $('.panel-container').width()/2;
			
			var halfWidth = $('.page-container').width()/2 + halfPanelWidth + 10;
			
			var currMarg = parseInt($('.panel-container').css('margin-right'));
			
			$('.panel-container').css('margin-right', currMarg+halfWidth+'px');
			$('.panel-container').css('margin-top', '10px');
		}
		
		// Navigation + Sliding Animations
		$('#bookmark-tab').live('click', function(e) {
			$('.bookmark-list').slideToggle(200);
			
			if($('.following-list').css('display') == 'block') {
				$('.following-list').slideUp(200);
			}
		});
		
		$('#following-tab').live('click', function(e) {
			$('.following-list').slideToggle(200);
			
			if($('.bookmark-list').css('display') == 'block') {
				$('.bookmark-list').slideUp(200);
			}
		});
		
		//Desktop Settings Menu
			/*	Reveal Menu */
			$('#settings-tab').on('click', function(e){
				console.log('clicked on settings too');
				
				e.stopImmediatePropagation();
				e.preventDefault();	
				if( !$('.content').hasClass('inactive') ){				
					// Slide and scale content		
					//$('.footer').hide();
					$('.content, .settings-menu').addClass('inactive');
					setTimeout(function(){ $('.content').addClass('flag'); }, 100);
					
					// Change status bar
					$('.status').fadeOut(100, function(){
						$(this).toggleClass('active').fadeIn(300);
					});
					
					// Slide in menu links
					var timer = 0;
					$.each($('li'), function(i,v){
						timer = 40 * i;
						setTimeout(function(){
							$(v).addClass('visible');
						}, timer);
					});
				}
			});

			/*	Close Menu */
			function closeMenu() {		
				// Slide and scale content
				$('.content, .settings-menu').removeClass('inactive flag');
				
				// Change status bar
				$('.status').fadeOut(100, function(){
					$(this).toggleClass('active').fadeIn(300);
				});
				// $(".fx-container").css("width", screenWidth);			
				
				// Reset menu
				setTimeout(function(){
					$('li').removeClass('visible');
					$('.footer').fadeIn(100);
				}, 300);
			}
			
			$('.content').on('click', function(){
				if( $('.content').hasClass('flag') ){
					closeMenu();
				}
			});
			$('.settings-back').on('click', function(e){
				e.preventDefault();
				closeMenu();
			});
			$('.settings-back-back').on('click', function(){
				$('.settings-back-back').hide();
				$('.settings-menu-list, .settings-back').show();
				$(".ajax-container").html("");
				$('.settings-title').text('Settings');
			});	
			$('.my-profile').on('click',function(){
			   $.ajax({
				  url:"http://inspiredapp.tv/app/templates/settings/my-profile.html",
				  dataType:'html',
				  success:function(data) {
					$(".ajax-container").html(data);
				  }
			   });
			   $('.settings-title').text('My Profile');
			   $('.settings-footer, .settings-menu-list, .settings-back').hide();
			   $('.settings-back-back').show();
			});	
			$('.email-preferences').on('click',function(){
			   $.ajax({
				  url:"http://inspiredapp.tv/app/templates/settings/email-preferences.html",
				  dataType:'html',
				  success:function(data) {
					$(".ajax-container").html(data);
				  }
			   });
			   $('.settings-title').text('Email Preferences');
			   $('.settings-footer, .settings-menu-list, .settings-back').hide();
			   $('.settings-back-back').show();
			});		
			$('.invite-friends').on('click',function(){
			   $.ajax({
				  url:"http://inspiredapp.tv/app/templates/settings/invite-friends.html",
				  dataType:'html',
				  success:function(data) {
					$(".ajax-container").html(data);
				  }
			   });
			   $('.settings-title').text('Invite Friends');
			   $('.settings-footer, .settings-menu-list, .settings-back').hide();
			   $('.settings-back-back').show();
			});
			$('.send-feedback').on('click',function(){
			   $.ajax({
				  url:"http://inspiredapp.tv/app/templates/settings/send-feedback.html",
				  dataType:'html',
				  success:function(data) {
					$(".ajax-container").html(data);
				  }
			   });
			   $('.settings-title').text('Send Feedback');
			   $('.settings-footer, .settings-menu-list, .settings-back').hide();
			   $('.settings-back-back').show();
			});	
			$('.help').on('click',function(){
			   $.ajax({
				  url:"http://inspiredapp.tv/app/templates/settings/help.html",
				  dataType:'html',
				  success:function(data) {
					$(".ajax-container").html(data);
				  }
			   });
			   $('.settings-title').text('Help');
			   $('.settings-footer, .settings-menu-list, .settings-back').hide();
			   $('.settings-back-back').show();
			});	
			$('.legal').on('click',function(){
			   $.ajax({
				  url:"http://inspiredapp.tv/app/templates/settings/legal.html",
				  dataType:'html',
				  success:function(data) {
					$(".ajax-container").html(data);
				  }
			   });
			   $('.settings-title').text('Legal');
			   $('.settings-footer, .settings-menu-list, .settings-back').hide();
			   $('.settings-back-back').show();
			});
		  //END Desktop Settings Menu
		  
		$('#logout-tab').on('click', function(e){
			e.stopImmediatePropagation();
			e.preventDefault();
			var user = new StackMob.User();  //no username necessary, since only 1 user is logged in on the device at a time
			user.logout();
			document.location.href = 'http://inspiredapp.tv/app/templates/landing.html';
		});
		
		$('.btn.with-icon.white-top').live('click', function(e) {
			$('.dropdown-list').slideToggle(300);
			
			if(($('.bookmark-list').css('display') == 'block') || ($('.following-list').css('display') == 'block')) {
				$('.bookmark-list').slideUp(200);
				$('.following-list').slideUp(200);
			}
		});

		$('.item').live('click', function(e){
		  e.stopImmediatePropagation();
		  e.preventDefault();
		});
    } 
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
	var tablet = navigator.userAgent.match(/iPad/i);
    if(!mobile){
      //Artist.html page
      $(".artist-video-btn").removeClass("four columns artist-video-btn").addClass("centred").wrap("<li class='element'></li>").prepend("<img class='shop-icon' src='http://inspiredapp.tv/img/icons/shop-icon-small.png' style='width: 55px; height: 55px;' />");
      $(".video-title").removeClass("video-title").addClass("artist-name"); 
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
      alert("Please login first.");
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