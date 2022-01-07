import React from "react";


const AddPersForm = (props)=>{
    return(
  <form onSubmit={props.addNewContact}>
          <div>
            name: <input value={props.newName} onChange={props.handleNameChange} />
          </div>
          <div>
            phoneNumber: <input value={props.number} onChange={props.handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>  )
  }
  
export default AddPersForm;