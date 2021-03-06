import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  
  const [weather, setweather] = useState();
  const [latLon, setlatLon] = useState();
  const [Boolean, setBoolean] = useState(true);
  const hour= new Date().getHours()
  const minute= new Date().getMinutes()
  let iconApp = (weather?.weather[0].icon)+".png"
  let urlApp = `https://openweathermap.org/img/wn/${iconApp}`

  const toogleBoolean = () => {
    setBoolean(!Boolean);
  };


  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setlatLon({ lat, lon });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (latLon !== undefined) {
      const API_KEY = "8b3ed51d2bee34d458aef65ff4a4e8d2";
      const URL = `//api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`
      axios
        .get(URL)
        .then((res) => setweather(res.data))
        .catch((err) => console.log(err));
    }
  }, [latLon]);

  // console.log(weather);
  return (
    <div className="App">
    <div className="text1">
      <i className="fa-solid fa-location-dot ubi"></i>{weather?.name}, {weather?.sys.country} <br />
      <i className="fa-solid fa-clock ubi"></i>{hour}:{minute}<br />
      </div>
      <img className="icon" src={urlApp}/>
      <h1>{weather?.weather[0].main}</h1>
      
      <div className="text2">
      <p><i className="fa-solid fa-cloud ubi"></i> Clouds: {weather?.clouds.all} %</p>
      <p><i className="fa-solid fa-temperature-full ubi"></i> Pressure: {weather?.main.pressure} mB </p>
      <p> <i className="fa-solid fa-wind ubi"></i> WindSpeed: {weather?.wind.speed} Km/h</p>
    </div>
      <h3>
        Temp:
        {Boolean
          ? (weather?.main.temp - 273.15).toFixed(0) 
          : ((weather?.main.temp - 273.15) * 1.8 + 32).toFixed(0) } 
          {Boolean ? '°C' : '°F'}
      </h3>
      <button className="btn" onClick={toogleBoolean}> Degress °C / °F </button>
    </div>
  );
}

export default App;