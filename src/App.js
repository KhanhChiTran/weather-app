import React, { Component } from "react";
import "./App.css";
import WeatherData from "./WeatherData";
import { WiFahrenheit } from "react-icons/wi";
import { WiCelsius } from "react-icons/wi";

class App extends Component {
  state = {
    city: "",
    weatherData: "",
    unit: "metric",
    icon: <WiFahrenheit />,
    isCity: false,
    error: "",
  };
  fetchApi = (city, unit) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6147110ad6ebb0173b54f294d10a5372&units=${unit}`
    )
      .then((res) => res.json())

      .then((data) => {
        if (data.cod !== "404")
          this.setState({
            weatherData: data,
            isCity: true,
            error: "",
          });
        else {
          this.setState({
            error: "City not  found",
          });
        }
      })
      .catch((error) => {
        console.log("city not found");
        console.log(error);
      });
  };

  inputHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    if (!this.state.city) return;
    this.fetchApi(this.state.city, this.state.unit);
  };
  tempChangeHandler = () => {
    console.log("change .... click");
    if (this.state.unit === "metric") {
      this.setState({
        unit: "imperial",
        icon: <WiCelsius />,
      });
    } else if (this.state.unit === "imperial") {
      this.setState({
        unit: "metric",
        icon: <WiFahrenheit />,
      });
    }
  };

  render() {
    // console.log("rendering...");
    return (
      <div className="App">
        <div className="search-wrap">
          <h1>Weather App</h1>
          <div className="search">
            <input
              value={this.state.city}
              onChange={this.inputHandler}
              type="text"
              placeholder="City"
            />
            <button onClick={this.submitHandler}>Search</button>
          </div>
        </div>
        {this.state.isCity && (
          <WeatherData
            data={this.state.weatherData}
            tempChangeHandler={this.tempChangeHandler}
            icon={this.state.icon}
            type={this.state.unit}
          />
        )}
        {!!this.state.error && <h1> {this.state.error} </h1>}
      </div>
    );
  }
}

export default App;
