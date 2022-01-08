import React from "react";

const DisplayPhoneBoock = ({filteredList, handleDelete}) =>{
    return(
      <table border="1px solid">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Number</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredList.map(
              person=><tr key={person.id}>
                <td>{person.id}</td>
                <td className="name">{person.name}</td>
                <td className="number">{person.number}</td>
                <td><button onClick={()=>handleDelete(person.id)}>delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }

  
export default DisplayPhoneBoock;