<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
        <script src="script.js"></script>
        <link href="style.css" rel="stylesheet">
    </head>
    <body>
<?php
require_once 'src/Google_Client.php';
require_once 'src/contrib/Google_CalendarService.php';
session_start();

$client = new Google_Client();
$client->setApplicationName("Google Calendar PHP Starter Application");

// Visit https://code.google.com/apis/console?api=calendar to generate your
// client id, client secret, and to register your redirect uri.
 $client->setClientId('923484372860-3l8b2uq3jvhrb8g25rr7hi4q5s2kf367.apps.googleusercontent.com');
 $client->setClientSecret('kqpPNFAqDkinuXndCDl9R3uh');
 $client->setRedirectUri('http://localhost/calendar/simple.php');
 $client->setDeveloperKey('AIzaSyDaXnRtQWz2WzB1sUDEACAm52aQzFYuJpI');
$cal = new Google_CalendarService($client);
if (isset($_GET['logout'])) {
  unset($_SESSION['token']);
}

if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  $_SESSION['token'] = $client->getAccessToken();
  header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
}

if (isset($_SESSION['token'])) {
  $client->setAccessToken($_SESSION['token']);
}

if ($client->getAccessToken()) {
  $calList = $cal->calendarList->listCalendarList();
?>
<div id="calendarList"> 
<ul id="items">
<?php
  foreach($calList['items'] as $calendar)
  {
      echo '<li class="calendar" id="'.urlencode($calendar['id']).'"><span>'.$calendar['summary'].'</span><span class="ui-icon ui-icon-pencil edit" style="float:right; display:none"></span></li>';    
  }
?>
</ul>
</div>
<div id="eventList"></div>
<?php

$_SESSION['token'] = $client->getAccessToken();
} else {
  $authUrl = $client->createAuthUrl();
  print "<a class='login' href='$authUrl'>Connect Me!</a>";
}
?>
    </body>
</html>