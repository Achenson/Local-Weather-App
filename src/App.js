import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faCloudShowersHeavy } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState("waiting for server response...");

  const [longitude, setLongitude] = useState("waiting for server response...");

  const [region, setRegion] = useState("waiting for server response...");

  const [country, setCountry] = useState("waiting for server response...");

  const [temperature, setTemperature] = useState(null);

  const [tempCelcius, setTempCelcius] = useState(null);

  const [tempUnit, setTempUnit] = useState("C");

  const [weather, setWeather] = useState("waiting for server response...");

  let tempFahrenheit = temperature * 1.8 + 32;

  function changeTemperature() {
    if (tempUnit === "C") {
      setTemperature(tempFahrenheit);
      setTempUnit("F");
    }

    if (tempUnit === "F") {
      setTemperature(tempCelcius);
      setTempUnit("C");
    }
  }

  //tempUnit === 'C' ? setTempUnit('F') : setTempUnit('C')

  //getting longitude and latitude from navigator.geolocation
  useEffect(() => {
    new Promise(function(resolve, reject) {
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
            setWeather(data.weather[0].main);
          });
      });

    //console.log("TCL: App ->  latitude",  latitude)
    //console.log("TCL: App -> longitude", longitude)
  }, [longitude, latitude]);
  //fetching data from the API using longitude and latidue

  return (
    <div style={{ textAlign: "center" }} className="App">
      <header className="App-header">
        <h1>Local Weather App</h1>
      </header>
      <main>
        <div>
          <p>latitude - {latitude}</p>
          <p>longitude - {longitude}</p>
          <p>region - {region}</p>
          <p>country - {country}</p>
          <p>
            temperature - {temperature} &#176;
            <button id="btnUnit" onClick={() => changeTemperature()}>
              {tempUnit}
            </button>
          </p>
          <p>weather - {weather}</p>
        </div>
        <div className="weather-icons">
          <FontAwesomeIcon icon={faSun} size="4x"  className="weather-icon" style={{color: "gold"}}/>
          <FontAwesomeIcon icon={faCloud} size="4x"  className="weather-icon" style={{color: "darkgray"}}/>
          <FontAwesomeIcon icon={faCloudRain} size="4x"  className="weather-icon" style={{color: "blue"}} />
          <FontAwesomeIcon icon={faCloudShowersHeavy} size="4x"  className="weather-icon" style={{color: "darkblue"}}/>
          <FontAwesomeIcon icon={faBolt} size="4x" className="weather-icon" style={{color: "orange"}}/>
          <FontAwesomeIcon icon={faSnowflake} size="4x" className="weather-icon" style={{color: "lightblue"}}/>
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
