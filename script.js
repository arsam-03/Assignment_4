let currentTempCelsius;
let currentTempFahrenheit;
let isCelsius = true;
let localTimeEpoch;

async function getWeather() {
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=56a953cd8a6f4058a5a22515231812&q=Barcelona&aqi=no")
    const data = await response.json()
    console.log(data)

    currentTempCelsius = data.current.temp_c;
    currentTempFahrenheit = data.current.temp_f;

    localTimeEpoch = data.location.localtime_epoch;

    document.getElementById('temperature').innerText = `${currentTempCelsius}°C`;
    updateLocalTime();
}

function updateLocalTime(epoch) {
    const localDateTime = new Date(localTimeEpoch * 1000); 
    const formattedTime = formatLocalTime(localDateTime);
    document.getElementById('localTime').innerText = formattedTime;

    localTimeEpoch += 1;
}


function formatLocalTime(dateTime) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Madrid',
        timeZoneName: 'short'
    };
    return dateTime.toLocaleDateString('en-US', options)
}


window.onload = function() {
    getWeather();
    setInterval(updateLocalTime, 1000);
};

function toggleTemperature() {
    if (isCelsius) {
        document.getElementById('temperature').innerText = `${currentTempFahrenheit}°F`;
    } else {
        document.getElementById('temperature').innerText = `${currentTempCelsius}°C`;
    }
    isCelsius = !isCelsius; 
}