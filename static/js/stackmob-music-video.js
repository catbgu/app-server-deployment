//Stackmob Auth
StackMob.init({
  publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
  apiVersion:       1
});
var artist_name = window.location.pathname.split('/');
var artist1 = artist_name[2].replace(/\-/g, ' ');
var artist = artist1.replace(/\b./g, function(m){ return m.toUpperCase(); });
var video_name = artist_name[3].substr(0, artist_name[3].indexOf('.')).replace(/\%20/g, ' ');
$(document).ready(function() {

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
            lookList[k] +=  "<div class = 'item'>" +
                              "<div class='image_align'><img id='?video_url="+ resultsAsJSON[k]["video_url"] + 
                              "&artist_name="+ resultsAsJSON_music_title[0].artists + 
                              "&product_image=" + resultsAsJSON[k]['product_image'][i] + 
                              "&product_title=" + resultsAsJSON[k]['product_title'][i].replace(/\'/g, "&#8217") + 
                              "&price=" + resultsAsJSON[k]['retailer_price'][i] + 
                              // "&product_description=" +  encodeURIComponent(resultsAsJSON[k]['product_description'][i].replace(/\'/g, "&#8217").replace(/\*/g, "&#42").replace(/\%0A/g, "").replace(/\"/g, "&#8221;")) + 
                              "&retailer_logo=" + encodeURIComponent(resultsAsJSON[k]['retailer_logo'][i].replace(/\'/g, "&#8217").replace(/\"/g, "&#8221;")) + 
                              "&buy_url=" + resultsAsJSON[k]['buy_url'][i] + "' src = '" + resultsAsJSON[k]['product_image'][i] + "'/></div>" +
							  "<div class='product_container'>"+
                              "<div class='product_title'>" + resultsAsJSON[k]['product_title'][i] + "</div>" +
                              "<div class='product_price'>$" + resultsAsJSON[k]['retailer_price'][i]  + "</div>" +
							  "</div>"+
							  "<div class='button_container'>"+
							  "<div class='btn item-btns orange add' onclick='window.open(&#39;" + resultsAsJSON[k]['buy_url'][i] + "&#39;,&#39;popupwindow&#39;);return false;' target='_blank'><div class='divider'></div>Purchase</div>"+

							  "<a href='' class='btn item-btns white star'><div class='divider'></div>Bookmark</a>"+
							  "<a href='' class='btn item-btns white share-product' height='10' width='10'><div class='divider'></div>Share</a>"+
							  "<div class='share-buttons closed'>"+
								"<a class='facebook'></a>"+
								"<a class='twitter'></a>"+
								"<a class='pinterest'></a>"+
								"<a class='email-share'></a>"+
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
                    infiniteSlider: false,
                    navNextSelector: $(this).find('.next'),
                    navPrevSelector: $(this).find('.prev'),
                    horizontalSlideLockThreshold: 10,
                    verticalSlideLockThreshold: 15,
                    onSlideChange: slideChange,
					onSliderLoaded: showingArrows
                });
              });
			  
			function showingArrows(args) {
			  args.settings.navPrevSelector.hide();
			  
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
				}
			}	
            function slideChange(args) {              
              args.settings.navNextSelector.show();
              args.settings.navPrevSelector.show();

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
				}	
			}

            var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
            var tablet = navigator.userAgent.match(/iPad/i);
            if(mobile){
              $('iframe').css('height','200px');
			  $('.looks-container').css('padding-bottom', '35px');
			  
            } else if(!mobile & !tablet){	
			
				/* -- Adding the settings dropdown to top right -- */
				$('.top-bar').prepend('<a name="dropdown-btn" class="btn with-icon white-top"><div class="divider"></div><span class></span></a>');
				
				/* -- Dynamically substitute for user email -- */
				var getuser = StackMob.getLoggedInUser();
				if (StackMob.getLoggedInUser() == null) {
					getuser = "Guest";
				}
				$('.btn span').html(getuser);
				
				$('.top-bar').after('<ul class="dropdown-list"></ul>');
				$('.dropdown-list').append('<li class="drop-item">Settings</li>');
				$('.dropdown-list').append('<li id="bookmark-tab" class="drop-item">Bookmarks</li>');
				$('.dropdown-list').append('<li id="following-tab" class="drop-item">Following</li>');
				$('.dropdown-list').append('<hr>');
				$('.dropdown-list').append('<li class="drop-item">Sign Out</li>');
				
				/* This is the dropdown for Bookmarks -height is dynamic */
				$('.dropdown-list').after('<ul class="bookmark-list"></ul>');
				$('.bookmark-list').append('<li class="drop-item">Bookmark Item1</li>');
				$('.bookmark-list').append('<li class="drop-item">Bookmark Item2</li>');
				$('.bookmark-list').append('<li class="drop-item">Bookmark Item3</li>');
				$('.bookmark-list').append('<li class="drop-item">Bookmark Item4</li>');
				$('.bookmark-list').append('<li class="drop-item">Bookmark Item5</li>');
				$('.bookmark-list').append('<li class="drop-item">Bookmark Item6</li>');
				$('.bookmark-list').append('<li class="drop-item">...more...</li>');

				
				
				/* This is the dropdown for Following -height is dynamic */
				$('.dropdown-list').after('<ul class="following-list"></ul>');
				$('.following-list').append('<li class="drop-item">Following Item1</li>');
				$('.following-list').append('<li class="drop-item">Following Item2</li>');
				$('.following-list').append('<li class="drop-item">Following Item3</li>');
				$('.following-list').append('<li class="drop-item">Following Item4</li>');
			}
			
			$('#bookmark-tab').live('click', function(e) {
				$('.bookmark-list').slideToggle();
			});
			
			$('#following-tab').live('click', function(e) {
				$('.following-list').slideToggle();
			});
			
			$('.btn.with-icon.white-top').live('click', function(e) {
				$('.dropdown-list').slideToggle();
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
						if($(this).children().last().css('display') == 'none') {
						
							$(this).css('background-color', '#8f8f8f');
							$(this).find('img').css('opacity', '0.3');
							
							$(this).children().last().css('display', 'block');	
						
						} else {
						
							$(this).css('background-color', '#fff');
							$(this).find('img').css('opacity', '1');
							
							$(this).children().last().css('display', 'none');
							
							var target = $(e.target);
							if ($(e.target).is('.button') || target.is('.facebook') || target.is('.twitter') || target.is('.pinterest') || target.is('.email-share')) {
							
								$(this).children().last().css('display', 'block');
								$(this).css('background-color', '#8f8f8f');
								$(this).find('img').css('opacity', '0.3');
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
						if($(this).children().last().css('display') == 'none') {
						
							$(this).css('background-color', '#8f8f8f');
							$(this).find('img').css('opacity', '0.3');
							
							$(this).children().last().css('display', 'block');	
						
						} else {
						
							$(this).css('background-color', '#fff');
							$(this).find('img').css('opacity', '1');
							
							$(this).children().last().css('display', 'none');
							
							var target = $(e.target);
							if (target.is('.button') || target.is('.facebook') || target.is('.twitter') || target.is('.pinterest') || target.is('.email-share')) {
							
								$(this).children().last().css('display', 'block');
								$(this).css('background-color', '#8f8f8f');
								$(this).find('img').css('opacity', '0.3');
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
			}
			
			// setting it to "live" will not work in mobile! 
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
      });   
    }
  });


  // var look = StackMob.Model.extend({ schemaName: 'Look' });
  // var looks = StackMob.Collection.extend({ model: look }); 
  // var lookList = [];
  // var k = 0;
  // var item = new looks();
  // var a = new StackMob.Collection.Query();


  // var artist_name = window.location.pathname.split('/');
  // var artist1 = artist_name[2].replace(/\-/g, ' ');
  // var artist = artist1.replace(/\b./g, function(m){ return m.toUpperCase(); });

  // var video_name = artist_name[3].substr(0, artist_name[3].indexOf('.')).replace(/\%20/g, ' ');

  // var video = StackMob.Model.extend({ schemaName: 'Music_Video' });
  // var videos = StackMob.Collection.extend({ model: video }); 
  // var items = new videos();
  // var q = new StackMob.Collection.Query();
  // q.orderAsc('video_title').equals('artists', artist).equals('video_title', video_name.replace(/\%20/g, ' '));
  // items.query(q, {
  //   success: function(results) {
  //     var resultsAsJSON_music_title = results.toJSON();
  //     var music_video_url = resultsAsJSON_music_title[0].music_video_id;
  //     var send_artist_name = resultsAsJSON_music_title[0].artists;
  //     a.equals('video_url', music_video_url);
  //     item.query(a, {
  //       success: function(results) {
  //       var resultsAsJSON = results.toJSON();



  //       for(var c = 0; c < resultsAsJSON.length; c++) {        
  //         for(var i = 0; i < resultsAsJSON[k]['product_title'].length; i++) {
  //           lookList[k] +=  "<div class = 'item' onclick=''>" +
  //                             "<div class='image_align'><img id='?video_url="+ resultsAsJSON[k]["video_url"] + 
  //                             "&artist_name="+ resultsAsJSON_music_title[0].artists + 
  //                             "&product_image=" + resultsAsJSON[k]['product_image'][i] + 
  //                             "&product_title=" + resultsAsJSON[k]['product_title'][i].replace(/\'/g, "&#8217") + 
  //                             "&price=" + resultsAsJSON[k]['retailer_price'][i] + 
  //                             // "&product_description=" +  encodeURIComponent(resultsAsJSON[k]['product_description'][i].replace(/\'/g, "&#8217").replace(/\*/g, "&#42").replace(/\%0A/g, "").replace(/\"/g, "&#8221;")) + 
  //                             "&retailer_logo=" + encodeURIComponent(resultsAsJSON[k]['retailer_logo'][i].replace(/\'/g, "&#8217").replace(/\"/g, "&#8221;")) + 
  //                             "&buy_url=" + resultsAsJSON[k]['buy_url'][i] + "' src = '" + resultsAsJSON[k]['product_image'][i] + "'/></div>" +
		// 					  "<div class='product_container'>"+
  //                             "<div class='product_title'>" + resultsAsJSON[k]['product_title'][i] + "</div>" +
  //                             "<div class='product_price'>$" + resultsAsJSON[k]['retailer_price'][i]  + "</div>" +
		// 					  "</div>"+
		// 					  "<div class='button_container'>"+
		// 					  "<a href='" + resultsAsJSON[k]['buy_url'][i] + "' class='button add' target='_blank'>Purchase</a>"+
		// 					  "<a href='' class='button star'>Bookmark</a>"+
		// 					  "<a href='' class='button share-product'>Share</a>"+
		// 					  "</div>"+
  //                           "</div>";
  //           }
  //       }
  //     });   
  //   }
  // });


	

	

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
		
		console.debug(item_title);
	  	console.debug(item_buyURL);
	  	console.debug(item_image);
	  	console.debug(artist);
	  	q.orderAsc('video_title').equals('artists', artist).equals('video_title', video_name.replace(/\%20/g, ' '));
	  	items.query(q, {
	    	success: function(results) {
	      		var resultsAsJSON_music_title = results.toJSON();
	      		var music_video_url = resultsAsJSON_music_title[0].music_video_id;
	      		var Bookmark = StackMob.Model.extend({ schemaName: 'Bookmarks' }); 
	      		var create_bookmark = new Bookmark({ username: StackMob.getLoggedInUser(), artist_name: artist, video_url: music_video_url, product_title: item_title, product_image: item_image, buy_url: item_buyURL });
			    create_bookmark.create({
			      success: function(model) {
			        console.debug(model);
			      },
			      error: function(model, response) {
			        console.debug(model);
			        console.debug(response);
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
				        					console.debug("website url" + get_buyurl);
				        					console.debug("db url" + resultsAsJSON[e].buy_url[r]);
				        					console.debug("there's a match");
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