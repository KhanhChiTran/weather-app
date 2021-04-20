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
    icon: <WiCelsius />,
  };
  fetchApi = (city, unit) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6147110ad6ebb0173b54f294d10a5372&units=${unit}`
    )
      .then((res) => res.json())

      .then((data) =>
        this.setState({
          weatherData: data,
        })
      )
      .catch((error) => console.log(error));
  };

  inputHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.fetchApi(this.state.city, this.state.unit);
  };
  tempChangeHandler = () => {
    console.log("change .... click");
    if (this.state.unit === "metric") {
      this.setState({
        unit: "imperial",
        icon: <WiFahrenheit />,
      });
      // this.fetchApi(this.state.city, this.state.unit);
    } else if (this.state.unit === "imperial") {
      this.setState({
        unit: "metric",
        icon: <WiCelsius />,
      });
      // this.fetchApi(this.state.city, this.state.unit);
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
              onChange={this.inputHandler}
              type="text"
              placeholder="City"
            />
            <button onClick={this.submitHandler}>Search</button>
          </div>
        </div>
        <WeatherData
          data={this.state.weatherData}
          tempChangeHandler={this.tempChangeHandler}
          icon={this.state.icon}
          type={this.state.unit}
        />
      </div>
    );
  }
}

export default App;
