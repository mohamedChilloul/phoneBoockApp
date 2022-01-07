import React from "react";
const Search = ({text, searchValue, onChange}) =>{
    return(
      <div>
        {text} <input value={searchValue} onChange={onChange}></input>
    </div>
    )
  }

  export default Search;