import React, { useState, useEffect } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faCloudShowersHeavy } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faSmog } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [latitude, setLatitude] = useState("waiting for server response...");
  const [longitude, setLongitude] = useState("waiting for server response...");
  const [region, setRegion] = useState("waiting for server response...");
  const [country, setCountry] = useState("waiting for server response...");

  const [weather, setWeather] = useState("waiting for server response...");
  const [weatherIcons, setWeatherIcons] = useState({
    sun: "none",
    cloud: "none",
    lightRain: "none",
    heavyRain: "none",
    bolt: "none",
    snow: "none",
    mist: "mist"
  });

  const [temperature, setTemperature] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [tempUnit, setTempUnit] = useState("C");
  //for button changing C/F
  const [tempCelcius, setTempCelcius] = useState(null);
  const [tempCelciusFeelsLike, setTempCelciusFeelsLike] = useState(null);
  let tempFahrenheit = temperature * 1.8 + 32;
  let tempFahrenheitFeelsLike = feelsLike * 1.8 + 32;

  function changeTemperature() {
    if (tempUnit === "C") {
      setTemperature(tempFahrenheit);
      setTempUnit("F");
      setFeelsLike(tempFahrenheitFeelsLike);
    }

    if (tempUnit === "F") {
      setTemperature(tempCelcius);
      setTempUnit("C");
      setFeelsLike(tempCelciusFeelsLike);
    }
  }

  useEffect(() => {
    new Promise(function(resolve, reject) {
      //getting longitude and latitude from navigator.geolocation
      getLocation();

      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }

      function showPosition(position) {
        let resultObj = {};

        resultObj.latitude = position.coords.latitude;
        resultObj.longitude = position.coords.longitude;

        resolve(resultObj);
      }
    })
      .then(function(result) {
        setLongitude(result.longitude);
        setLatitude(result.latitude);

        return `https://fcc-weather-api.glitch.me/api/current?lon=${result.longitude}&lat=${result.latitude}`;
      })
      //fetching data from freeCodeCamp API
      .then(function(myURL) {
        fetch(myURL)
          .then(res => res.json())
          .then(data => {
            console.log(JSON.stringify(data, null, 2));
            console.log("data name");
            console.log(data.name);
            console.log(data.sys.country);
            setRegion(data.name);
            setCountry(data.sys.country);
            setTemperature(data.main.temp);
            setTempCelcius(data.main.temp);
            setFeelsLike(data.main.feels_like);
            setTempCelciusFeelsLike(data.main.feels_like);
            setWeather(data.weather[0].main);

            let weatherIconsObj = {
              sun: "none",
              cloud: "none",
              lightRain: "none",
              heavyRain: "none",
              bolt: "none",
              snow: "none",
              mist: "none"
            };

            switch (data.weather[0].main) {
              case "Clear":
                weatherIconsObj.sun = "block";
                break;
              case "Clouds":
                weatherIconsObj.cloud = "block";
                break;
              case "Drizzle":
                weatherIconsObj.lightRain = "block";
                break;
              case "Rain":
                weatherIconsObj.heavyRain = "block";
                break;
              case "Thunderstorm":
                weatherIconsObj.bolt = "block";
                break;
              case "Snow":
                weatherIconsObj.snow = "block";
                break;
              case "Mist":
                weatherIconsObj.mist = "block";
                break;
              default:
                console.log("no weather info");
            }

            setWeatherIcons(weatherIconsObj);
          });
      });

    //[] is passed to run useEffect only on first render
  }, []);
  

  return (
    <div style={{ textAlign: "center" }} className="App">
      <header className="App-header">
        <h1>Local Weather App</h1>
      </header>
      <main>
        <div className="align-on-hyphen">
          <div>
            <span>latitude</span> - <span>{latitude}</span>
          </div>
          <div>
            <span>longitude</span> - <span>{longitude}</span>
          </div>
          <div>
            <span>region</span> - <span>{region}</span>
          </div>
          <div>
            <span>country</span> - <span>{country}</span>
          </div>
          <div>
            <span>temperature</span> - <span>{temperature} &#176;<button className="btn-unit" onClick={() => changeTemperature()}>
              {tempUnit}
            </button></span>
           
          </div>
          <div>
            <span>feels like</span> - <span>{feelsLike} &#176;<button className="btn-unit" onClick={() => changeTemperature()}>
              {tempUnit}
            </button></span>
          
          </div>
          <div>
            <span>weather</span> - <span>{weather}</span>
          </div>
        </div>
        <div className="weather-icons">
          <FontAwesomeIcon
            icon={faSun}
            size="5x"
            className="weather-icon sun"
            style={{ display: `${weatherIcons.sun}` }}
          />
          <FontAwesomeIcon
            icon={faCloud}
            size="5x"
            className="weather-icon cloud"
            style={{ display: `${weatherIcons.cloud}` }}
          />
          <FontAwesomeIcon
            icon={faCloudRain}
            size="5x"
            className="weather-icon light-rain"
            style={{ display: `${weatherIcons.lightRain}` }}
          />
          <FontAwesomeIcon
            icon={faCloudShowersHeavy}
            size="5x"
            className="weather-icon heavy-rain"
            style={{ display: `${weatherIcons.heavyRain}` }}
          />
          <FontAwesomeIcon
            icon={faBolt}
            size="5x"
            className="weather-icon bolt"
            style={{ display: `${weatherIcons.bolt}` }}
          />
          <FontAwesomeIcon
            icon={faSnowflake}
            size="5x"
            className="weather-icon snow"
            style={{ display: `${weatherIcons.snow}` }}
          />
          <FontAwesomeIcon
            icon={faSmog}
            size="5x"
            className="weather-icon mist"
            style={{ display: `${weatherIcons.mist}` }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

/* 


    case 'drizzle':
     
    case 'clouds':
      
    case 'rain':
     
    case 'snow':
     
    case 'clear':
     
    case 'thunderstom':
 
*/
