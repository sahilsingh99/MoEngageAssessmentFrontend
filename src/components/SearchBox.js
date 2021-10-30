import SearchBar from "material-ui-search-bar";
import { deprecationHandler } from "moment";
import {useState, useEffect} from 'react';
// *snip*

function SearchBox(props) {

  const [value, setValue] = useState("");

  var handler = (value) => {

    console.log("value => ",value)

    props.handler(value);
    setValue("");
  }

    return (
      <SearchBar
      value={value}
      onChange={(newValue) => setValue(newValue)}
      onRequestSearch={() => handler(value)}
    />
      );
}

export default SearchBox;