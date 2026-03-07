<?php

require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../models/Business.php";


class BusinessController{
    private $business;

    public function __construct(){

    $database = new Database();

    $db = $database->connect();
    $this-> business = new Business($db);
    }

    public function index(){

        $result = $this->business->getAllBusinesses();

        $data = [];

        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }
    echo json_encode($data);

    }
    public function addBusiness(){
        

        $name = $_POST['name'];
        $address = $_POST['address'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];

        if($this->business->addBusiness($name,$address,$phone,$email)){
            echo json_encode(["status"=>"success"]);
        }else{
            echo json_encode(["status"=>"error"]);
        }
    }
}
// 
$controller = new BusinessController();
$action = $_POST['action'] ?? 'list';

if($action == "add"){
    $controller->addBusiness();
}else{
    $controller->index();
}