import logo from './logo.svg';
import './App.css';

function App() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      'X-RapidAPI-Key': '1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e'
    }
  };

  let cities;

  const letsFetch = () => {

    fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?minPopulation=100000', options)
      .then(response => response.json())
      .then(response => {
        cities = response.data;
        console.log(response)
      })
      .catch(err => console.error(err));
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={letsFetch}>Let's fetch!</button>
      </header>
    </div>
  );
}

export default App;
