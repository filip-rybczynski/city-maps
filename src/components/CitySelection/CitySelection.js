import React from "react";
import debounce from "../../functions/debounce";

function CitySelection(props) {
  return (
    <>
      <form>
        <label htmlFor="city-name-search">Search city</label>
        <input
          list="city-names"
          id="city-name-search"
          name="city-name-search"
          value={props.searchedName}
          onChange={props.handleCitySearch}
        />
        <datalist id="city-name">
          <option value="Chocolate" />
          <option value="Coconut" />
          <option value="Mint" />
          <option value="Strawberry" />
          <option value="Vanilla" />
        </datalist>
        <button onClick={props.getCities}>Let's fetch!</button>
      </form>
    </>
  );
}

export default CitySelection;
