import React from "react";

const DisplayPhoneBoock = (props) =>{
    return(
      <div>
          {props.filteredList.map((p) =><li key={p.number}>{p.name} -- {p.number}</li>)}
      </div>
    )
  }

  
export default DisplayPhoneBoock;