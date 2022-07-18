logos = [
  {
    id: "01d",
    src: "https://cdn-icons.flaticon.com/png/512/3222/premium/3222807.png?token=exp=1637433605~hmac=090d2f043e2af5f47936840add1fda22",
  },
  {
    id: "01n",
    src: "https://cdn-icons-png.flaticon.com/512/1229/1229328.png",
  },
  {
    id: "02d",
    src: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
  },
  {
    id: "02n",
    src: "https://cdn-icons-png.flaticon.com/512/3166/3166796.png",
  },
  {
    id: "03d",
    src: "https://cdn-icons.flaticon.com/png/512/473/premium/473697.png?token=exp=1637523201~hmac=ff81671c777e5415516c7ad90571517d",
  },
  {
    id: "03n",
    src: "https://cdn-icons.flaticon.com/png/512/473/premium/473697.png?token=exp=1637523201~hmac=ff81671c777e5415516c7ad90571517d",
  },
  {
    id: "04d",
    src: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  },
  {
    id: "04n",
    src: "https://cdn-icons-png.flaticon.com/512/2675/2675775.png",
  },
  {
    id: "09d",
    src: "https://cdn-icons.flaticon.com/png/512/4627/premium/4627715.png?token=exp=1637432844~hmac=1d81ea71ecb311ff3b8f0e354c300dee",
  },
  {
    id: "09n",
    src: "https://cdn-icons.flaticon.com/png/512/4627/premium/4627715.png?token=exp=1637432844~hmac=1d81ea71ecb311ff3b8f0e354c300dee",
  },
  {
    id: "10d",
    src: "https://cdn-icons.flaticon.com/png/512/4088/premium/4088981.png?token=exp=1637432944~hmac=883e0846ba04d5b81c590f80ec9f8551",
  },
  {
    id: "10n",
    src: "https://cdn-icons.flaticon.com/png/512/4089/premium/4089233.png?token=exp=1637432953~hmac=3c05914aee72af91ac505d0539192853",
  },
  {
    id: "11d",
    src: "https://cdn-icons-png.flaticon.com/512/1779/1779927.png",
  },
  {
    id: "11n",
    src: "https://cdn-icons-png.flaticon.com/512/1779/1779858.png",
  },
  {
    id: "13d",
    src: "https://cdn-icons-png.flaticon.com/512/642/642000.png",
  },
  {
    id: "13n",
    src: "https://cdn-icons-png.flaticon.com/512/65/65182.png",
  },
  {
    id: "50d",
    src: "https://cdn-icons-png.flaticon.com/512/2675/2675962.png",
  },
  {
    id: "50n",
    src: "https://cdn-icons-png.flaticon.com/512/2675/2675872.png",
  },
];

const apiKey = "4cb9fda888180aa654d28f297252b3a3";
const body = document.querySelector("body");
body.style.opacity = "0.3";
let cityName = "";
var locationName = document.getElementById("locationName");
var searchImg = document.getElementById("searchImg");
const forecastData = document.getElementById("forecastdata");
let lat;
let lon;

function convertTime(dt, option) {
  DateObj = new Date(dt * 1000);
  date = DateObj.toString();
  time = date.slice(16, 21);
  date = date.slice(8, 10) + " " + date.slice(4, 7) + " " + date.slice(11, 15);
  if (option == "date") return date;
  if (option == "time") return time;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
    setData();
  }
}

function setPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  // body.style.opacity="0.3"

  let urlByLatnLon = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  // url for latitude and longitude
  // console.log(cityName);
  fetch(urlByLatnLon)
    .then((responce) => responce.json())
    .then((data) => {
      // Getting data from api response
      var city = data.name;
      var country = data.sys.country;
      var temperature = data.main.temp;
      var logoid = data.weather[0].icon;
      var logo = logos[1].src;
      logos.forEach((element) => {
        if (logoid == element.id) {
          logo = element.src;
        }
      });
      var weatherType = data.weather[0].description;
      arr = weatherType.split(" ");
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      weatherType = arr.join(" ");
      var minTemp = data.main.temp_min;
      var maxTemp = data.main.temp_max;
      var feelsLike = data.main.feels_like;
      var pressure = data.main.pressure;
      var humidity = data.main.humidity;
      var windSpeed = data.wind.speed;
      var sunriseTime = convertTime(data.sys.sunrise, "time");
      var sunsetTime = convertTime(data.sys.sunset, "time");
      displayForecastData(lat, lon);
      setTimeout(() => {
        displayData(
          city,
          country,
          temperature,
          logo,
          weatherType,
          minTemp,
          maxTemp,
          feelsLike,
          pressure,
          humidity,
          windSpeed,
          sunriseTime,
          sunsetTime
        );
      }, 1000);
    });
}

function displayForecastData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=alerts&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((response) => {
      // Getting hourly and daily forecast Data
      let innerhourData = ``;
      let innerDailyData = ``;
      let hourArray = response.hourly;
      let DailyArray = response.daily;
      hourArray.forEach((element) => {
        innerhourData += `<div class="forecastElement">
  <h3>${convertTime(element.dt, "date")}</h3>
  <h3>${element.weather[0].description}</h3>
  <h3>${convertTime(element.dt, "time")}</h3>
  <h3>${element.temp}&#176C</h3>
</div>`;
      });

      DailyArray.forEach((element) => {
        innerDailyData += `
              <div class="forecastElement">
                <h3>${convertTime(element.dt, "date")}</h3>
                <h3>${element.weather[0].description}</h3>
                <h3>${element.temp.day}&#176C</h3>
              </div>
              `;
      });

      // Updating the dom by hourly and daily forecast and handling styling
      forecastData.innerHTML = innerhourData;
      const hourly = document.getElementById("hourly");
      const daily = document.getElementById("daily");
      hourly.addEventListener("click", (e) => {
        forecastData.innerHTML = innerhourData;
        hourly.classList.add("active");
        daily.classList.remove("active");
      });
      daily.addEventListener("click", (e) => {
        forecastData.innerHTML = innerDailyData;
        daily.classList.add("active");
        hourly.classList.remove("active");
      });

      DailyArray.forEach((element) => {
        innerDailyData += `
              <div class="forecastElement">
                <h3>${convertTime(element.dt, "date")}</h3>
                <h3>${element.weather[0].description}</h3>
                <h3>${element.temp.day}&#176C</h3>
              </div>
              `;
      });
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // console.log("User denied the request for Geolocation.")
      setData();
      break;
  }
}

function setData() {
  alert("Geolocation Permission is Denied.");
  cityName = "Mumbai";
  let urlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  // console.log(cityName);
  fetch(urlByCity)
    .then((responce) => responce.json())
    .then((data) => {
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      // Getting data from api response
      var city = data.name;
      var country = data.sys.country;
      var temperature = data.main.temp;
      var logoid = data.weather[0].icon;
      var logo = logos[1].src;
      logos.forEach((element) => {
        if (logoid == element.id) {
          logo = element.src;
        }
      });
      var weatherType = data.weather[0].description;
      arr = weatherType.split(" ");
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      weatherType = arr.join(" ");
      var minTemp = data.main.temp_min;
      var maxTemp = data.main.temp_max;
      var feelsLike = data.main.feels_like;
      var pressure = data.main.pressure;
      var humidity = data.main.humidity;
      var windSpeed = data.wind.speed;
      var sunriseTime = convertTime(data.sys.sunrise, "time");
      var sunsetTime = convertTime(data.sys.sunset, "time");
      displayForecastData(lat, lon);
      displayData(
        city,
        country,
        temperature,
        logo,
        weatherType,
        minTemp,
        maxTemp,
        feelsLike,
        pressure,
        humidity,
        windSpeed,
        sunriseTime,
        sunsetTime
      );
    });
}

function searchData(e) {
  if (e.key == "Enter" || e.pointerType == "mouse") {
    cityName = locationName.value;
    body.style.opacity = "0.3";
    let urlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    fetch(urlByCity)
      .then((response) => {
        if (response.ok) return response.json();
        else if (response.status == 404) {
          alert("Sorry! City Not Found :(");
          body.style.opacity = "1";
          locationName.value = "";
          return Promise.reject("error 404 !");
        }
      })
      .then((cityData) => {
        let lat = cityData.coord.lat;
        let lon = cityData.coord.lon;
        var city = cityData.name;
        var country = cityData.sys.country;
        var temperature = cityData.main.temp;
        var logoid = cityData.weather[0].icon;
        var logo = logos[1].src;
        logos.forEach((element) => {
          if (logoid == element.id) {
            logo = element.src;
          }
        });
        var weatherType = cityData.weather[0].description;
        arr = weatherType.split(" ");
        for (let i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        weatherType = arr.join(" ");
        var minTemp = cityData.main.temp_min;
        var maxTemp = cityData.main.temp_max;
        var feelsLike = cityData.main.feels_like;
        var pressure = cityData.main.pressure;
        var humidity = cityData.main.humidity;
        var windSpeed = cityData.wind.speed;
        var sunriseTime = convertTime(cityData.sys.sunrise, "time");
        var sunsetTime = convertTime(cityData.sys.sunset, "time");
        displayForecastData(lat, lon);
        setTimeout(() => {
          displayData(
            city,
            country,
            temperature,
            logo,
            weatherType,
            minTemp,
            maxTemp,
            feelsLike,
            pressure,
            humidity,
            windSpeed,
            sunriseTime,
            sunsetTime
          );
        }, 1000);
      })
      .catch((error) => console.log("Error Occured."));
  }
}

function displayData(
  city,
  country,
  temperature,
  logo,
  weatherType,
  minTemp,
  maxTemp,
  feelsLike,
  pressure,
  humidity,
  windSpeed,
  sunriseTime,
  sunsetTime
) {
  // Getting Elements from dom
  //   console.log(weatherType);
  // Setting Value at DOM
  document.getElementById("cityName").innerHTML = city;
  document.getElementById("countryName").innerHTML = country;
  document.getElementById("temperature").innerHTML = temperature + "&#176C";
  document.getElementById("weatherImg").src = logo;
  document.getElementById("weatherType").innerHTML = weatherType;
  document.getElementById("minTemperature").innerHTML = minTemp + "&#176C";
  document.getElementById("maxTemperature").innerHTML = maxTemp + "&#176C";
  document.getElementById("sunriseTime").innerHTML = sunriseTime + " (IST)";
  document.getElementById("sunsetTime").innerHTML = sunsetTime + " (IST)";
  document.getElementById("pressure").innerHTML = pressure + " hPa";
  document.getElementById("windSpeed").innerHTML = windSpeed + " m/s";
  document.getElementById("humidity").innerHTML = humidity + " %";
  document.getElementById("feelLike").innerHTML = feelsLike + "&#176C";
  body.style.opacity = "1";
}

getLocation();

// Popular Locations adding to the DOM
let citiesList = [
  "London",
  "Paris",
  "Dubai",
  "Moscow",
  "Tokyo",
  "Singapore",
  "Barcelona",
  "New York",
  "Madrid",
  "Rome",
  "Chicago",
  "Abu Dhabhi",
  "San Francisco",
  "Amsterdam",
  "Toranto",
  "Sydney",
  "Berlin",
  "Washington",
  "Istanbul",
  "Nepal",
  "Japan",
  "China",
  "Vienna",
  "Beijing",
  "Delhi",
  "Mumbai",
  "Pune",
  "Mexico",
  "Bangkok",
];

const locations = document.getElementById("locations");
let locationData = ``;
citiesList.forEach((city) => {
  locationData += `<h3 class="cities">${city}</h3>`;
  // Generating html code for locations
});
// Added location to dom
locations.innerHTML = locationData;
const cities = document.getElementsByClassName("cities");

function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Created functionality that user directly get weather details by clicking city
for (let i = 0; i < cities.length; i++) {
  cities[i].addEventListener("click", () => {
    // Added eventListners for each locations
    cityName = cities[i].textContent;
    body.style.opacity = "0.3";
    toTop();
    let urlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    fetch(urlByCity)
      .then((response) => {
        if (response.ok) return response.json();
        else if (response.status == 404) {
          alert("Sorry! City Not Found :(");
          body.style.opacity = "1";
          locationName.value = "";
          return Promise.reject("error 404 !");
        }
      })
      .then((cityData) => {
        let lat = cityData.coord.lat;
        let lon = cityData.coord.lon;
        var city = cityData.name;
        var country = cityData.sys.country;
        var temperature = cityData.main.temp;
        var logoid = cityData.weather[0].icon;
        var logo = logos[1].src;
        logos.forEach((element) => {
          if (logoid == element.id) {
            logo = element.src;
          }
        });
        var weatherType = cityData.weather[0].description;
        arr = weatherType.split(" ");
        for (let i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        weatherType = arr.join(" ");
        var minTemp = cityData.main.temp_min;
        var maxTemp = cityData.main.temp_max;
        var feelsLike = cityData.main.feels_like;
        var pressure = cityData.main.pressure;
        var humidity = cityData.main.humidity;
        var windSpeed = cityData.wind.speed;
        var sunriseTime = convertTime(cityData.sys.sunrise, "time");
        var sunsetTime = convertTime(cityData.sys.sunset, "time");
        displayForecastData(lat, lon);
        setTimeout(() => {
          displayData(
            city,
            country,
            temperature,
            logo,
            weatherType,
            minTemp,
            maxTemp,
            feelsLike,
            pressure,
            humidity,
            windSpeed,
            sunriseTime,
            sunsetTime
          );
        }, 1000);
      });
  });
}

locationName.addEventListener("keydown", (e) => {
  searchData(e);
});
searchImg.addEventListener("click", (e) => {
  searchData(e);
});
