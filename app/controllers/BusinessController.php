<?php

require_once "../../config/database.php";
require_once "../models/Business.php";


class BusinessController{
    private $business;

    public function __construct($db){

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
}
// 
$controller = new BusinessController();
$controller->index();