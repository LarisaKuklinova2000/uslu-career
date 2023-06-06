<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$_POST = json_decode( file_get_contents("php://input"), true );

// Переменные, которые отправляет пользователь
$name = $_POST['vacancyName'];
$empName = $_POST['organizationName'];
$empAdress = $_POST['organizationAdress'];
$salaryMin = $_POST['salaryMin'];
$salaryMax = $_POST['salaryMax'];
$responsibilities = $_POST['responsibilities'];
$students = $_POST['students'];
$workExp = $_POST['workExp'];
$formOfEmployment = $_POST['formOfEmployment'];
$contactPerson = $_POST['contactPerson'];
$email = $_POST['employersEmail'];
$employersPhone = $_POST['employersPhone'];
$file = $_FILES['resumeFile'];

// Формирование самого письма
$title = "Предлагаемая вакансия";
$body = "
<h2>Предлагаемая вакансия</h2>
<b>Название вакансии:</b> $name<br>
<b>Название организации:</b> $empName<br>
<b>Адрес организации:</b> $empAdress<br>
<b>Зарплата:</b> от $salaryMin до $salaryMax<br>
<b>Основные обязанности:</b> $responsibilities<br>
<b>Рассматривают студентов?</b> $students<br>
<b>Нужен ли опыт работы?:</b> $workExp<br>
<b>Форма трудоустрйоства:</b> $formOfEmployment<br>
<b>Контактное лицо:</b> $contactPerson<br>
<b>Почта:</b> $email<br><br>
<b>Телефон для связи:</b> $employersPhone<br>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    $mail->Host       = 'smtp.rambler.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'uslu_career_web@rambler.ru'; // Логин на почте
    $mail->Password   = 'tezwi6-cyzqyh-nohvEx'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('uslu_career_web@rambler.ru', 'Career'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('uslu_career_resume@rambler.ru');

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);