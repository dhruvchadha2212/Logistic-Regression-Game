<?php
	$myfile = fopen("trainingData.txt", "a");
	$data = $_GET["x"]." ".$_GET["y"]." ".$_GET["stat"].PHP_EOL;
	fwrite($myfile, $data);
	fclose($myfile);
	echo $data;
?>