async function collectData() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    try {
        // Get user geolocation
        const position = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const geoData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };

        // Get IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();

        // Get device data
        const deviceData = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
        };

        // Send data to Google Sheets
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbznMG7EO7jO_l5rjX1xaLT-dpeJYbV6Usv9Wzy8l-Cm/dev', // Replace YOUR_SCRIPT_ID
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone,
                    latitude: geoData.latitude,
                    longitude: geoData.longitude,
                    ip: ipData.ip,
                    device: deviceData,
                }),
            }
        );

        if (response.ok) {
            alert('Data submitted successfully!');
        } else {
            alert('Failed to submit data.');
        }
    } catch (error) {
        console.error('Error collecting data:', error);
        alert('Error collecting or sending data.');
    }
}
