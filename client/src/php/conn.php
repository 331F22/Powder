<?php
$hostname = "localhost";
$database = "db24";
$username = "user24";
$password = "24samp";
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
        'Trail_Map_URL_1' => $row['Trail_Map_URL_1'],
		'Trail_Map_URL_2' => $row['Trail_Map_URL_2'],
		'Google_Maps_Embed_code' => $row['Google_Maps_Embed_code'],
		'Lift_Operation_Time' => $row['Lift_Operation_Time'],
		'Open_Date' => $row['Open_Date'],
		'Close_Date' => $row['Close_Date']
      );
}
 
<script type="text/javascript">
    var phpTrails = <?php echo json_encode($trails) ?>;
	export phpTrails;
</script>
?>