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
    // get business by id method
    public function getBusiness(){

    $id = $_GET['id'];

    $result = $this->business->getBusinessById($id);

    echo json_encode($result->fetch_assoc());

    
    }
    // update business method
    public function updateBusiness(){

    $id = $_POST['business_id'];

    $name = $_POST['name'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    if($this->business->updateBusiness($id,$name,$address,$phone,$email)){
        echo json_encode(["status"=>"success"]);
    }else{
        echo json_encode(["status"=>"error"]);
    }
}
// delete business method
public function deleteBusiness(){

    $id = $_POST['id'];

    if($this->business->deleteBusiness($id)){
        echo json_encode(["status"=>"success"]);
    }else{
        echo json_encode(["status"=>"error"]);
    }
}

}
// 
$controller = new BusinessController();
$action = $_REQUEST['action'] ?? 'list';

switch($action){

    case "add":
        $controller->addBusiness();
        break;

    case "update":
        $controller->updateBusiness();
        break;

    case "get":
        $controller->getBusiness();
        break;
    case "delete":
    $controller->deleteBusiness();
    break;

    default:
        $controller->index();
}