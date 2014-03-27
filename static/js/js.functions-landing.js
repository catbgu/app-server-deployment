var screenWidth = $(window).width();
var screenHeight = $(window).height();

//Stackmob Auth
StackMob.init({
	publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
	apiVersion:       1
});

$(document).ready(function(){
	// Check if a new cache is available on page load. Swap it in and reload the page to get the new hotness.
	// window.addEventListener('load', function(e) {
	//   window.applicationCache.addEventListener('updateready', function(e) {
	//     if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	//       // Browser downloaded a new app cache. Swap it in and reload the page to get the new hotness.
	//       window.applicationCache.swapCache();
	//       window.location.reload();
	//     } 
	//   }, false);
	// }, false);	

	$(document).foundation(); 

    //force bookmark on iOS
    // if (("standalone" in window.navigator) && !window.navigator.standalone && navigator.userAgent.match(/(iPod|iPhone)/i)){
    //     $('.landing-button-group, .landing-footer').hide();
    //     $('body').append('<div class="landing-footer-message">Tap "<b style="letter-spacing: -1px">Add to Home Screen</b>" to install</br><span>&#8595;</span></div>');
    // } 
    // if (("standalone" in window.navigator) && !window.navigator.standalone && navigator.userAgent.match(/(iPad)/i)){
    //     $('.landing-button-group, .landing-footer').hide();
    //     $('body').append('<div class="landing-footer-message ipad"><span>&#8593;</span></br>Tap <div class="safari-share-icon"></div> and then "<b style="letter-spacing: -1px">Add to Home Screen</b>" to install</div>');
    // }
    // if (navigator.userAgent.match(/(Android)/i)){
    //     $('body').append('<div class="landing-footer-message android"><span>&#8593;</span></br>Tap<div class="android-settings-icon"></div>and then "<b style="letter-spacing: -1px">Add to home screen</b>" to install</div>');
    // }    
    //remove scroling: https://gist.github.com/amolk/1599412
	
	/* Commented out function b/c otherwise it auto-scrolls the textareas too far up on mobile */
    /*document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, true);
    window.onresize = function() {
      //$(document.body).width(screenWidth).height(screenWidth);
    }
    $(function() {
      window.onresize();
    });*/   

    //fastclick: https://github.com/ftlabs/fastclick
	window.addEventListener('load', function() {
	    FastClick.attach(document.body);
	}, false);
	$(function() {
	    FastClick.attach(document.body);
	});    

	//Define Click Event for Mobile
	if( 'ontouchstart' in window ){ 
		var click = 'touchstart'; 
	}else{ 
		var click = 'click'; 
	}	

    $(".landing-container, .landing-container-wrapper").css('height', screenHeight);

	window.onload = function(){
	  // $(".landing-container-wrapper, .landing-button").fadeIn(0);
	  // $(".footer").fadeIn(0);
	};    	

	$("#email-reg-btn").on(click, function(e){ 
		e.preventDefault();
		e.stopPropagation();
		$(".email-login-container").fadeIn(50);
		$("#facebook-connect-btn, #email-reg-btn").hide();
	});  

	$(".reset-passwd").on(click, function(e){ 
		e.preventDefault();	
		$(".email-login-container").hide();
		$(".email-reset-passwd-container").fadeIn(200);
	});	

	$("#back-login").on(click, function(e){ 
		e.preventDefault();	
		$(".email-login-container, #pass-confirm, .alert-box.radius").hide();
		$("#facebook-connect-btn, #email-reg-btn, .reset-passwd").fadeIn(200);
		$("#user, #pass, #pass-confirm").val('');
	});

	$("#back-reset-passwd").on(click, function(e){ 
		e.preventDefault();	
		e.stopPropagation();
		$(".email-reset-passwd-container, .alert-box.radius").hide();
		$(".email-login-container").fadeIn(200);
		$("#emailreset").val("");

	});	

	$('#facebook-connect-btn').on(click, function() {
		fblogin();
	});
	
	$('#get-reset-passwd-button').on(click, function() {
		forgotpass();
		return false;
	});

	$('#get-new-passwd-button').on(click, function() {
		$(".alert-box.radius").hide();
		//check pass length
		if ($('#newpassword').val().length <= 6){
			$('#passwordresetalert').text('Your new password must have at list 6 characters. Try another one!').css({'background-color': '#FA2D2D', 'border-color' : '#EB2D2D'}).fadeIn();
			return false;
		}		
		var user = new StackMob.User({ username: $('#emailreset').val().toLowerCase() });
		user.loginWithTempAndSetNewPassword( $('#temppassword').val() , $('#newpassword').val(), false, {
		    success: function(model) {
		        Redirect();
		    },
		    error: function(model, response) {
		        $('#passwordresetalert').text('Temporary password is incorrect. Try again.').css({'background-color': '#FA2D2D', 'border-color' : '#EB2D2D'}).fadeIn();
		    }
		});
		return false;
	});
	
	//User email login function.
	$(window).load(function(){

		//Mobile and Web on enter function
		$('.email-login-container').on("keypress", $("#get-inspired-button"),(function (e) {
            if (e.which == 13) {
                login();
                return false;
            }
        }));

		function login() {
			var user = new StackMob.User({ username: $('#user').val(), password: $('#pass').val() });
			user.login(false, {
				success: function(model) {
					//Redirect if the user logged in
					Redirect();
				},
				error: function(model, response) {
					$("#emailAlert").text('Your username and password don\'t match.').fadeIn();
				}
			});    
		} //Login function END
		
		$('#get-inspired-button').on(click, function() {
			var checkuser = $('#user').val();
			var pass = $('#pass').val();
			var passconf = $('#pass-confirm').val();
			$('.alert-box.radius').hide();
			if( checkuser == '' ) {
				$("#emailAlert").text('Invalid email address. Try again.').fadeIn();
			} else if(checkuser != '' && pass != '' && passconf != ''){
				if(pass == passconf) {
					//alert('creating new user');
				var user = new StackMob.User({ username: checkuser, password: pass});
				user.create({
  					success: function(model, result, options) {
  						$('#cover').fadeIn();
  						//alert('user created');
  						var userlogin = new StackMob.User({ username: $('#user').val(), password: $('#pass').val() });
						userlogin.login(false, {
							success: function(model) {
								//Redirect if the user logged in
								window.location.href = "../static/php/login.php?email=" + checkuser;
							},
							error: function(model, response) {
								$("#emailAlert").text('Your username and password don\'t match our records.').fadeIn();
							}
						});    
  					},
  					error: function(model, result, options) {
  						$("#emailAlert").text('Error trying to register your account. Please report this!').fadeIn();
  					}
				});

				} else {
					$("#emailAlert").text('Your password entries don\'t match.').fadeIn();
				}
			} else {
				login();
			} 
			return false; //this is here to halt the default submit button event of submitting the form.  we just want to perform our custom login() action, not the native browser form submission.
		});
	}); // User email login function END
	
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '293386564143571', // FB App ID
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
		
		FB.getLoginStatus(function(response) {
			if (response.status == 'connected') {
				//needs to click fb button
			} else if (response.status == 'connected' && StackMob.isLoggedIn()) {
				fblogin();
			} else {
				//console.log('not logged in');
			}
		});
	};
 
  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = '//connect.facebook.net/en_US/all.js';
     d.getElementsByTagName('head')[0].appendChild(js);
   }(document));

   //Login with Facebook
   function fblogin() {
		FB.login(function(response) {
			if (response.authResponse) {
				var accessToken = response.authResponse.accessToken;
				FB.api('/me', function(response) {
					var user = new StackMob.User({ username: response.email, name: response.name });
					user.loginWithFacebookAutoCreate(accessToken, true,{
						success: function(){
    						Redirect();
  						},
						error: function(){
							//console.debug(response.email);
							var user2 = new StackMob.User({ username: response.email });
							user2.fetch({
								success: function(model) {
									var firstname = response.name.substr(0, response.name.indexOf(' ')); 
									$("#email-reg-btn").trigger("click");
									$("#emailAlert").html(firstname + ", you already have an associated account with this email.").fadeIn();
									$("#user").val(response.email);
								}, error: function() {}
							});
						}
					});
				});
				//Redirect();
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'email'});
	}

	//Redirects after logging into facebook.
	function Redirect() {
		window.location.href = "music.html";
	}

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i) ? true : false;
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		any: function() {
			return (isMobile.Android() || isMobile.iOS());
		}
	};
	window.onorientationchange = function() { window.location.reload(); };

}); // end of top code

function isEmailFormat(inputValue){
	var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!regex.test(inputValue))
	    return false;
	else
	    return true;
} 

function checkEmailInDB(){
	var inputValue = document.getElementsByName("user")[0].value;
	if (isEmailFormat(inputValue)){
		$(".alert-box.radius").hide();
		var checkuser = $('#user').val();
		var user = new StackMob.User({ username: checkuser });
		user.fetch({
			success: function(model) {
				//user found in the db
				$("#pass-confirm").hide();
			}, error: function() {
				//register new account
				$("#pass-confirm, #emailAlert-create-account").fadeIn();
				$(".reset-passwd").hide();
			}
		});
	} else{
		$("#emailAlert").text("Invalid email address. Try again.").fadeIn();
		if (document.getElementsByName("user")[0].placeholder != 'Email Address'){
			document.getElementsByName("user")[0].value='';
			document.getElementsByName("user")[0].placeholder='Email Address';
		}else{
			document.getElementsByName("user")[0].placeholder='Email Address';
		}
	}	
}

function checkPass(){
	var passValue = document.getElementsByName("pass")[0].value;
	$(".alert-box.radius").hide();
	
	if ($('#pass').val().length >= 6){
		return true;
	} else{
		$("#emailAlert").text("Password must be at least 6 characters.").fadeIn();
		if (document.getElementsByName("pass")[0].placeholder != 'Password'){
			document.getElementsByName("pass")[0].value='';
			document.getElementsByName("pass")[0].placeholder='Invalid Password';
		}else{
			document.getElementsByName("pass")[0].placeholder='Password';
		}
		return false;
	}
}

$('#pass').on("blur", function(){
	checkPass();
});

$('#pass-confirm').on("blur", function(){
	$(".alert-box.radius").hide();
	
	if ($('#pass').val() != $('#pass-confirm').val()){
		$("#emailAlert").text("Your password entries don't match. Try again.").fadeIn();

		return false;
	}
});

function forgotpass() {
	var inputValue = document.getElementsByName("emailreset")[0].value;
	if (isEmailFormat(inputValue)){
		$(".alert-box.radius").hide();
		var user = new StackMob.User({ username: $('#emailreset').val() });		
		user.forgotPassword({ 
			success: function(model) {
				$(".email-reset-passwd-container").hide();
				$(".email-new-passwd-container, #passwordresetalert").fadeIn(200);
			},
			error: function(model, response) {
				$("#emailAlert2").text('We couldn\'t find this email in our database. Try another one.').fadeIn();
			}
		});
	} else {
		$(".alert-box.radius").fadeIn();
		if (document.getElementsByName("emailreset")[0].placeholder != 'Account Email Address'){
			document.getElementsByName("emailreset")[0].value='';
			document.getElementsByName("emailreset")[0].placeholder='Invalid Email Address';
		}else{
			document.getElementsByName("emailreset")[0].placeholder='Account Email Address';
		}
	}	
}
