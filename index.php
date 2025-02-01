<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include "config.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "GET") {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $query = "SELECT id, name, email, dob, password FROM users WHERE id = $id";
        $result = mysqli_query($conn, $query);
        echo json_encode(mysqli_fetch_assoc($result));
    } else {
        $query = "SELECT id, name, email, dob, password FROM users"; 
        $result = mysqli_query($conn, $query);
        $users = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }
        echo json_encode($users);
    }
}

 elseif ($method == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $email = $data['email'];
    $password = md5($data['password']);
    $dob = $data['dob'];

    $query = "INSERT INTO users (name, email, password, dob) VALUES ('$name', '$email', '$password', '$dob')";
    mysqli_query($conn, $query);
    echo json_encode(["message" => "User created successfully"]);
} 
elseif ($method == "PUT") {
    
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($_GET['id'])) {
        echo json_encode(["message" => "User ID is required"]);
        exit;
    }

    $id = $_GET['id'];

    
    $existingUserQuery = "SELECT name, email, dob, password FROM users WHERE id=$id";
    $existingUserResult = mysqli_query($conn, $existingUserQuery);
    $existingUser = mysqli_fetch_assoc($existingUserResult);

    if (!$existingUser) {
        echo json_encode(["message" => "User not found"]);
        exit;
    }

    
    $updateFields = [];

    
    $name = isset($data['name']) ? $data['name'] : $existingUser['name'];
    $email = isset($data['email']) ? $data['email'] : $existingUser['email'];
    $dob = isset($data['dob']) ? $data['dob'] : $existingUser['dob'];

    
    if (isset($data['password']) && !empty($data['password'])) {
        $password = md5($data['password']);
        $updateFields[] = "password='" . mysqli_real_escape_string($conn, $password) . "'";
    }

    $updateFields[] = "name='" . mysqli_real_escape_string($conn, $name) . "'";
    $updateFields[] = "email='" . mysqli_real_escape_string($conn, $email) . "'";
    $updateFields[] = "dob='" . mysqli_real_escape_string($conn, $dob) . "'";


    $query = "UPDATE users SET " . implode(", ", $updateFields) . " WHERE id=$id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(["message" => "User updated successfully"]);
    } else {
        echo json_encode(["message" => "Error updating user"]);
    }
}


 elseif ($method == "DELETE") {
    parse_str(file_get_contents("php://input"), $data);

    if (!isset($_GET['id'])) {
        echo json_encode(["message" => "User ID is required"]);
        exit;
    }
    
    $id = $_GET['id'];

    $query = "DELETE FROM users WHERE id=$id";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["message" => "User deleted successfully"]);
    } else {
        echo json_encode(["message" => "Error deleting user"]);
    }
} else {
    echo json_encode(["message" => "Invalid request"]);
}

mysqli_close($conn);
?>
