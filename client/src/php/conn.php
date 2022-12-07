<?php
$hostname = "localhost";
$database = "trails";
$username = "root";
$password = "";
#Connect to the database
//connection String
$connect = mysql_connect($hostname, $username, $password)
or die('Could not connect: ' . mysql_error());
//select database
mysql_select_db($database, $connect);
//Select The database
$bool = mysql_select_db($database, $connect);
if ($bool === False){
   print "can't find $database";
}
// get data and store in a json array
$query = "SELECT * FROM trails";
$from = 0;
$to = 30;
$query .= " LIMIT ".$from.",".$to;
 
$result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $trails[] = array(
		'ID' => $row['ID'],
        'Name' => $row['Name'],
        'TrailMapURL1' => $row['TrailMapURL1'],
		'TrailMapURL2' => $row['TrailMapURL2'],
		'GoogleMapsEmbed' => $row['GoogleMapsEmbed'],
		'LiftOperationTimes' => $row['LiftOperationTimes'],
		'OpenDate' => $row['CloseDate'],
		'CloseDate' => $row['CloseDate']
      );
}
 
echo json_encode($trails);
?>