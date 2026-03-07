<?php

class Business {
    private $conn;
    private $table = "businesses";

    public function __construct($db){
        $this->conn = $db;
    }

     public function getAllBusinesses(){

        $query = "
        SELECT b.*, 
        IFNULL(AVG(r.rating),0) as avg_rating
        FROM businesses b
        LEFT JOIN ratings r ON b.id = r.business_id
        GROUP BY b.id
        ORDER BY b.id ASC
        ";

        $result = $this->conn->query($query);

        return $result;
    }
    // add business method
     public function addBusiness($name,$address,$phone,$email){

        $query = "INSERT INTO businesses (name,address,phone,email)
                  VALUES (?,?,?,?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssss",$name,$address,$phone,$email);

        return $stmt->execute();
    }
}