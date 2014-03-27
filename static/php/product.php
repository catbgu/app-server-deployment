<?php
  $video_url = $_GET['video_url'];
  $buy_url = $_GET['buy_url'];
  $artist_name = $_GET['artist_name'];
  $product_image = $_GET['product_image'];
  $product_title = $_GET['product_title'];
  $retailer_price = $_GET['price'];
  $retailer_logo = $_GET['retailer_logo'];
  $product_description = $_GET['product_description'];
?>
<!DOCTYPE html>
<!--[if IE 8]>         <html class="no-js lt-ie9" lang="en" manifest="../../../inspired.appcache"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable = no" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="description" content="Shop styles from the hottest music videos. Inspired is the destination to keep up with your favorite celebrity fashion trends." />
  <meta name="keywords" content="celebrity clothing, fashionable clothing, fashionable clothes, clothing, clothes, clothing store, clothes stores, women clothes stores, online clothes store, female clothing stores, clothing store online, celebrity fashion for cheap, cheap celebrity fashion, cheap fashion, cheap dresses, cheap dresses online, celebrity fashion cheap , trendy clothes, trendy clothing, trendy womens clothes, trendy dresses, shopping app, apple shopping app, shopping site, iPhone shopping apps, shopping app clothes, fashion shopping app, shop smartphone apps, fashion style apps, style advice app, style inspiration app, shop by celebrity, celebrity shopping app, celebrities fashion looks, style inspiration site, celebrity fashion, celebrity inspired style ideas, free app, pop music videos app, urban music app" />
  <meta name="author" content="inspiredapp.tv" />   

  <meta property="og:type" content="website"/>
  <meta property="og:url" content="http://www.inspiredapp.tv"/>
  <meta property="og:site_name" content="Inspired"/> 
  <meta property="og:title" content="Inspired">
  <meta property="og:description" content="Shop styles from the hottest music videos. Inspired is the destination to keep up with your favorite celebrity fashion trends." />
  <meta property="og:image" content="http://inspiredapp.tv/img/icons/icon-196.png" />

  <link rel="canonical" href="http://www.inspiredapp.tv/">
  <link rel="publisher" href="https://plus.google.com/102711944033891399361"/>       
  <!-- Icon -->
  <link rel="apple-touch-icon"   href="http://inspiredapp.tv/img/icons/icon-76.png" />
  <link rel="apple-touch-icon" sizes="76x76"   href="http://inspiredapp.tv/img/icons/icon-76.png" />
  <link rel="apple-touch-icon" sizes="120x120"   href="http://inspiredapp.tv/img/icons/icon-120.png" />
  <link rel="apple-touch-icon" sizes="152x152"   href="http://inspiredapp.tv/img/icons/icon-152.png" />
  <link rel="shortcut icon" sizes="196x196"   href="http://inspiredapp.tv/img/icons/icon-196.png">
  <!-- Style CSS -->
  <link rel="stylesheet" href="http://inspiredapp.tv/css/foundation.css" />

  <title>Inpired | <?php echo $product_title; ?></title> 
</head>
<body>
  <div class="screen">
    <div class="settings-menu">
      <a class="settings-back">Back</a>
      <a class="settings-back-back">Back</a>
      <a class="settings-logout" href="">Logout</a>
      <div class="settings-title">Settings</div>      
      <ul class="settings-menu-list">
        <li class="my-profile">My Profile</li>
        <li class="email-preferences">Email Preferences</li>
        <li class="invite-friends">Invite Friends</li>
        <li class="send-feedback">Send Feedback</li>
        <li class="help">Help</li>
        <li class="legal">Legal</li>
      </ul>
      <div class="ajax-container"></div>
      <div class="settings-footer">Inspired - v.0.1</br>Copyright Invidio, Inc 2013</div>  
    </div>   
    <div class="content">    
      <!--<nav class="top-bar">
          <a class="back-btn" href="javascript:;" onclick="location.reload();location.href='javascript:history.go(-1)'"></a>
          <a class="close-retailer-btn" href="javascript:;"></a>
          <a class="name" href="javascript:;" onclick="location.reload();location.href='music.html'">Inspired</a>
      </nav>-->
      <div class="spinner-wrap"><div id="spinner"><img src="http://inspiredapp.tv/img/spinner.gif"></div></div>
      <div class="main-container-item">
        <div class="row" id="product-page">
          <div class="small-6 large-5 columns" style="top: -30px;">
            <ul class="clearing-thumbs clearing-feature product-image">
              <li class="clearing-featured-img"><a href=""><img src=""></a></li>
            </ul>
            <a class="maximize-btn">
        <img src="http://inspiredapp.tv/img/maximize.svg" type="image/svg+xml" width="250" class="maximize-btn" />
      </a>
          </div>

        <!-- Javascript at the bottom of the page  -->  
        </div>  

        <div id="share-box" class="reveal-modal">
          <ul class="small-block-grid-4 large-block-grid-4">
            <li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Finvid.io" target="_blank"><img src="http://inspiredapp.tv/img/webicon-facebook.svg" type="image/svg+xml" /></a></li>
            <li><a href="https://twitter.com/share?url=http%3A%2F%2Finvid.io" target="_blank"><img src="http://inspiredapp.tv/img/webicon-twitter.svg" type="image/svg+xml" /></a></li>        
            <li><a href="https://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.flickr.com%2Fphotos%2Fkentbrew%2F6851755809%2F&media=http%3A%2F%2Ffarm8.staticflickr.com%2F7027%2F6851755809_df5b2051c9_z.jpg&description=Next%20stop%3A%20Pinterest" data-pin-do="buttonPin"><img src="../../../../static/img/webicon-pinterest.svg" type="image/svg+xml" /></a></li>
            <li><a href="mailto:?subject=Check this mad outfit&amp;body=I found this outift on http://www.invid.io/~~~."><img src="http://inspiredapp.tv/img/webicon-mail.svg" type="image/svg+xml" /></a></li>    
          </ul>
          <a class="close-reveal-modal">&#215;</a>
        </div>

        <div class="row product-buttons">
          <a id="bookmark-item-btn" class="small-6 large-6 columns item-btn" href="#"></a>
          <a data-reveal-id="share-box" class="small-4 large-6 columns item-btn" href="#"></a>
        </div>
      
        <div id="retailer-list" style="margin-bottom:0px;">
          <div class="row" >
            <div class="small-1 large-3 columns" style="color:#fff">.</div>
            <div class="small-10 large-6 columns">
              <a class="retailer-btn" href="" target="_blank">
                <div class="columns" style="padding: 0">
                  <img src=""/>
                  <div class="retailer-price">Retail Price Here</div>
                </div>
              </a>
            </div>
            <div class="small-1 large-3 columns"  style="color:#fff">.</div>
          </div>  
        </div>
      </div>
      <div id="footer-container"><iframe id="footer-container-iframe" src="" seamless="yes"></iframe></div>   
    </div>
  </div>
  <!--FOOTER-->
  <!--<div class="footer">
    <a href="javascript:;" class="footer-settings"></a>
    <a href="javascript:;" class="footer-retailer-back"></a>
    <a href="javascript:;" class="footer-retailer-fwd inactive"></a>
    <a href="javascript:;" class="footer-btn footer-bookmarks">Bookmarks</a>
    <a href="javascript:;" class="footer-btn footer-following">Following</a>
  </div>-->
  
  <!--SCRIPTS-->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
  <script type="text/javascript" src="http://static.stackmob.com/js/stackmob-js-0.9.2-bundled-min.js"></script>
  <script src="http://inspiredapp.tv/js/vendor/custom.modernizr.js"></script>
  <script src="http://inspiredapp.tv/js/foundation/foundation.js"></script>
  <script src="http://inspiredapp.tv/js/foundation/foundation.reveal.js"></script>
  <script src="http://inspiredapp.tv/js/foundation/foundation.clearing.js"></script>
  <script src="http://inspiredapp.tv/js/js.functions.js"></script>
  <script src="http://inspiredapp.tv/js/fastclick.js"></script>
  <script type="text/javascript">
  //Stackmob Auth
  StackMob.init({
    publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
    apiVersion:       1
  });

  var video_url = "<?php echo $video_url; ?>";
  var buy_url = "<?php echo $buy_url; ?>";
  var product_image_url = "<?php echo $product_image; ?>";
  var retailer_price = "<?php echo $retailer_price; ?>";
  var product_image_title = "<?php echo $product_title; ?>";
  var first_path = product_image_url.split("/")[0] + "/" + product_image_url.split("/")[1] + "/" + product_image_url.split("/")[2] + "/" + product_image_url.split("/")[3] + "/" + product_image_url.split("/")[4] + "/" + product_image_url.split("/")[5] + "/" + product_image_url.split("/")[6] + "/" + product_image_url.split("/")[7] + "/" 
  var correct_img_url = first_path + encodeURIComponent(product_image_url.split("/").pop());
  //Get description
  var Look = StackMob.Model.extend({ schemaName: 'Look' });  
  var Looks = StackMob.Collection.extend({ model: Look });
  var item = new Looks();
  var f = new StackMob.Collection.Query();
  f.equals('video_url', video_url);
  item.query(f, {
    success: function(results) {
      var resultsAsJSON = results.toJSON();
      // console.debug(resultsAsJSON[0]);
      // console.debug(first_path + encodeURIComponent(product_image_url.split("/").pop()));

      for(var i = 0; i < resultsAsJSON.length; i++) {
        // console.debug(resultsAsJSON[i].product_image.length);
        console.debug("length " + resultsAsJSON[i].product_image.length);
        
        for(var c = 0; c < resultsAsJSON[i].product_image.length; c++) {
          console.debug("result " + resultsAsJSON[i].product_image[c]);
          if (correct_img_url.indexOf('inspiredapp.tv') >= 0) {
            product_image_url = correct_img_url;
          }
          if (resultsAsJSON[i].product_image[c] == product_image_url) {
            //Product title and Description 
            $( "#product-page" ).append("<div class='small-6 large-7 columns'><div class='product-title'>"+ product_image_title +
                                        "</div><div class='product-description'>"+ resultsAsJSON[i].product_description[c] +"</div></div>");
            $(".retailer-btn").attr('href', resultsAsJSON[i].buy_url[c]);
          }
        }
       }
    }
  });

  var product_description = "<?php echo $product_description; ?>";
  var retailer_logo = "<?php echo $retailer_logo; ?>".replace(/\ /g, '').toLowerCase();

  $(document).ready(function(){
    //Retail Price
    var b=retailer_price;
    var retailer_price_fix= b.substring(0,b.length-2) + '.' + b.substring(b.length-2);
    $('.retailer-price').text('$' + retailer_price_fix);
    //Retail Company Image
    $("#retailer-list img").attr('src', 'http://inspiredapp.tv/img/retailers/' + retailer_logo + '.png');
    //Product Image
    $("#product-page .clearing-featured-img a").attr('href', product_image_url);
    $("#product-page .clearing-featured-img img").attr('src', product_image_url);
  });

  //BOOKMARKS
  var user = StackMob.getLoggedInUser();  
  var title = $(".product-title").text();
  var Bookmark = StackMob.Model.extend({ schemaName: 'Bookmarks' });  
  var Bookmarks = StackMob.Collection.extend({ model: Bookmark }); 
  var mark = new Bookmarks();
  var artist_name = "<?php echo $artist_name; ?>";
  var a = new StackMob.Collection.Query();
  a.equals('video_url', video_url).equals('username', user);
  mark.query(a, {
    success: function(results) {
      var resultsAsJSON = results.toJSON();
      for(var i = 0; i < resultsAsJSON.length; i++) {
        if (i >= 0) {
          $("div.product-buttons a").attr('class', 'small-6 large-6 columns item-btn selected');
        } else {
          $("div.product-buttons a").attr('class', 'small-6 large-6 columns item-btn');
        }
       }
    }
  });
$("#bookmark-item-btn").live('click',function(e){
  e.preventDefault(); 
  if($(this).hasClass('selected')) {
    alert('if has class selected');
    mark.destroyAll(a, {
      success: function(model) {
        console.debug(model);
        $(this).removeClass('selected');
      },
      error: function(model, response) {
        console.debug(model);
        console.debug(response);
      }
    });
  } else {
    $(this).addClass('selected');
    alert('if has class not selected');
    var myBookmark = new Bookmark({ product_image: product_image_url, username: user, artist_name: artist_name, video_url: video_url, product_title: product_image_title });
    myBookmark.create({
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
  </script>
  <script>
      //add fastclick: https://github.com/ftlabs/fastclick
      window.addEventListener('load', function() {
          FastClick.attach(document.body);
      }, false);    
  </script> 
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-42670109-1', 'invid.io');ga('send', 'pageview');
  </script>    
</body>
</html>