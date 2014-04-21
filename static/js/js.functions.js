var screenWidth = $(window).width();
var screenHeight = $(window).height();

//Stackmob Auth
StackMob.init({
	publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
	apiVersion:       1
});

//The lightbox for the product page
/*function lightboxExit() {
	$('#lightbox').fadeOut(300, function() { $(this).remove(); });	
	$('#lightbox ul li img').removeClass('active');
}*/
$(document).ready(function(){
	$("#footer-container").css('top', $(document).height() + "px");

	// Check if a new cache is available on page load. Swap it in and reload the page to get the new hotness.
	window.addEventListener('load', function(e) {
	  window.applicationCache.addEventListener('updateready', function(e) {
	    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	      // Browser downloaded a new app cache. Swap it in and reload the page to get the new hotness.
	      window.applicationCache.swapCache();
	      window.location.reload();
	    } 
	  }, false);
	}, false);

	$(document).foundation(); 
	//Define Click Event for Mobile
	if( 'ontouchstart' in window ){ 
		var click = 'touchstart'; 
	}else{ 
		var click = 'click';
	}	

    $("#spinner").css('top', screenHeight/2+10);

	window.onload = function(){
	  $(".spinner-wrap").fadeOut(50);
	  $(".footer").fadeIn(100);
	};  	

	$('.settings-logout').on(click, function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		var user = new StackMob.User();  //no username necessary, since only 1 user is logged in on the device at a time
		user.logout();
		document.location.href = 'http://inspiredapp.tv/app/templates/landing.html';
	});
/*FOOTER BUTTONS*/
  //Settings MENU
	/*	Reveal Menu */
	$('.footer-settings').on(click, function(e){
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
  //END Settings MENU
  
  
  //Bookmark & Following buttons
	var Follow_page = StackMob.Model.extend({ schemaName: 'Follows' });
  	var Follows_page = StackMob.Collection.extend({ model: Follow_page }); 
  	var fols_page = new Follows_page();
  	var q = new StackMob.Collection.Query();
  	var Bookmark_page = StackMob.Model.extend({ schemaName: 'Bookmarks' });
  	var Bookmarks_page = StackMob.Collection.extend({ model: Bookmark_page }); 
  	var marks_page = new Bookmarks_page();
 	var b = new StackMob.Collection.Query();
 	b.orderAsc('product_title').equals('username', StackMob.getLoggedInUser());
  	q.orderAsc('artist_name').equals('username', StackMob.getLoggedInUser());
  	
    $('a.footer-btn').on(click, function(e){
        e.preventDefault();
        var position = $('#footer-container').position();
        if ($(this).hasClass('footer-bookmarks')){
        	var divActive = 'bookmarks';
        	var divInactive = 'following';
        } else {
        	var divActive = 'following';
        	var divInactive = 'bookmarks';
        }
        if ($('.footer-'+divInactive).hasClass('selected')){
        	if ($('.footer-following').hasClass('selected')) {
        		marks_page.query(b, {
				    success: function(results) {
				      var resultsAsJSON = results.toJSON();
				      //BOOKMARK
				      $("#footer-container").html('');
			 	     	for(var i = 0; i < resultsAsJSON.length; i++) {
							$("#footer-container").append(""+
							"<a href='http://eraytonyali.com/invidio/templates/product.php?video_url=" + resultsAsJSON[i]['video_url'] + "&artist_name=" + resultsAsJSON[i]['artist_name'] + 
								"&product_image=" + resultsAsJSON[i]['product_image'] + "&product_title=" + resultsAsJSON[i]['product_title'] + "' class='look-item'>"+
								"<img class='look-item-img' src='" + resultsAsJSON[i]['product_image'] + "' />"+
								"<div class='look-item-info'>"+
									"<div class='look-item-title'>" + resultsAsJSON[i]['product_title'] + "</div>"+
								"</div>"+
							"</a> ");
						}
			  	  	}
			  	});
        	} else {
        		fols_page.query(q, {
				   	 success: function(results) {
				    	var resultsAsJSON = results.toJSON();
				    	//FOLLOWING
				    	$("#footer-container").html('');
				   	   	for(var i = 0; i < resultsAsJSON.length; i++) {
				   	    	$("#footer-container").append("<a href='http://eraytonyali.com/invidio/templates/artists/" +
				   	    	 resultsAsJSON[i]['artist_name'].replace(/\ /g, '-').toLowerCase() + 
				   	    	 "/artist.html' class='four columns artist-btn'><img class='artist-img' src='http://eraytonyali.com/invidio/static/img/music/artists/"+ 
				   	    	 resultsAsJSON[i]['artist_name'].replace(/\ /g, '-').toLowerCase() +"/"+ resultsAsJSON[i]['cover_image'] +
				   	    	 "' /><div class='artist-name'>"+ resultsAsJSON[i]['artist_name'] +"</div></a> ");
				   	    }
				   	 }
			 	});
        	}
	
			$(this).addClass('selected');
			$('.footer-'+divInactive).removeClass('selected');
        }
        else{
	        if(position.top == 1200){
				$("#footer-container").css('top', $(window).height() + "px");
				position.top = $(window).height();
	        	$(this).addClass('selected');
	        	$(".main-container").css('height',screenHeight);
	        	$("#footer-container").css('height',$(window).height() + "px");
				if ($('.footer-following').hasClass('selected')) {
	        		fols_page.query(q, {
						success: function(results) {
							var resultsAsJSON = results.toJSON();
							//FOLLOWINGS
							$("#footer-container").html('');
						   	for(var i = 0; i < resultsAsJSON.length; i++) {
						    	$("#footer-container").append("<a href='http://eraytonyali.com/invidio/templates/artists/" + resultsAsJSON[i]['artist_name'].replace(/\ /g, '-').toLowerCase() + 
							    		"/artist.html' class='four columns artist-btn'><img class='artist-img' src='http://eraytonyali.com/invidio/static/img/music/artists/"+ 
							    		resultsAsJSON[i]['artist_name'].replace(/\ /g, '-').toLowerCase() +"/"+ resultsAsJSON[i]['cover_image'] +"' /><div class='artist-name'>"+ 
							    		resultsAsJSON[i]['artist_name'] +"</div></a> ");
						    }
						}
				 	});
	        	} else {
	        		marks_page.query(b, {
					    success: function(results) {
						    var resultsAsJSON = results.toJSON();
						    //BOOKMARKS
						    $("#footer-container").html('');
					 	    for(var i = 0; i < resultsAsJSON.length; i++) {
								$("#footer-container").append("<a href='http://eraytonyali.com/invidio/templates/product.php?video_url=" + resultsAsJSON[i]['video_url'] + "&artist_name=" + resultsAsJSON[i]['artist_name'] + 
								"&product_image=" + resultsAsJSON[i]['product_image'] + "&product_title=" + resultsAsJSON[i]['product_title'] + "' class='look-item'><img class='look-item-img' src='" + 
								resultsAsJSON[i]['product_image'] + "' /><div class='look-item-info'><div class='look-item-title'>" + resultsAsJSON[i]['product_title'] + "</div></div></a> ");
							}
				  	  	}
				  	});
	        	}	
				$('#footer-container').attr('class', '').addClass('move-up');
	        }else{
	        	$(".main-container").css('height','100%');
	            $('#footer-container').attr('class', '').addClass('move-down');
	            $(this).removeClass('selected');
	        }
    	}
    });

    $("#footer-container").bind("oanimationend animationend webkitAnimationEnd", function(){
        if($("#footer-container").hasClass('move-up')) $("#footer-container").addClass('move-up-final');
        if($("#footer-container").hasClass('move-down')) $("#footer-container").addClass('move-down-final');
    });   

//Video Screen
	$(".video-poster iframe").css({
		width: '100%',
		height: 529
	});

//Product Screen
	$("#bookmark-item-btn").live(click,function(e){
		e.preventDefault();			
	  $(this).toggleClass('selected');
	});

    $(".maximize-btn").live(click, function(e){ 
		//e.stopImmediatePropagation();
    	//$(".clearing-featured-img img").click(); 

    }); 

//Retailer Button
    $(".retailer-btn").live(click, function(){ 
	    var retailerUrl = $(".retailer-btn").attr("data-src");

		if( 'ontouchstart' in window ){//touch device
			var win=window.open(retailerUrl, '_blank');
			win.focus();
		}else{//non-touch device
			$("#footer-container-iframe").attr("src",retailerUrl); 

	    	$(".main-container").css('height',screenHeight);
	    	$("#footer-container-iframe").css('height',screenHeight-88);
	    	$("#footer-container-iframe").attr("seamless","yes");        	
			$("#footer-container").css('overflow-y','hidden');    		
	    	$("#footer-container").css('padding-left','0');
	    	
	    	$(".back-btn").hide();

			$(".footer-btn, .footer-settings").fadeOut();
			$(".footer-retailer-back, .footer-retailer-fwd").fadeIn();    		
	    	$(".close-retailer-btn").show();
	    	var retailerName = retailerUrl.replace("http://go.redirectingat.com?id=35687X941090&xs=1&url=http%3A%2F%2F","").replace("http://", "").replace("https://", "").split(/([\%\/])/);
	    	$(".name").text(retailerName[0]).css("font-size","18px").attr('onclick', '');
	    	
			$('#footer-container').attr('class', '').addClass('move-up');
			//define variable to store iframe history state
			window.historyState = history.length;
			window.originalHistoryState = history.length;
			$(".footer-retailer-fwd").addClass('inactive');			
		}
    });

	$(".footer-retailer-back").live(click, function(e){ 
		e.preventDefault();
		if ($(".footer-retailer-fwd").hasClass('inactive')){
			window.historyState = history.length;
		}
		if (window.originalHistoryState == window.historyState){
			 $("a.close-retailer-btn").trigger(click);
		}else{
			window.historyState--;
			$(".footer-retailer-fwd").removeClass('inactive');
			history.back();
		}
	});

	$(".footer-retailer-fwd").live(click, function(e){ 
		e.preventDefault();
		if (history.length == window.historyState){
			$(this).addClass('inactive');
		}else{
			window.historyState++;
			if (history.length == window.historyState){
				$(this).addClass('inactive');
			}
			history.forward();			
		}
	});	

    $(".close-retailer-btn").live(click, function(e){
		e.stopImmediatePropagation();
		e.preventDefault();	
    	$(".main-container").css('height','100%');
    	$(".back-btn, .footer-btn, .footer-settings").fadeIn();
    	$(".footer").css('bottom','0');
    	$(".close-retailer-btn, .footer-retailer-back, .footer-retailer-fwd").hide();
    	$(".name").text("Inspired").css("font-size","32px").fadeIn();
    	$(".name").attr("onclick", "location.reload();location.href='../../../music.html'");  
    	$("#footer-container").css('overflow-y','scroll');    		  	
        $('#footer-container').attr('class', '').addClass('move-down');
        $("#footer-container-iframe").attr('src','');
        $(this).removeClass('selected');
    });   

	$('.medium-block-grid-4.large-block-grid-6 li').live({
		mouseenter: function (e) {
			$(this).addClass("hover");
			$(this).find( "img:nth-child(2)" ).addClass("img-border"); 
			$(this).find( "img:nth-child(2)" ).css("opacity", "0.3"); 
			$(this).find( "h5" ).css("color", "#C4C2C2");
		},
		mouseleave: function (e) {
			$(this).removeClass("hover");
			$(this).find( "img:nth-child(2)" ).removeClass("img-border");
			$(this).find( "img:nth-child(2)" ).css("opacity", "1"); 
			$(this).find( "h5" ).css("color", "#000");
		}
	});
	
	/* --Expand image for iOS, other mobile, and PC --- */
	/*var mobile = navigator.userAgent.match(/Android|Windows Phone|BlackBerry/i);
	var iOS = navigator.userAgent.match(/iPhone|iPad/i);
		
	if(iOS) {	
		$('.maximize-btn').bind( "touchstart",function(){ 
			$('.clearing-featured-img').toggleClass('expand-image');
			
			if($('.clearing-featured-img').hasClass('expand-image')){
				$('#product-page .product-image').css('border', 'none'); 
				$('#desc').css('display', 'none');
				$('.maximize-btn').attr('src', 'http://inspiredapp.tv/img/minimize.svg');
				$('.maximize-btn').css('right', '-65px');
			} else {
				$('#product-page .product-image').css('border', '1px solid #c0c0c0');
				$('#desc').css('display', 'block');
				$('.maximize-btn').attr('src', 'http://inspiredapp.tv/img/maximize.svg');
				$('.maximize-btn').css('right', '19px');
			} 
		});	
	} else if(mobile) {
		$('.maximize-btn').on(click,function(){ 
			$('.clearing-featured-img').toggleClass('expand-image');
			
			if($('.clearing-featured-img').hasClass('expand-image')){
				$('#product-page .product-image').css('border', 'none'); 
				$('#desc').css('display', 'none');
				$('.maximize-btn').attr('src', 'http://inspiredapp.tv/img/minimize.svg');
				$('.maximize-btn').css('right', '-65px');
			} else {
				$('#product-page .product-image').css('border', '1px solid #c0c0c0');
				$('#desc').css('display', 'block');
				$('.maximize-btn').attr('src', 'http://inspiredapp.tv/img/maximize.svg');
				$('.maximize-btn').css('right', '19px');
			} 
		});	
	}else {
		$('.maximize-btn').live(click,function(){ 
			$('.clearing-featured-img').toggleClass('expand-image');

			if($('.clearing-featured-img').hasClass('expand-image')){
				$('#product-page .product-image').css('border', 'none'); 
				$('#desc').css('display', 'none');
				$('.maximize-btn').attr('src', 'http://inspiredapp.tv/img/minimize.svg');
				$('.maximize-btn').css('right', '-165px');
			} else {
				$('#product-page .product-image').css('border', '1px solid #c0c0c0');
				$('#desc').css('display', 'block');
				$('.maximize-btn').attr('src', 'http://inspiredapp.tv/img/maximize.svg');
				$('.maximize-btn').css('right', '19px');
			} 
		});
	}*/
	
				
	
	/* ----- CSS Modification for IE browsers ------ */
	/*function detectIE() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		var trident = ua.indexOf('Trident/');

		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		if (trident > 0) {
			// IE 11 (or newer) => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		// other browser
		return false;
	}
	
	//Actual css addition here
	if(detectIE() != false) {
		$('.row.product-buttons').find('*').addClass('ie11');
	}
	
	var mobile = navigator.userAgent.match(/iPhone|iPad|Android|Windows Phone|BlackBerry/i);
	if(mobile){
		$('.row.product-buttons').find('*').removeClass('ie11');
	}*/
	/* -----  END CSS Image Modification for IE browsers ------ */

	// iosSlider and Lightbox functions for video and product pages.
	/* --- Custom Lightbox for Items --- */
	/*$('.lightbox_trigger').live('click', function(e) {
		
		//Because Lightbox gets completely removed on exit: no need for if/else statements. 	
		e.preventDefault();
		
		var item = $(this).attr('id');
		
		//create HTML markup for lightbox window
		var lightbox = 
		'<div id="lightbox">' +
			'<a class="lightbox-exit" onclick="lightboxExit()"><p>X</p></a>' +
			'<div id="content">' + 
				'<iframe src="http://inspiredapp.tv/php/product.php'+ item +'" frameBorder="0"/>' +
			'</div>'; 	
		'</div>';				
		
		//insert lightbox HTML into page
		$('.looks-container').append(lightbox);	
		
		$('#lightbox iframe').css('opacity', '0');
		
		//Loading iframe page first);
		$('#lightbox iframe').ready(function() {
			//$('#lightbox iframe').addClass('afterLoad');
			$('#lightbox iframe').animate({'opacity':'1'}, 1500);
		});

		
						
		
		//Inserting the side thumbnails into lightbox code
		var itemList = $(this).parent().parent().html();
		
		$('#lightbox').prepend('<ul class="clearing-thumbs-lightbox"></ul>');
		$('#lightbox ul').html(itemList);
		
		$('#lightbox ul div img').unwrap();
		$('#lightbox ul img').wrap('<li><a></a></li>');
		
		$('#lightbox ul li img').addClass('notActive');

		//Making the clicked item from the video page; active.
		$('#lightbox ul li img[id="'+item+'"]').removeClass('notActive').addClass('active');		
		
		//On clicking the side thumbnails...
		$('#lightbox ul li img').live('click', function(e) {
			
			var item = $(this).attr('id');
			
			$('#lightbox ul li img').removeClass('active').addClass('notActive');
			$(this).removeClass('notActive').addClass('active');
			
			var itemID = $(this).attr('id');	
			$('#lightbox iframe').attr('src', 'http://inspiredapp.tv/php/product.php'+itemID);
	
		});
		
		$('div#content').css('height', $(document).height() + 'px');
		
	});	*/
});

/* -- For the Lightbox to load product page -- */
/*window.onorientationchange = function() { 
	$('div#content').css('height', $(document).height() + 'px');
};*/

/* -- Height changes due to device orientation -- */
/*var mobile = navigator.userAgent.match(/iPhone|iPod|Android|Windows Phone|BlackBerry/i);
var iPad = navigator.userAgent.match(/iPad/i);

var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';

if(iPad){

	if(orientation == 'portrait'){
		$('#lightbox iframe').css('height','90.2%'); 
	} else {
		$('#lightbox iframe').css('height','86.4%'); 
	}
	
} else if(mobile) {

	if(orientation == 'portrait'){
		$('#lightbox iframe').css('height','80%'); 
	} else {
		$('#lightbox iframe').css('height','69.5%'); 
	}
	
}*/