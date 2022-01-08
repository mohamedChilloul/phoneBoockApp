import React from 'react';

const Notification =({message, success})=>{
    const successStyle = {
        color : 'green',
        backGroundColor: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding : 10,
        marginBottom : 10
    }
    const dangerStyle = {
        color : 'red',
        backGroundColor: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding : 10,
        marginBottom : 10
    }
    if(message === null)
    {
        return null
    }else if(message !==null && success){
        return(
            <div style={successStyle}>
                {message}
            </div>
        )
    }
    return(
        <div style={dangerStyle}>
            {message}
        </div>
    )
}

export default Notification