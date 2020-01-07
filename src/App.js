import React, {useState, useEffect} from 'react';

import './App.css';

function App() {

  let latitude;
  let longitude;
  let something = 'sth'
  

  useEffect(() => {
  
    getLongAndLat()

    async function getLongAndLat() {
      let result = await getLocation()

      
    
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
    latitude = position.coords.latitude;
    console.log("TCL: showPosition -> latitude", latitude)
    
    longitude = position.coords.longitude;
    console.log("TCL: showPosition -> longitude", longitude)
  }



    }
    
  

  });

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
         test{latitude}{something}
        </p>
     
      </header>
    </div>
  );
}

export default App;
