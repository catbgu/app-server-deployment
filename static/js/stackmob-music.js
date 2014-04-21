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
			"<a href='javascript:;' onclick='location.reload();location.href=\"http://inspiredapp.tv/artists/" + resultsAsJSON[i]['artist_name'].replace(' ', '-').toLowerCase()  + "/artist.html\"' class='four columns artist-btn'>" +
		    	"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/" + resultsAsJSON[i]['artist_name'].replace(/\ /g, '-').toLowerCase() + "/small.png'>" +
			    "<div class='artist-name'>" + resultsAsJSON[i]['artist_name'] + "</div>" +
		    "</a>");
    }
    var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
	var tablet = navigator.userAgent.match(/iPad/i);
	if(!mobile){
		//Music.html page
		$(".artist-btn").removeClass("four columns artist-btn").addClass("centred").wrap("<li class='element'></li>").prepend("<img class='music-icon' src='http://inspiredapp.tv/img/icons/music-icon-small.png' />");
		$(".artist-name").wrap("<div class='video-info'></div>");
		$(".artist-name").wrapInner("<h5></h5>");
		
		/* Ddisabling the footer for PC */
		$('.footer').css('display', 'none');
		if(!tablet) {
			$('.footer').css('display', 'none');
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
			//FIREFOX SPACE FIX
			$(".featured-music-videos").css("height", $(".active").height());
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
		}
	});
	
	/* Top-bar Settings dropdown, and panels */  
    var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
	var tablet = navigator.userAgent.match(/iPad/i);
    if(!mobile && !tablet){
	
		/* -- Adding the settings dropdown to top right -- */
		$('.top-bar').prepend('<a name="dropdown-btn" class="btn with-icon white-top" style="width: 175px;text-align:center;"><div class="divider"></div><span class></span></a>'); 

		/* -- Dynamically substitute for user email -- */
		var getuser = StackMob.getLoggedInUser();
		if (StackMob.getLoggedInUser() == null) {
			getuser = "Guest";
		}
		$('.btn span').html(getuser);
		
		$('.top-bar').after('<ul class="dropdown-list"></ul>');
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


