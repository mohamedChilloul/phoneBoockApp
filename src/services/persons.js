import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getPersons = ()=>{
    const req = axios.get(`${baseUrl}`)
    return req.then(res =>res.data).catch(err =>console.log(err, 'from getPersons :'))
}
const createPerson = (newObj)=>{
    const req = axios.post(`${baseUrl}`, newObj)
    return req.then(res =>res.data).catch(err =>console.log(err, 'from addPerson :'))
}

const deletePerson = (id)=>{
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(r =>r.data)
}

const updatePerson = (id, newObj)=>{
    const req = axios.put(`${baseUrl}/${id}`, newObj)
    return req.then(res=>res.data).catch(er=>console.log(er, 'from update'))
}

export default {getPersons, createPerson, deletePerson, updatePerson}