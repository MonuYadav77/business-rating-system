<?php

require_once "../../config/database.php";
require_once "../models/Rating.php";

header('Content-Type: application/json');

$database = new Database();
$db = $database->connect();

$ratingModel = new Rating($db);

$action = $_POST['action'] ?? '';

if($action == "rate"){

    $business_id = $_POST['business_id'] ?? null;
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $rating = $_POST['rating'] ?? 0;

    if($ratingModel->addRating($business_id,$name,$email,$phone,$rating)){

        echo json_encode(["status"=>"success"]);

    }else{

        echo json_encode(["status"=>"error"]);

    }

}else{

    echo json_encode(["status"=>"invalid_action"]);

}