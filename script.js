const api_key = "b3eae25a346ef89c09037e663aa7bf66";

let data;
let temperature = 0;
let tempUnit = "C";
let currentCity = "";

async function getWeather() {

    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherResult").style.display = "none";
    document.getElementById("error").innerHTML = "";

   

    let city =  document.getElementById("cityDropdown").value;
    

    if (city == "") {
        alert("Please enter or select a city");
        document.getElementById("loading").style.display = "none";
        return;
    }

    currentCity = city;

    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

        const response = await fetch(url);
        data = await response.json();

        if (data.cod != 200) {
            throw new Error(data.message);
        }

        temperature = data.main.temp;
        tempUnit = "C";

        showWeather();

    }

    catch (error) {

        document.getElementById("error").innerHTML =
            "❌ City not found";

    }

    finally {

        document.getElementById("loading").style.display = "none";

    }

}

function showWeather() {

    document.getElementById("weatherResult").style.display = "block";

    document.getElementById("cityName").innerHTML =
        "📍 " + data.name;

    document.getElementById("description").innerHTML =
        data.weather[0].description;

    document.getElementById("temperature").innerHTML =
        temperature + " °" + tempUnit;

    document.getElementById("feelsLike").innerHTML =
        "🥵 Feels Like : " + data.main.feels_like + " °C";

    document.getElementById("humidity").innerHTML =
        "💧 Humidity : " + data.main.humidity + "%";

    document.getElementById("wind").innerHTML =
        "💨 Wind Speed : " + data.wind.speed + " m/s";

    document.getElementById("weatherIcon").src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
console.log(data.weather[0].main);
console.log(data.weather[0].description);
console.log(data);

    const now = new Date();

    document.getElementById("dateTime").innerHTML =
        "📅 " + now.toLocaleDateString() +
        "<br>🕒 " +
        now.toLocaleTimeString();

    document.getElementById("updated").innerHTML =
        "Last Updated : " +
        now.toLocaleTimeString();

    changeBackground(
        data.weather[0].main,
        data.weather[0].icon
    );

}
function toggleUnit() {

    if (!data) {
        alert("Please get weather first!");
        return;
    }

    if (tempUnit === "C") {

        temperature = ((temperature * 9 / 5) + 32).toFixed(1);
        tempUnit = "F";

    } else {

        temperature = (((temperature - 32) * 5) / 9).toFixed(1);
        tempUnit = "C";

    }

    document.getElementById("temperature").innerHTML =
        temperature + " °" + tempUnit;
}

function refreshWeather() {

    if (currentCity == "") {
        alert("Search a city first!");
        return;
    }

    getWeather();
}

function changeBackground(weather, icon) {

    document.body.className = "";

    const isNight = icon.includes("n");

    if (isNight) {
        document.body.classList.add("night");
        return;
    }

    switch (weather.toLowerCase()) {

        case "clear":
            document.body.classList.add("sunny");
            break;

        case "clouds":
            document.body.classList.add("cloudy");
            break;

        case "rain":
        case "drizzle":
        case "thunderstorm":
            document.body.classList.add("rainy");
            break;

        case "snow":
            document.body.classList.add("snow");
            break;

        default:
            break;
    }
}

