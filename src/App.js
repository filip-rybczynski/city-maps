import "./App.css";
import React from "react";
import capitalize from "./functions/capitalize";
import CitySelection from "./components/CitySelection/CitySelection";

class App extends React.Component {
  state = {
    cities: [],
    callsRemaining: 0,
    searchText: "",
  };

  fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
    },
  };

  fetchTimer;

  handleCitySearch = (e) => {
    const searchText = e.target.value;

    this.setState({
      searchText,
    });

    clearTimeout(this.fetchTimer);
    this.fetchTimer = setTimeout(() => {
      this.getCities(e);
    }, 1000);
  };

  getCities = (e) => {
    e.preventDefault();

    const searchText = capitalize(this.state.searchText);

    if (searchText === '') {
      this.setState({
        cities: [],
      })
      return;
    };

    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&limit=10&namePrefix=${searchText}`,
      this.fetchOptions
    )
      .then((response) => {
        const callsRemaining = response.headers.get(
          "x-ratelimit-requests-remaining"
        );
        this.setState({
          callsRemaining,
        });
        return response.json();
      })
      .then((response) => {
        const cities = response.data.filter((city) => {
          return city.name.startsWith(searchText);
        });
        this.setState({
          cities,
        });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { cities, callsRemaining, searchText} = this.state;

    return (
      <div className="App">
        <section className="App-header">
          <CitySelection
            searchedName={searchText}
            handleCitySearch={this.handleCitySearch}
            getCities={this.getCities}
          ></CitySelection>
          <ul>
            {cities.map((city) => (
              <li key={city.id}>
                {city.name}, {city.country} has {city.population} inhabitants.
              </li>
            ))}
          </ul>
          <p>
            {callsRemaining
              ? `You have ${callsRemaining} API calls left`
              : null}
          </p>
        </section>
      </div>
    );
  }
}

export default App;
