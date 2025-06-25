<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $entries = json_decode($_POST['entries'], true);

    $file = fopen('data.csv', 'a');
    
    if ($file === false) {
        echo "Error: Unable to open or create 'data.csv'. Please check file permissions.";
        exit;
    }

    foreach ($entries as $entry) {
        $data = [
            $entry['name'],
            $entry['kgs'],
            $entry['costPerKg'],
            $entry['additionalPay'],
            $entry['total']
        ];
        fputcsv($file, $data);
    }

    fclose($file);

    echo "Entries have been saved successfully.";
} else {
    echo "Invalid request.";
}
?>
