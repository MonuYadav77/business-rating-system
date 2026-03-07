<?php
class Rating{

    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }

    public function addRating($business_id,$name,$email,$phone,$rating){

        $query = "INSERT INTO ratings (business_id,name,email,phone,rating)
                  VALUES (?,?,?,?,?)";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param("isssd",$business_id,$name,$email,$phone,$rating);

        return $stmt->execute();
    }

}
?>