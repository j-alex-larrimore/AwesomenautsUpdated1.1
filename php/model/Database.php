<?php

class Database {

    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->password = $password;
        $this->username = $username;
        $this->database = $database;

        $this->connection = new mysqli($host, $username, $password);

        if ($this->connection->connect_error) {
            die("<p>error: " . $this->connection->connect_error . "</p>");
        }

        $exists = $this->connection->select_db($database);

        if (!$exists) {
            $query = $this->connection->query("CREATE DATABASE $database");
            $this->connection->select_db($database);
        } 
        
        $query = $this->connection->query("CREATE TABLE users ("
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "username varchar(30) NOT NULL,"
            . "email varchar(50) NOT NULL,"
            . "password char(128) NOT NULL,"
            . "salt char(128) NOT NULL,"
            . "exp int(4),"
            . "exp1 int(4),"
            . "exp2 int(4),"
            . "exp3 int(4),"
            . "exp4 int(4),"
            . "PRIMARY KEY (id))");
    }

    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
            die("<p>error: " . $this->connection->connect_error . "</p>");
        }
    }

    public function closeConnection() {
        if (isset($this->connection)) {
            $this->connection->close();
        }
    }

    public function query($string) {
        $this->openConnection();

        $query = $this->connection->query($string);

        if(!$query){
            $this->error = $this->connection->error;
        }
        
        $this->closeConnection();

        return $query;
    }

}
