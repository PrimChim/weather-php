/* selecting elements from heml using different query selectors
and storing them to respective variables */
let city = document.querySelector(".name");
let temp = document.querySelector(".temp");
let windSpeed = document.querySelector(".wind");
let humiditydisplay = document.querySelector(".humm");
let weathercondition = document.getElementById("rain");
let icon = document.getElementById("icon");
let date = document.getElementById("date");
let press = document.getElementById("pressure");
let direction = document.getElementById("direction");

/* defining function to get weather data from api 
and change the values in HTML */
function gettingWeather() {
  if (
    localStorage.when != null &&
    parseInt(localStorage.when) + 10000 > Date.now()
  ) {
    // converting the string from local storage to object
    let weather_data = JSON.parse(localStorage.ob);

    // getting required values to respective variables
    const {
      Name,
      temperature,
      pressure,
      humidity,
      wind_speed,
      wind_deg,
      dt,
      weather_description,
      icon,
    } = weather_data;

    // changing HTML elements with refrence to data from database
    icon.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    city.innerHTML = Name;
    temp.innerHTML = temperature + "° C";
    humiditydisplay.innerHTML = "Humidity : " + humidity + " %";
    windSpeed.innerHTML = "Wind speed : " + wind_speed + " m/s";
    direction.innerHTML = "Wind Direction : " + wind_deg + "°";
    weathercondition.innerHTML = weather_description;
    press.innerHTML = "Pressure :" + pressure + " hPa";
    let d = new Date(dt * 1000);
    date.innerHTML = d.toDateString();
    inputValue.value = "";
  } else {
    // setting new time
    localStorage.setItem("when", Date.now());
    fetch("http://localhost/")
      /* the response from the fetched api is returned in json
  format and stored in data, then it is extracted and
  HTML elements are changed so on */
      .then((response) => response.json())
      .then((data) => {
        // saving the data from api to local storage in string form
        localStorage.setItem("ob", JSON.stringify(data));

        // converting the string from local storage to object
        let weather_data = JSON.parse(localStorage.ob);

        // getting required values to respective variables
        const {
          Name,
          temperature,
          pressure,
          humidity,
          wind_speed,
          wind_deg,
          dt,
          weather_description,
          icon,
        } = weather_data;

        // changing HTML elements with refrence to data from database
        icon.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        city.innerHTML = Name;
        temp.innerHTML = temperature + "° C";
        humiditydisplay.innerHTML = "Humidity : " + humidity + " %";
        windSpeed.innerHTML = "Wind speed : " + wind_speed + " m/s";
        direction.innerHTML = "Wind Direction : " + wind_deg + "°";
        weathercondition.innerHTML = weather_description;
        press.innerHTML = "Pressure :" + pressure + " hPa";
        let d = new Date(dt * 1000);
        date.innerHTML = d.toDateString();
      });
  }
}

// calling gettingWeather funciton for first time
gettingWeather();
