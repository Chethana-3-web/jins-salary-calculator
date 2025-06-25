<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $personName = $_POST['personName'];
    $totalCost = 0;

    if (($file = fopen('data.csv', 'r')) !== false) {
        while (($data = fgetcsv($file)) !== false) {
            if (strtolower($data[0]) === strtolower($personName)) {
                $totalCost += floatval($data[4]); // Assuming the total cost is in the 5th column
            }
        }
        fclose($file);

        echo "Total cost for $personName: $totalCost";
    } else {
        echo "Error: Unable to open 'data.csv'.";
    }
} else {
    echo "Invalid request.";
}
?>
