const api = {
    key: "28fd15358cdecbc1a1dfef367e71acef",
    base: "https://api.openweathermap.org/data/2.5/"
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");

btn.addEventListener("click", function (event) {
    event.preventDefault();
    const city = search.value.trim();
    if (city === "") {
        showError("Please enter a city name");
        return;
    }
    getData(city);
});


function getData(city) {
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(response => response.json())
        .then(displayData)
        .catch(error => console.error("Error fetching data:", error));
}


function displayData(response) {
    if (response.cod === "404") {
        showError("City not found. Please enter a valid city.");
        return;
    }

    document.querySelector(".city").innerText = `${response.name}, ${response.sys.country}`;
    document.querySelector(".date").innerText = dateFunction(new Date());
    document.querySelector(".temp").innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;
    document.querySelector(".weather").innerText = `Weather: ${response.weather[0].main}`;
    document.querySelector(".temp-range").innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

    const weatherIcon = document.querySelector(".weather-icon");
    weatherIcon.src = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;

    // Clear input field
    search.value = "";
}

function showError(message) {
    const error = document.querySelector(".error");
    error.textContent = message;
    search.value = "";
}

function dateFunction(d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
