import React from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./App.component/weather.component";
import Form from "./App.component/form.component";
const API_Key = "44de67a28f5f34a6af0d534da8992865";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false,
    };
   
    this.weathericon = {
      thunderstorm: "wi-thunderstorm",
      dizzle: "wi-sleet",
      rain: "wi-rain",
      snow: "wi-snow",
      atmosphere: "wi-fog",
      clear: "wi-day-sunny",
      clouds: "wi-day-fog",
    };
  }
  calcelcius(temp) {
    let result = Math.floor(temp - 273.15);
    return result;
  }
  setweathericon(weathericon, code) {
    switch (true) {
      case code >= 200 && code <= 232:
        this.setState({ icon: this.weathericon.thunderstorm });
        break;
      case code >= 300 && code <= 321:
        this.setState({ icon: this.weathericon.dizzle });
        break;
      case code >= 500 && code <= 531:
        this.setState({ icon: this.weathericon.rain});
        break;
      case code >= 600 && code <= 622:
        this.setState({ icon: this.weathericon.snow});
        break;
      case code >= 701 && code <= 781:
        this.setState({ icon: this.weathericon.atmosphere});
        break;
      case code===800:
        this.setState({ icon: this.weathericon.clear });
        break;
      case code >= 801 && code <= 804:
        this.setState({ icon: this.weathericon.clouds});
        break;
      default :
      this.setState({ icon: this.weathericon.clouds});
      break;

    }
  }
  getweather = async (e) => {
    e.preventDefault();

    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
   if(city && country){
    const api_call= await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`
    )
    const response = await api_call.json();
    this.setState({
      city: `${response.name},${response.sys.country}`,
      temp: this.calcelcius(response.main.temp),
      temp_min: this.calcelcius(response.main.temp_min),
      temp_max: this.calcelcius(response.main.temp_max),
      description: response.weather[0].description,
      error:false
    });
    this.setweathericon(this.weathericon, response.weather[0].id);
    console.log(response);}
    else{
      this.setState({error:true})
    }
  };
  render() {
    return (
      <div className="App">
        <Form loadweather={this.getweather} error={this.state.error}/>
        <Weather
          city={this.state.city}
          temp={this.state.temp}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          icon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
