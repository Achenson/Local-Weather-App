import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  
  
  const [latitude, setLatitude] = useState("waiting for response");

  const [longitude, setLongitude] = useState("waiting for response");

  //getting longitude and latitude from navigator.geolocation
  useEffect(() => {
    getLocation();

    //console.log("TCL: App ->  latitude",  latitude)
    //console.log("TCL: App -> longitude", longitude)

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      setLatitude(position.coords.latitude);
      console.log("TCL: showPosition -> latitude", latitude);

      setLongitude(position.coords.longitude);
      console.log("TCL: showPosition -> longitude", longitude);
    }
  });
  //fetching data from the API using longitude and latidue
  useEffect(() => {

    let myURL = `https://fcc-weather-api.glitch.me/api/current?lon=${longitude}&lat=${latitude}`

    fetch(myURL)
      .then(res => res.json())
      .then(data => {
        console.log(JSON.stringify(data, null ,2))
        console.log(data.name)

      })


    

  })


  return (
    <div style={{ textAlign: "center" }} className="App">
      <h1>
        Local Weather App
      </h1>
      <header className="App-header">
        <p>
          latitude - {latitude}
        </p>
        <p>
          longitude - {longitude}
        </p>
      </header>
    </div>
  );
}

export default App;
