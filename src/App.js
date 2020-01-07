import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  
  
  const [latitude, setLatitude] = useState("waiting for response");

  const [longitude, setLongitude] = useState("waiting for response");

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

  return (
    <div className="App">
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
