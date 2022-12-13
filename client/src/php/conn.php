<?php
$servername = "localhost";
$username = "user24";
$password = "24samp";
$db = "db24";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
// get data and store in a json array
$query = "SELECT * FROM BSF_Ski_Resort_Info";

$result = $conn->query($query);
while ($row = $result->fetch_assoc()) {
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
$fp = fopen('trails.json', 'w');

fwrite($fp, json_encode($trails));

fclose($fp);
?>
