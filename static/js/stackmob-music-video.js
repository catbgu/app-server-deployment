//Stackmob Auth
StackMob.init({
  publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
  apiVersion:       1
});
$(document).ready(function() {

  var look = StackMob.Model.extend({ schemaName: 'Look' });
  var looks = StackMob.Collection.extend({ model: look }); 
  var lookList = [];
  var k = 0;
  var item = new looks();
  var a = new StackMob.Collection.Query();
  var artist_name = window.location.pathname.split('/');
  var artist1 = artist_name[2].replace(/\-/g, ' ');
  var artist = artist1.replace(/\b./g, function(m){ return m.toUpperCase(); });

  var video_name = artist_name[3].substr(0, artist_name[3].indexOf('.')).replace(/\%20/g, ' ');

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
							  "<div onclick='window.open(&#39;" + resultsAsJSON[k]['buy_url'][i] + "&#39;,&#39;popupwindow&#39;);return false;' class='button add' target='_blank'>Purchase</div>"+

							  "<a href='' class='button star'>Bookmark</a>"+
							  "<a href='' class='button share-product'>Share</a>"+
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
            if(mobile){
              $('iframe').css('height','200px');
			  $('.looks-container').css('padding-bottom', '35px');
            } else {
			  $('.footer').css('display', 'none');
			  var tablet = navigator.userAgent.match(/iPad/i);		
			  if(tablet) {
				$('.footer').css('display', 'block');
			  }
			}

            $('.item').live('click', function(e){
              e.stopImmediatePropagation();
              e.preventDefault();
            });
			$('.item').live('mouseenter mouseleave', function(event){
				if (event.type == 'mouseenter') {	
					$(this).children().last().fadeIn();
				} else {
					$(this).children().last().fadeOut();
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


	// var artist_name = artist;
	// var user = StackMob.getLoggedInUser();  
	// var title = "";
	// var Bookmark = StackMob.Model.extend({ schemaName: 'Bookmarks' });  
	// var Bookmarks = StackMob.Collection.extend({ model: Bookmark }); 
	// var mark = new Bookmarks();
	// var a = new StackMob.Collection.Query();
	// a.equals('video_url', video_url).equals('username', user);
	// mark.query(a, {
	// 	success: function(results) {
	// 	  var resultsAsJSON = results.toJSON();
	// 	  for(var i = 0; i < resultsAsJSON.length; i++) {
	// 	    if (i >= 0) {
	// 	      console.debug($(this + ".star").text());
	// 	    } else {
	// 	      console.debug($(this + ".star").text());
	// 	    }
	// 	   }
	// 	}
	// });


	var item_title = "";
	var item_buyURL = "";
	$(".star").live('click',function(e){
	  e.preventDefault(); 
	  item_title = $(this).parent(".button_container").parent(".item").find(".product_container").find(".product_title").text().slice(0, -1);
	  item_buyURL = $(this).parent(".button_container").find(".add").attr("onclick").replace("window.open('", "").replace("','popupwindow');return false;", "");
	  console.debug(item_buyURL);
	  if($(this).hasClass('selected')) {
	    $(this).removeClass('selected');
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
	    // alert('if has class not selected');
	    // console.debug($(".product-title").text());
	    // var myBookmark = new Bookmark({ username: user, artist_name: artist_name, video_url: video_url, product_title: product_image_title });
	    // myBookmark.create({
	    //   success: function(model) {
	    //     console.debug(model);
	    //   },
	    //   error: function(model, response) {
	    //     console.debug(model);
	    //     console.debug(response);
	    //   }
	    // });
	  }

	});




});