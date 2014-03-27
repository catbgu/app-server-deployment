<?PHP
	$email = $_GET["email"];

	$subject = "Your Invidio account has been created";
	$headers = "From: contact@inspiredapp.tv\r\n";
	$headers .= "Reply-To: contact@inspiredapp.tv\r\n";
	$message = "Hi there,

	Your account has been created.

	User ID: $email

	Should you have any questions or require additional information, please feel free to contact us using the information below.

	Get Inspired!
	";

	mail($email,$subject,$message,$headers);



	header("Location: ../../templates/music.html");
?>