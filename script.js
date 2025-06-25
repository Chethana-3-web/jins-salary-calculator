document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entryForm');
    const entriesTable = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    const result = document.getElementById('result');
    const entries = [];

    function addEntry() {
        const name = document.getElementById('name').value;
        const kgs = parseFloat(document.getElementById('kgs').value);
        const costPerKg = parseFloat(document.getElementById('costPerKg').value);
        const additionalPay = parseFloat(document.getElementById('additionalPay').value);
        const total = (kgs * costPerKg) + additionalPay;

        entries.push({ name, kgs, costPerKg, additionalPay, total });

        const row = entriesTable.insertRow();
        row.insertCell(0).innerText = name;
        row.insertCell(1).innerText = kgs;
        row.insertCell(2).innerText = costPerKg;
        row.insertCell(3).innerText = additionalPay;
        row.insertCell(4).innerText = total;

        entryForm.reset();
    }

    document.getElementById('addEntry').addEventListener('click', () => {
        addEntry();
    });

    entryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (entryForm.checkValidity()) {
            addEntry(); // Ensure the last entry is added

            const formData = new FormData();
            formData.append('entries', JSON.stringify(entries));

            const response = await fetch('process.php', {
                method: 'POST',
                body: formData
            });

            const resultText = await response.text();
            result.innerText = resultText;

            // Clear the table and entries array after submitting
            while (entriesTable.rows.length > 0) {
                entriesTable.deleteRow(0);
            }
            entries.length = 0;
        }
    });

    const totalCostForm = document.getElementById('totalCostForm');
    const totalCostResult = document.getElementById('totalCostResult');

    totalCostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const personName = document.getElementById('personName').value;
        const formData = new FormData();
        formData.append('personName', personName);

        const response = await fetch('calculate.php', {
            method: 'POST',
            body: formData
        });

        const resultText = await response.text();
        totalCostResult.innerText = resultText;
    });
});
