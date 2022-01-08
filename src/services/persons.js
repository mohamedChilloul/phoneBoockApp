import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getPersons = ()=>{
    const req = axios.get(`${baseUrl}`)
    return req.then(res =>res.data)
}
const createPerson = (newObj)=>{
    const req = axios.post(`${baseUrl}`, newObj)
    return req.then(res =>res.data)
}

const deletePerson = (id)=>{
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(r =>r.data)
}

const updatePerson = (id, newObj)=>{
    const req = axios.put(`${baseUrl}/${id}`, newObj)
    return req.then(res=>res.data)
}

export default {getPersons, createPerson, deletePerson, updatePerson}