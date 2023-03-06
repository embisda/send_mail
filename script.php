<?php
if(isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['person'])) {
	$email = $_POST['email'];
	$email = htmlspecialchars($email);
    $email = urldecode($email);
    $email = trim($email);
		
	$phone = $_POST['phone'];
	$phone = htmlspecialchars($phone);
    $phone = urldecode($phone);
    $phone = trim($phone);
	
	$name = $_POST['person'];
	$name = htmlspecialchars($name);
    $name = urldecode($name);
    $name = trim($name);
	
	$job = $_POST['job'];
	$url = $_POST['path'];
	
	$to = 'receiver@email.ru';

    $subject = 'Заявка на сайте site.ru - ' . $job;

	$message = 'Спасибо, ' . $name . ', Вы оставили заявку по вопросу: ' . $job . '!<br>Мы свяжемся с вами в течение часа (в рабочие часы учреждения) по телефону ' . $phone . '.<br>Контакты исполнителя направим по электронной почте ' . $email . '<br><br>Форма отправлена со страницы ' . $url;
	
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	$headers .= "From: My Company Name <company@email.ru>\r\n";
    $headers .= "Bcc: bcc1@email.ru\r\n";
    $headers .= "Bcc: bcc2@email.ru\r\n";
    $headers .= "Reply-To: reply@email.ru\r\n";
	
	if (mail($to, $subject, $message, $headers)) {
        echo json_encode([
            'result' => true,
            'message' => 'Message send'
        ]);
    } else {
        echo json_encode([
            'result' => false,
            'message' => 'Message did not send'
        ]);
    }
	
} else {
	echo 'expected data was not found in POST';
};
?>