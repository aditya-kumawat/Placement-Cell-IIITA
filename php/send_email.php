<?php
	$email = $_POST['email'];
	$contact = $_POST['phoneno'];
	$message = $_POST['message'];
	$subject = "Company Registration";
	$msg = "Email : " . $message . "<br> Contact No. : " . $contact . "<br>	Message : " . $message;
	mail('aditya19496@gmail.com', $subject, $msg);
	header('Location: ../contact_us.php')
?>