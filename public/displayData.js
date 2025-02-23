function fetchData(collectionName) {
    fetch(`/api/data/${collectionName}`)
        .then(response => response.json())
        .then(data => {
            const displayDiv = document.getElementById('dataDisplay');
            displayDiv.innerHTML = ''; 

            if (!data || data.length === 0) {
                displayDiv.innerHTML = '<p>No data found</p>';
                return;
            }

            // **Agar birthcertificates collection hai, toh JSON format mein dikhaye**
            if (collectionName === 'birthcertificates') {
                displayDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
                return;
            }

            // **Baaki collections ka data table format mein show karein**
            let table = '<table border="1"><thead><tr>';
            Object.keys(data[0]).forEach(key => {
                table += `<th>${key}</th>`;
            });
            table += '<th>Actions</th></tr></thead><tbody>';

            data.forEach(item => {
                table += '<tr>';
                Object.keys(item).forEach(key => {
                    if (typeof item[key] === 'string' && item[key].startsWith('http')) {
                        table += `<td><img src="${item[key]}" alt="Image" width="50"></td>`;
                    } else {
                        table += `<td>${item[key]}</td>`;
                    }
                });
                table += `
                    <td>
                        <button onclick="updateData('${item._id}')">Update</button>
                        <button onclick="deleteData('${item._id}')">Delete</button>
                    </td>
                `;
                table += '</tr>';
            });

            table += '</tbody></table>';
            displayDiv.innerHTML = table;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('dataDisplay').innerHTML = '<p>Error fetching data.</p>';
        });
}

function updateData(id) {
    const updatedData = prompt('Enter updated data in JSON format:');
    if (updatedData) {
        fetch(`/api/data/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: updatedData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Data updated successfully');
                fetchData('birthcertificates'); // Refresh Data
            } else {
                alert('Update failed');
            }
        })
        .catch(error => console.error('Error updating data:', error));
    }
}

function deleteData(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        fetch(`/api/data/delete/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Data deleted successfully');
                fetchData('birthcertificates'); // Refresh Data
            } else {
                alert('Delete failed');
            }
        })
        .catch(error => console.error('Error deleting data:', error));
    }
}
