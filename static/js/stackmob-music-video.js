//Stackmob Auth
StackMob.init({
  publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
  apiVersion:       1
});
var artist_name = window.location.pathname.split('/');
var artist1 = artist_name[2].replace(/\-/g, ' ');
var artist = artist1.replace(/\b./g, function(m){ return m.toUpperCase(); });
var video_name = artist_name[3].substr(0, artist_name[3].indexOf('.')).replace(/\%20/g, ' ');
var url = document.URL;


$(document).ready(function() {
	$("a.back-btn").attr('onclick','');
	$("a.back-btn").on('click',function(){
		window.location = "http://inspiredapp.tv/app/templates/music.html";    
	});
	$("a.name").on('click',function(){
    	window.location = "http://inspiredapp.tv/app/templates/music.html";    
  	});
	
  var look = StackMob.Model.extend({ schemaName: 'Look' });
  var looks = StackMob.Collection.extend({ model: look }); 
  var lookList = [];
  var k = 0;
  var item = new looks();
  var a = new StackMob.Collection.Query();
  var video = StackMob.Model.extend({ schemaName: 'Music_Video' });
  var videos = StackMob.Collection.extend({ model: video }); 
  var items = new videos();
  var q = new StackMob.Collection.Query();
  q.orderAsc('video_title').equals('artists', artist).equals('video_title', video_name.replace(/\%20/g, ' '));
  items.query(q, {
    success: function(results) {
      var resultsAsJSON_music_title = results.toJSON();
      var music_video_url = resultsAsJSON_music_title[0].music_video_id;
      var send_artist_name = resultsAsJSON_music_title[0].artists;
      a.equals('video_url', music_video_url);
      item.query(a, {
        success: function(results) {
        var resultsAsJSON = results.toJSON();
        $("iframe").attr('src', '//www.youtube-nocookie.com/embed/'+ resultsAsJSON[k]["video_url"]  +'?wmode=opaque&amp;modestbranding=1&amp;rel=0');
        $(".video-poster").css('background','#000');

        for(var c = 0; c < resultsAsJSON.length; c++) {        
          for(var i = 0; i < resultsAsJSON[k]['product_title'].length; i++) {
          	var price = resultsAsJSON[k]['retailer_price'][i].toString(); price = price.substr(0, price.length-2) + '.' + price.substr(price.length-2);
            lookList[k] +=  "<div class = 'item'>" +
								"<div class='image_align'><img id='?video_url="+ resultsAsJSON[k]["video_url"] + 
									"&artist_name="+ resultsAsJSON_music_title[0].artists + 
									"&product_image=" + resultsAsJSON[k]['product_image'][i] + 
									"&product_title=" + resultsAsJSON[k]['product_title'][i].replace(/\'/g, "&#8217") + 
									"&price=" + resultsAsJSON[k]['retailer_price'][i] + 
									"&retailer_logo=" + encodeURIComponent(resultsAsJSON[k]['retailer_logo'][i].replace(/\'/g, "&#8217").replace(/\"/g, "&#8221;")) + 
									"&buy_url=" + resultsAsJSON[k]['buy_url'][i] + "' src = '" + resultsAsJSON[k]['product_image'][i] + "'/></div>" +
									"<div class='product_container'>"+
									"<div class='product_title'>" + resultsAsJSON[k]['product_title'][i] + "</div>" +
									"<div class='product_price'>$" + price + "</div>" +
								"</div>"+
								"<div class='button_container'>"+
									"<div class='btn item-btns orange add' onclick='window.open(&#39;" + resultsAsJSON[k]['buy_url'][i] + "&#39;,&#39;popupwindow&#39;);return false;' target='_blank'><div class='divider'></div>Purchase</div>"+
									"<a href='javascript:void(0)' class='btn item-btns white star'><div class='divider'></div>Bookmark</a>"+
									"<a href='javascript:void(0)' class='btn item-btns white share-product' height='10' width='10' data-reveal-id='share-box-touch' href='#'><div class='divider'></div>Share</a>"+
									"<div class='share-buttons closed'>"+
										"<a class='facebook' href='javascript:void(0)' onclick=\"window.open('https://www.facebook.com/sharer/sharer.php?u=http://tinyurl.com/inspiredapp')\"'></a>"+
										"<a class='twitter' href='javascript:void(0)' onclick=\"window.open('https://twitter.com/intent/tweet?url=http://tinyurl.com/inspiredapp&text=%23ootd+worthy?+Inspired+by+@Inspired_App')\"'></a>"+

										"<a class='pinterest' href='javascript:void(0)' onclick=\"window.open('https://pinterest.com/pin/create/button/?url=" + resultsAsJSON[k]['buy_url'][i] + "&description=#ootd worthy? #fashion inspired by http://tinyurl.com/inspiredapp')\" data-pin-do='buttonPin'></a>"+
										"<a class='email-share' href='javascript:void(0)' onclick=\"window.open('mailto:?subject=Must have!&amp;body=OMG looove! http://tinyurl.com/inspiredapp')\"'></a>"+
									"</div>"+	
								"</div>"+
                            "</div>";
            }
            $("div.looks-container").append(""+
                "<div class='look-separator'>"+
                  "<div class='look-title'>" + resultsAsJSON[k]['look_title'] + "</div>" +
                "</div>" +
                "<div class = 'short-width-slider-2'>" +
                  "<div class = 'slider'>" +
                    lookList[k].slice(9) +
                  "</div>" +
                  "<div class='prev' style='cursor: pointer;'></div>" +
                  "<div class='next' style='cursor: pointer;''></div>" +
                "</div>" +
              "</div>");
            k++;
            }

			if( 'ontouchstart' in window ){ 
				var click = 'singleTap'; 
			}else{ 
				var click = 'click';
			}
			
        //SLIDER ON MUSIC VIDEO PAGE
            $('.iosSlider').iosSlider({
              desktopClickDrag: true,
              snapToChildren: true
            });
              $('.short-width-slider-2').each(function() {
                $(this).iosSlider({
                    scrollbar: false,
                    desktopClickDrag: true,
                    snapToChildren: true,
					snapSliderCenter: true,
                    infiniteSlider: false,
                    navNextSelector: $(this).find('.next'),
                    navPrevSelector: $(this).find('.prev'),
                    horizontalSlideLockThreshold: 10,
                    verticalSlideLockThreshold: 15,
                    onSlideChange: slideChange,
					onSlideComplete: slideComplete,
					onSliderLoaded: onLoad
                });
              });
			function slideComplete(args) {
				args.settings.navPrevSelector.show();
				args.settings.navNextSelector.show();

			    if(args.currentSlideNumber == 1) {
			
			        args.settings.navPrevSelector.hide();
			
			    } else if(args.currentSliderOffset == args.data.sliderMax) {
			
			        args.settings.navNextSelector.hide();
			
			    }
			
			}  
			  
			function onLoad(args) {
				args.settings.navPrevSelector.hide();
				args.sliderObject[0].offsetLeft = -50;
				console.log(args.sliderObject[0].offsetLeft);
				
				
				if(args.currentSliderOffset > args.data.sliderMax) {
					args.settings.navNextSelector.hide();
				}
				
			
			  /*args.settings.navPrevSelector.hide();
			  
			  var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
			  var tablet = navigator.userAgent.match(/iPad/i);
              if(mobile){	  	
				if(window.innerHeight > window.innerWidth){ //Fit 2 items : Portrait mode
					if(args.data.numberOfSlides <= 2) {  
						args.settings.navNextSelector.hide();	  
					}
				} else if(window.innerHeight < window.innerWidth) { //Fit 3 items : Landscape mode
					if(args.data.numberOfSlides <= 3) {  
						args.settings.navNextSelector.hide();	  
					}
			    }				
              } else if(!mobile & !tablet){		
					if(screen.width >= 1360) { //fits 6 items
						if(args.data.numberOfSlides <= 6) {  
							args.settings.navNextSelector.hide();	
						}	
					} else if(screen.width <= 1280 & screen.width > 1024) { //Fits 4 to 3.5 items
						if(screen.height >= 960) { //Fits 6 items
							if(args.data.numberOfSlides <= 6) {  
								args.settings.navNextSelector.hide();	
							}
						} else { //Fits 4 to 3.5 items
							if(args.data.numberOfSlides <= 4) {  
								args.settings.navNextSelector.hide();
							}
						}		
					} else if(screen.width <= 1024 & screen.width > 800) { //Fits 6 items
						if(args.data.numberOfSlides <= 6) {  
							args.settings.navNextSelector.hide();
						}
					} else if(screen.width <= 800) { //Fits 5 items
						if(args.data.numberOfSlides <= 5) {  
							args.settings.navNextSelector.hide();	
						}
					}           
				} else if(tablet) { //Fit 6 items
					if(window.innerHeight > window.innerWidth){ //Fit 5 items : Portrait mode
						if(args.data.numberOfSlides <= 5) {  
							args.settings.navNextSelector.hide();
						}
					} else if(window.innerHeight < window.innerWidth) { //Fit 6 items : Landscape mode
						if(args.data.numberOfSlides <= 6) {  
							args.settings.navNextSelector.hide();
						}
					}		
				}*/
			}	

            function slideChange(args) {              
              console.log('currentSliderOffset: '+args.currentSliderOffset);
              console.log('sliderMax: '+args.data.sliderMax);
			  
			  /*args.settings.navNextSelector.show();
              args.settings.navPrevSelector.show();
			  
			  
			  try {
					console.log('changed: ' + (args.currentSlideNumber - 1));
				} catch(err) {
				}

              var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
			  var tablet = navigator.userAgent.match(/iPad/i);
              if(mobile){	  
				if(window.innerHeight > window.innerWidth){ //Fit 2 items : Portrait mode
					if(args.currentSlideNumber == 1) {  
					args.settings.navPrevSelector.hide();	  
					} else if(args.data.numberOfSlides - args.currentSlideNumber <= 1) {	
					  args.settings.navNextSelector.hide();
					}
				} else if(window.innerHeight < window.innerWidth) { //Fit 3 items : Landscape mode
					if(args.currentSlideNumber == 1) {  
					args.settings.navPrevSelector.hide();  
					} else if(args.data.numberOfSlides - args.currentSlideNumber <= 2) {	
					  args.settings.navNextSelector.hide();
					}
			    }				
              } else if(!mobile & !tablet){		
					if(screen.width >= 1360) { //fits 6 items
						if(args.currentSlideNumber == 1) {        
							args.settings.navPrevSelector.hide();				
						} else if(args.data.numberOfSlides - args.currentSlideNumber <= 5) {	
							args.settings.navNextSelector.hide();
						}
					} else if(screen.width <= 1280 & screen.width > 1024) { //Fits 4 to 3.5 items
						if(screen.height >= 960) { //Fits 6 items
							if(args.currentSlideNumber == 1) { 
								args.settings.navPrevSelector.hide();
							
							} else if(args.data.numberOfSlides - args.currentSlideNumber <= 5) {		
								args.settings.navNextSelector.hide();
							}
						} else {
							if(args.currentSlideNumber == 1) {	  
								args.settings.navPrevSelector.hide();		
							} else if(args.data.numberOfSlides - args.currentSlideNumber <= 3) {		
								args.settings.navNextSelector.hide();
							}
						}		
					} else if(screen.width <= 1024 & screen.width > 800) { //Fits 6 items
						if(args.currentSlideNumber == 1) {
							args.settings.navPrevSelector.hide();
						} else if(args.data.numberOfSlides - args.currentSlideNumber <= 5) {	
							args.settings.navNextSelector.hide();
						}
					} else if(screen.width <= 800) { //Fits 5 items
						if(args.currentSlideNumber == 1) {
							args.settings.navPrevSelector.hide();
						} else if(args.data.numberOfSlides - args.currentSlideNumber <= 4) {		
							args.settings.navNextSelector.hide();
						}
					}           
				} else if(tablet) { //Fit 5 or 6 items
					if(window.innerHeight > window.innerWidth){ //Fit 5 items : Portrait mode
						if(args.currentSlideNumber == 1) {  
							args.settings.navPrevSelector.hide();	  
						} else if(args.data.numberOfSlides - args.currentSlideNumber <= 4) {	
						  args.settings.navNextSelector.hide();
						}
					} else if(window.innerHeight < window.innerWidth) { //Fit 6 items : Landscape mode
						if(args.currentSlideNumber == 1) {  
							args.settings.navPrevSelector.hide();  
						} else if(args.data.numberOfSlides - args.currentSlideNumber <= 5) {	
						  args.settings.navNextSelector.hide();
						}
					}		
				}*/	
			}
			
            var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
            var tablet = navigator.userAgent.match(/iPad/i);
            if(mobile){
              $('iframe').css('height','200px');
			  $('.looks-container').css('padding-bottom', '35px');
			  
			  $('.footer').css('display', 'block');
			  $('a.back-btn').css('display','block');
			/* Top-Bar specific components below: like Bookmarks, following, Settings dropdown, Panels etc... */ 
            } else if (tablet) {
				$('.footer').css('display', 'block');
				$('a.back-btn').css('display','block');
			} else if(!mobile & !tablet){ 	
			
				/* -- Adding the settings dropdown to top right -- */
				$('.top-bar').prepend('<a name="dropdown-btn" class="btn with-icon white-top" style="width: 175px;text-align:center;"><div class="divider"></div><span class></span></a>'); 
				
				/* -- Adding the 'Music Videos/New Releases' panel to the left -- */
				$('div.row.banner-row').before().prepend('<div class="panel-container"><ul name="artist-videos" class="artist-page artist-videos-panel"><h5>New Releases</h5></ul></div>');
				
				/* -- Need to dynamically insert other artist music videos: No more than 4 videos, b/c of more videos button -- */
				$('.artist-videos-panel').append("<li class='drop-item'>"+
				"<a href='javascript:;' onclick='location.href=\"http://inspiredapp.tv/artists/antonia/Hurricane (English version).html\"'>" +
					"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/antonia/Hurricane (English version).png'>" +
					"<div>Hurricane (English version)</div>" +
				"</a>"+
				"</li>"
				);
				$('.artist-videos-panel').append("<li class='drop-item'>"+
				"<a href='javascript:;' onclick='location.href=\"http://inspiredapp.tv/artists/antonia/Hurricane (English version).html\"'>" +
					"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/antonia/Hurricane (English version).png'>" +
					"<div>Hurricane (English version)</div>" +
				"</a>"+
				"</li>"
				);
				
				$('.artist-videos-panel').append("<li class='drop-item'>"+
				"<a href='javascript:;' onclick='location.href=\"http://inspiredapp.tv/artists/antonia/Hurricane (English version).html\"'>" +
					"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/antonia/Hurricane (English version).png'>" +
					"<div>Hurricane (English version)</div>" +
				"</a>"+
				"</li>"
				);
				
				$('.artist-videos-panel').append("<li class='drop-item'>"+
				"<a href='javascript:;' onclick='location.href=\"http://inspiredapp.tv/artists/antonia/Hurricane (English version).html\"'>" +
					"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/antonia/Hurricane (English version).png'>" +
					"<div>Hurricane (English version)</div>" +
				"</a>"+
				"</li>"
				);
				
				/* -- The last element in the list (dynamically insert current artist name); always the more artist videos button -- */
				$('.artist-videos-panel').children().last().after('<li class="drop-item"><a href="http://inspiredapp.tv/artists/antonia/artist.html">Even more...<a/></li>');
				
				/* -- Adding the 'similar artists/Who's Trending' panel to the left -- */
				$('.panel-container').append("<ul name='similar-artists' class='similar-artists-panel'><h5>Who's Trending</h5></ul>");
				
				/* -- Need to dynamically insert the artists pages and photos here: No more than 4 artists b/c "more artists" button is there.-- */
				$('.similar-artists-panel').append("<li class='drop-item'>"+
				"<a href='javascript:;' onclick='location.href=\"http://inspiredapp.tv/artists/lily-allen/artist.html\"'>" +
					"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/lily-allen/small.png'>" +
					"<div>Lily Allen</div>" +
				"</a>"+
				"</li>"
				);
				$('.similar-artists-panel').append("<li class='drop-item'>"+
				"<a href='javascript:;' onclick='location.href=\"http://inspiredapp.tv/artists/kylie-minogue/artist.html\"'>" +
					"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/kylie-minogue/small.png'>" +
					"<div>Kylie Minogue</div>" +
				"</a>"+
				"</li>"
				);
				$('.similar-artists-panel').append("<li class='drop-item'>"+
				"<a href='javascript:;' onclick='location.href=\"http://inspiredapp.tv/artists/kacey-musgraves/artist.html\"'>" +
					"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/kacey-musgraves/small.png'>" +
					"<div>Kacey Musgraves</div>" +
				"</a>"+
				"</li>"
				);
				$('.similar-artists-panel').append("<li class='drop-item'>"+
				"<a href='javascript:;' onclick='location.href=\"http://inspiredapp.tv/artists/jennifer-hudson/artist.html\";'>" +
					"<img class='artist-img' src='http://inspiredapp.tv/img/music/artists/jennifer-hudson/small.png'>" +
					"<div>Jennifer Hudson</div>" +
				"</a>"+
				"</li>"
				);
				
				/* -- The last element in the list; always the more artists button -- */
				$('.similar-artists-panel').children().last().after('<li class="drop-item"><a href="http://inspiredapp.tv/app/templates/music.html">Even more...<a/></li>');
				
				/* -- Dynamically substitute for user email -- */
				var getuser = StackMob.getLoggedInUser();
				if (StackMob.getLoggedInUser() == null) {
					getuser = "Guest";
				}
				$('.btn span').html(getuser);
				
				$('.top-bar').after('<ul class="dropdown-list"></ul>');
				$('.dropdown-list').append('<li id="settings-tab" class="drop-item"">Settings</li>');
				$('.dropdown-list').append('<li id="bookmark-tab" class="drop-item">Bookmarks</li>');
				$('.dropdown-list').append('<li id="following-tab" class="drop-item">Following</li>');
				$('.dropdown-list').append('<hr>');
				$('.dropdown-list').append('<li id="logout-tab" class="drop-item">Log Out</li>');
				
				/* This is the dropdown for Bookmarks -height is dynamic */
				$('.dropdown-list').after('<ul class="bookmark-list"></ul>');
			
				/* This is the dropdown for Following -height is dynamic */
				$('.dropdown-list').after('<ul class="following-list"></ul>');
			}
			
			// Navigation + Sliding Animations
			$('#bookmark-tab').live('click', function(e) {
				if($('.bookmark-list').html() == '') {
				$('.bookmark-list').hide();
				return;
			}
				$('.bookmark-list').slideToggle(200);
				
				if($('.following-list').css('display') == 'block') {
					$('.following-list').slideUp(200);
				}
			});
			
			$('#following-tab').live('click', function(e) {
				if($('.following-list').html() == '') {
				$('.following-list').hide();
				return;
			}
				$('.following-list').slideToggle(200);
				
				if($('.bookmark-list').css('display') == 'block') {
					$('.bookmark-list').slideUp(200);
				}
			});
			
			
			//Get Bookmarks and Following --------
			var Follow_page = StackMob.Model.extend({ schemaName: 'Follows' });
			var Follows_page = StackMob.Collection.extend({ model: Follow_page }); 
			var fols_page = new Follows_page();
			var q2 = new StackMob.Collection.Query();
			var Bookmark_page = StackMob.Model.extend({ schemaName: 'Bookmarks' });
			var Bookmarks_page = StackMob.Collection.extend({ model: Bookmark_page }); 
			var marks_page = new Bookmarks_page();
			var b2 = new StackMob.Collection.Query();
			b2.orderAsc('product_title').equals('username', StackMob.getLoggedInUser());
			q2.orderAsc('artist_name').equals('username', StackMob.getLoggedInUser());
				 
			//Dynamic Bookmark insertion
			marks_page.query(b2, {
				success: function(results) {
					var resultsAsJSON = results.toJSON();
					for(var i = 0; i < resultsAsJSON.length; i++) {
						$('.bookmark-list').append("<li class='drop-item'><a href='" + resultsAsJSON[i]['buy_url'] + "' target='_blank'><img class='look-item-img' src='" + resultsAsJSON[i]['product_image'] + "' /><span>" + resultsAsJSON[i]['product_title'] + "</span></a></li>");
					}
					//The DELETE button
					$('.bookmark-list .drop-item').hover(function(e){
						$(this).prepend('<h5>X</h5>');
					},function(e){
							$(this).find('h5').remove();
					});
				}
			});	
			// On clicking the delete, remove item from database too.
			$('.bookmark-list .drop-item h5').live('click', function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				
				$(this).parent().fadeOut(400, function() {
					$(this).remove();
				});
			});

			//Dynamic Following insertion
			fols_page.query(q2, {
				 success: function(results) {
					var resultsAsJSON = results.toJSON();
					//FOLLOWING
						for(var i = 0; i < resultsAsJSON.length; i++) {
						$('.following-list').append("<li class='drop-item'><a href='http://inspiredapp.tv/artists/" + resultsAsJSON[i]['artist_name'].replace(/\ /g, '-').toLowerCase() + "/artist.html'><img class='artist-img' src='http://inspiredapp.tv/img/music/artists/" + resultsAsJSON[i]['artist_name'].replace(/\ /g, '-').toLowerCase() + "/" + resultsAsJSON[i]['cover_image'] +"' /><span>" + resultsAsJSON[i]['artist_name'] + "</span></a></li>");
					}
					//The UNFOLLOW button
					$('.following-list .drop-item').hover(function(e){
						$(this).prepend('<h5>X</h5>');
					},function(e){
							$(this).find('h5').remove();
					});
				 }
			});
			//On clicking unfollow button, remove from database too.
			$('.following-list .drop-item h5').live('click', function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				
				$(this).parent().fadeOut(400, function() {
					$(this).remove();
				});
			});
			
			
			
			//Desktop Settings Menu
			/*	Reveal Menu */
			$('#settings-tab').on(click, function(e){
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
					//$('.footer').fadeIn(100);
				}, 300);
			}
			
			$('.content').on(click, function(){
				if( $('.content').hasClass('flag') ){
					closeMenu();
				}
			});
			$('.settings-back').on(click, function(e){
				e.preventDefault();
				closeMenu();
			});
			$('.settings-back-back').on(click, function(){
				$('.settings-back-back').hide();
				$('.settings-menu-list, .settings-back').show();
				$(".ajax-container").html("");
				$('.settings-title').text('Settings');
			});	
			$('.my-profile').on(click,function(){
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
			$('.email-preferences').on(click,function(){
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
			$('.invite-friends').on(click,function(){
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
			$('.send-feedback').on(click,function(){
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
			$('.help').on(click,function(){
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
			$('.legal').on(click,function(){
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

            $('.item').live(click, function(e){
              e.stopImmediatePropagation();
              e.preventDefault();
            });
			
			var mobile = navigator.userAgent.match(/iPhone|iPad|Android|Windows Phone|BlackBerry/i);
            if(mobile){
				var WP = navigator.userAgent.match(/Windows Phone/i);
				//Setting this to "live" will not work on Windows Phone.
				if(WP) {
					$('.item').on("click", function(e){
						$('img, .product_container').css('opacity', '1');
						$('.button_container').css('display', 'none');

						if($(this).children().last().css('display') == 'none') {
							// $(this).css('background-color', '#8f8f8f');
							$(this).find('img, .product_container').css('opacity', '0.1');
							$(this).children().last().css('display', 'block');	
						} else {
							$(this).css('background-color', '#fff');
							$(this).find('img').css('opacity', '1');
							$(this).children().last().css('display', 'none');
							
							var target = $(e.target);
							if (target.is('.button') || target.is('.facebook') || target.is('.twitter') || target.is('.pinterest') || target.is('.email-share')) {
								$(this).children().last().css('display', 'block');
								// $(this).css('background-color', '#8f8f8f');
								$(this).find('img, .product_container').css('opacity', '0.1');
								e.stopImmediatePropagation();
								e.preventDefault();
								return;
							}
						}
					});	
					$('.star').on("click", function(e){
						if($(this).attr('style')) {
							$(this).html('Bookmark');
							$(this).removeAttr('style');
						} else {
							$(this).html('Bookmarked');
							$(this).css('color', 'rgb(48, 149, 184)');
							$(this).css('padding-left', '20px;');
							$(this).css('padding-top', '15px;');
							$(this).css('font-size', '0.88em');
						  }
					});
				} else {
					$('.item').live("click", function(e){
						$('img, .product_container').css('opacity', '1');
						$('.button_container').css('display', 'none');

						if($(this).children().last().css('display') == 'none') {
							// $(this).css('background-color', '#8f8f8f');
							$(this).find('img, .product_container').css('opacity', '0.1');
							$(this).children().last().css('display', 'block');	
						} else {
							$(this).css('background-color', '#fff');
							$(this).find('img').css('opacity', '1');
							$(this).children().last().css('display', 'none');
							
							var target = $(e.target);
							if (target.is('.button') || target.is('.facebook') || target.is('.twitter') || target.is('.pinterest') || target.is('.email-share')) {
								$(this).children().last().css('display', 'block');
								// $(this).css('background-color', '#8f8f8f');
								$(this).find('img, .product_container').css('opacity', '0.1');
								e.stopImmediatePropagation();
								e.preventDefault();
								return;
							}
						}
					});	
				}	
			} else {
				$('.item').live('mouseenter', function(event){
					$(this).children().last().fadeIn();
				});
				$('.item').live('mouseleave', function(event){
					  $(this).children().last().fadeOut();
					  $('.share-product').next().removeClass('open').addClass('closed');
				});
				
				/* Share button reveal modal slide down on touch */
				$('.share-product').on("click", function(e) {
					e.stopImmediatePropagation();
					e.preventDefault();
					
					if($(this).next().hasClass('closed')) {
						$(this).next().removeClass('closed').addClass('open');
					} else {
						$(this).next().removeClass('open').addClass('closed');
					}
				}); 
			}
		}
      });   
    }
  });

	$(".star").live("click",function(e){
	  e.preventDefault(); 
	  var item_title = $(this).parent(".button_container").parent(".item").find(".product_container").find(".product_title").text().slice(0, -1);
	  var item_buyURL = $(this).parent(".button_container").find(".add").attr("onclick").replace("window.open('", "").replace("','popupwindow');return false;", "");
	  var item_image = $(this).parent(".button_container").parent(".item").find(".image_align img").attr('src');
	  if($(this).hasClass('selected')) {
	    $(this).removeClass('selected');
		$(this).empty();
		$(this).append("<div class='divider'></div>Bookmark");
		$(this).removeAttr('style');
		
	    // mark.destroyAll(a, {
	    //   success: function(model) {
	    //     console.debug(model);
	    //     $(this).removeClass('selected');
	    //   },
	    //   error: function(model, response) {
	    //     console.debug(model);
	    //     console.debug(response);
	    //   }
	    // });
	  } else {
	    $(this).addClass('selected');
		
		$(this).empty();
		$(this).append("<div class='divider'></div>Bookmarked");
		$(this).css('color', 'rgb(48, 149, 184)');
		$(this).css('padding-left', '20px;');
		$(this).css('padding-top', '15px;');
		$(this).css('font-size', '0.88em');
		
	  	q.orderAsc('video_title').equals('artists', artist).equals('video_title', video_name.replace(/\%20/g, ' '));
	  	items.query(q, {
	    	success: function(results) {
	      		var resultsAsJSON_music_title = results.toJSON();
	      		var music_video_url = resultsAsJSON_music_title[0].music_video_id;
	      		var Bookmark = StackMob.Model.extend({ schemaName: 'Bookmarks' }); 
	      		var create_bookmark = new Bookmark({ username: StackMob.getLoggedInUser(), artist_name: artist, video_url: music_video_url, product_title: item_title, product_image: item_image, buy_url: item_buyURL });
			    create_bookmark.create({
			      success: function(model) {
			        // console.debug(model);
			      },
			      error: function(model, response) {
			        // console.debug(model);
			        // console.debug(response);
			      }
			    });
	      	}
	    });
	  }
	});
});
$(window).bind("load", function() {

   	var video = StackMob.Model.extend({ schemaName: 'Music_Video' });
	var videos = StackMob.Collection.extend({ model: video }); 
	var items = new videos();
	var q = new StackMob.Collection.Query();
	q.orderAsc('video_title').equals('artists', artist).equals('video_title', video_name.replace(/\%20/g, ' '));
  	items.query(q, {
  		async: false,
    	success: function(results) {
      		var resultsAsJSON_music_title = results.toJSON();
      		var music_video_url = resultsAsJSON_music_title[0].music_video_id;
      		var getBookmark = StackMob.Model.extend({ schemaName: 'Bookmarks' });  
			var getBookmarks = StackMob.Collection.extend({ model: getBookmark }); 
			var getitem = new getBookmarks();
			var qr = new StackMob.Collection.Query();
      		qr.equals('video_url', music_video_url).equals('username', StackMob.getLoggedInUser()).equals('artist_name', artist);
			getitem.query(qr, {
				success: function(results) {
				  	var resultsAsJSON = results.toJSON();
				  	$('.item-btns.add').each(function() {
				  		var get_buyurl = $(this).attr("onclick").replace("window.open('", "").replace("','popupwindow');return false;", "");
				  		var look = StackMob.Model.extend({ schemaName: 'Look' });
						var looks = StackMob.Collection.extend({ model: look }); 
						var item = new looks();
						var a = new StackMob.Collection.Query();
					    a.equals('video_url', music_video_url);
				      	item.query(a, {
				        	success: function(results) {
				        		var resultsAsJSON = results.toJSON();
				        		for(var e = 0; e < resultsAsJSON.length; e++) {
				        			for(var r = 0; r < resultsAsJSON[e].buy_url.length; r++) {
				        				if (resultsAsJSON[e].buy_url[r] === get_buyurl) {
				        					//get data from bookmarks db and match it with website links
				        					// console.debug("website url" + get_buyurl);
				        					// console.debug("db url" + resultsAsJSON[e].buy_url[r]);
				        					// console.debug("there's a match");
				        				}
				        			}
				        		}
				        	}
						});
					});
				}
			});
      	}
    });
});