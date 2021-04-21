import React from "react";
import { WiThermometer } from "react-icons/wi";
import { WiRaindrop } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";

const WeatherData = ({ data, tempChangeHandler, icon, type }) => {
  console.log(data);
  if (!data) {
    return <h1> </h1>;
  }
  return (
    <div className="weather-show">
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png `}
        alt="pic"
      />
      <h3>{data.weather[0].main} </h3>
      <div className="temp">
        <h1>
          {type === "metric"
            ? `${Math.round(data.main.temp)}°C`
            : `${Math.round((data.main.temp * 9) / 5 + 32)}°F`}
        </h1>
        <div className="icon temp-icon" onClick={tempChangeHandler}>
          {icon}
        </div>
      </div>
      <h2>{data.name}</h2>
      <div className="info">
        <div className="info-item">
          <div className="icon">
            <WiThermometer />
          </div>
          <div>Feels like</div>{" "}
          <div>
            {type === "metric"
              ? `${Math.round(data.main.temp)}°C`
              : `${Math.round((data.main.temp * 9) / 5 + 32)}°F`}
          </div>
        </div>
        <div className="info-item">
          <div className="icon">
            <WiRaindrop />
          </div>
          <div>Humidity </div> <div>{data.main.humidity}</div>
        </div>
        <div className="info-item">
          <div className="icon">
            <WiStrongWind />
          </div>
          <div>Wind Speed</div> <div>{data.wind.speed}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
