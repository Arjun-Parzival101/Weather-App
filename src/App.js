import React from "react";

const api = {
  key: "0d369ba3d543f482e249faf57b640351",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = React.useState("");

  const [weather, setWeather] = React.useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });  
    }
  }

  const dateBuilder = (d)=> {
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
      ? (
        (weather.main.temp < 4) ? "app cold" : "app" &&
        (weather.main.temp > 34) ? "app hot" : "app" &&
        (weather.weather[0].main === "Rain") ? "app rainy" : "app" &&
        (weather.weather[0].main === "Mist") ? "app mist" : "app" && 
        (weather.weather[0].main === "Smoke") ? "app smoke" : "app" && 
        (weather.weather[0].main === "Clouds") ? "app cloudy" : "app" &&
        (weather.weather[0].main === "Haze") ? "app haze" : "app" && 
        (weather.weather[0].main === "Thunderstorm") ? "app thunder" : "app" &&
        (weather.weather[0].main === "Snow") ? "app snow" : "app" &&
        (weather.weather[0].main === "Clear") ? "app clear" : "app" &&
        (weather.weather[0].main === "Drizzle") ? "app drizzle" : "app"
      ) : "app" }>
      <main>
        
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
  <div>
    <div className="location-box">
      <a href={"https://www.google.com/maps?q="+weather.name}>
          <div className="location">{weather.name}, {weather.sys.country}</div></a>
            <div className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp-box">
            {/* <img src={"http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"} /> */}
            <div className="temp" >
              <p>{Math.round(weather.main.temp)}°C</p>
            </div>

          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
    </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
