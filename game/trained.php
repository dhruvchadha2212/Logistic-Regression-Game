<?php
	$myfile = fopen("green.txt", "r");
	$trained_data = [];
	while(!feof($myfile)) {
		$line = fgets($myfile);
		$line = explode(" ", $line);
		array_push($trained_data, $line);
	}
	$size = count($trained_data);
	$rand = rand(0, $size - 1);
	$data = [];
	if($trained_data[$rand][0] == "") {
		$data[0] = rand(0, 591);
		$data[1] = rand(1, 51);
	}
	else {
		array_push($data, $trained_data[$rand][0]);
		array_push($data, $trained_data[$rand][1]);
	}
	echo json_encode($data, JSON_FORCE_OBJECT);
	fclose($myfile);
?>