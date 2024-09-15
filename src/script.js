document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.querySelector("#mode");
  const icon = document.querySelector("#icon");
  const main = document.querySelector("main");
  const input = document.getElementById("input");
  const button = document.getElementById("searchBtn");
  const cityName = document.getElementById("cityName");
  const country = document.getElementById("countryName");
  const cityTemp = document.getElementById("cityTemp");
  const weatherIcon = document.getElementById("weatherIcon");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const cityTempF = document.getElementById("cityTempF");
  const currentLocation = document.getElementById("currentLocation");
  const cityTime = document.getElementById("cityTime");

  function theme() {
    let theme = "light";
    themeBtn.addEventListener("click", () => {
      if (theme === "light") {
        icon.classList.remove("ri-moon-line");
        icon.classList.add("ri-sun-line");
        main.classList.remove("light");
        main.classList.add("dark");
        theme = "dark";
      } else {
        icon.classList.remove("ri-sun-line");
        icon.classList.add("ri-moon-line");
        main.classList.remove("dark");
        main.classList.add("light");
        theme = "light";
      }
    });
  }
  theme();

  async function getData(lat, long) {
    const promise = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=27cbcb06a0954b9aa8f62515243108&q=${lat},${long}&aqi=yes`
    );
    return await promise.json();
  }

  async function gotLocation(position) {
    const result = await getData(
      position.coords.latitude,
      position.coords.longitude
    );
    cityName.innerText = `${result.location.name}`;
    country.innerText = `${result.location.country} ${result.location.region}`;
    cityTemp.innerText = `${result.current.temp_c}`;
    humidity.innerText = `${result.current.humidity}`;
    windSpeed.innerText = `${result.current.wind_kph}`;
    cityTempF.innerText = `${result.current.temp_f}`;
    cityTime.innerText = `${result.location.localtime}`;
    let condition = `${result.current.condition.text}`;
    if (condition === "Light rain") {
      weatherIcon.innerHTML = `<i class="ri-rainy-fill"></i>`;
    } else {
      weatherIcon.innerHTML = `<i class="ri-sun-fill"></i>`;
    }
  }

  function failedLocation() {
    alert("Please Allow Location to use this feature");
  }

  button.addEventListener("click", async () => {
    const value = input.value;
    const result = await getData(value);
    cityName.innerText = `${result.location.name}`;
    country.innerText = `${result.location.country} ${result.location.region}`;
    cityTemp.innerText = `${result.current.temp_c}`;
    humidity.innerText = `${result.current.humidity}`;
    windSpeed.innerText = `${result.current.wind_kph}`;
    cityTempF.innerText = `${result.current.temp_f}`;
    cityTime.innerText = `${result.location.localtime}`;
    let condition = `${result.current.condition.text}`;
    if (condition === "Light rain") {
      weatherIcon.innerHTML = `<i class="ri-rainy-fill"></i>`;
    } else {
      weatherIcon.innerHTML = `<i class="ri-sun-fill"></i>`;
    }
    input.value = "";
  });

  currentLocation.addEventListener("click", async () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedLocation);
  });

  async function fetchWeatherData(city) {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=27cbcb06a0954b9aa8f62515243108&q=${city}&aqi=yes`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data for ${city}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function updateWeatherForCities() {
    const cities = [
      "Kolkata",
      "Delhi",
      "Mumbai",
      "Goa",
      "Hyderabad",
      "Bangalore",
    ];

    for (const city of cities) {
      const result = await fetchWeatherData(city);
      const weatherSpan = document.getElementById(
        `${city.toLowerCase()}Weather`
      );
      const noteSpan = document
        .querySelector(`#${city.toLowerCase()}Weather`)
        .closest("div")
        .querySelector(".note");

      if (weatherSpan) {
        weatherSpan.innerText = `${result.current.condition.text} with a temp of ${result.current.temp_c}°C`;
      }

      let cityCondition = `${result.current.condition.text}`;
      if (
        cityCondition === "Light rain" ||
        cityCondition === " Moderate rain" ||
        cityCondition === "Patchy rain"
      ) {
        if (noteSpan) {
          noteSpan.innerText = `Stay home and enjoy the chill`;
        }
      } else if (cityCondition === "Mist") {
        if (noteSpan) {
          noteSpan.innerText = `Go out If you have any urgency`;
        }
      } else {
        if (noteSpan) {
          noteSpan.innerText = `Favorable for your plans`;
        }
      }
    }
  }

  updateWeatherForCities();
});
