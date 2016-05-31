<?php
	$email = $_POST['email'];
	$contact = $_POST['phoneno'];
	$message = $_POST['message'];
	$subject = "Company Registration";
	$msg = "Email : " . $message . "<br> Contact No. : " . $contact . "<br>	Message : " . $message;
	mail('placements@iiita.ac.in', $subject, $msg);
	header('Location: ../contact_us.php')
?>
