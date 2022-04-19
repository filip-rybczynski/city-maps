import "./App.css";
import React from "react";

class App extends React.Component {
  state = {
    cities: [],
  };

  options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
    },
  };

  letsFetch = () => {
    fetch(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?minPopulation=100000&limit=10",
      this.options
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          cities: response.data,
        });
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.letsFetch}>Let's fetch!</button>
          <ul>
            {this.state.cities.map((city) => (
              <li key={city.name}>
                {city.name}, {city.country} has {city.population} inhabitants.
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
