import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [latitude, setLatitude] = useState(123);

  const [longitude, setLongitude] = useState(345);

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
     
        console.log(result.latitude);
        console.log(result.longitude);

        setLongitude(result.longitude)
        setLatitude(result.latitude)

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
          });
      });

    //console.log("TCL: App ->  latitude",  latitude)
    //console.log("TCL: App -> longitude", longitude)
  }, [longitude, latitude]);
  //fetching data from the API using longitude and latidue

  return (
    <div style={{ textAlign: "center" }} className="App">
      <h1>Local Weather App</h1>
      <header className="App-header">
        <p>latitude - {latitude}</p>
        <p>longitude - {longitude}</p>
      </header>
    </div>
  );
}

export default App;
