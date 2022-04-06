import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './flatsDesign.css';
import API from '../../services/API';
import Countries from '../../components/countries/countries';
import axios from 'axios';


function Flat() {

    const [buildings, setBuildings] = useState([])
    const [owners, setOwners] = useState([])
    const [numberFlat, setNumberFlat] = useState("")
    const [selectedOwner, setSelectedOwner] = useState("")
    const [selectedBuilding, setSelectedBuilding] = useState("")
    const [countriesList, setCountriesList] = useState([])


    useEffect ( () => {
        getInfo()
        getBuildings()
        getCountries()
    }, []);

    async function getInfo(){
        const owners = await API.getOwners()
        .then(res => {
            console.log(res.data)
            setOwners(res.data)
        })
    }

    async function getBuildings(){
        const buildingResult = await API.getBuildings("created", 0)
        .then(res => {
            console.log(res.data)
            setBuildings(res.data)
        })
    }

    async function addFlats(){
        const params = {
            owner:selectedOwner,
            building:selectedBuilding,
            department:numberFlat
        }
        API.addFlat(params)
        .then(res => {
            alert("Flat register")
        })
        .catch(err => {
            alert("Register Error")
        })
        clearValues()
    }

    function clearValues(){
        setSelectedOwner("")
        setNumberFlat("")
        setSelectedBuilding("")
    }

    async function getCountries(){
        const data = []
        await axios.get("https://restcountries.com/v2/all")
        .then(res => {
            for (var x in res.data){
                data.push(res.data[x].name)
            }
            setCountriesList(data)
        })
        .catch(err => {
            getCountries()
        })
    }

    return (
        <>
        <div>
            <button onClick={() => document.location = "/buildings"}>Ir a Edificios</button>
            <Card.Title className="building formBuilding">Registrar Departamento</Card.Title>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control placeholder="Ingresa el numero de departamento" type='text' value={numberFlat} onChange={e => setNumberFlat(e.target.value)}/>
                    {owners.message !== "empty model" &&
                    <Form.Select aria-label="Default select example" value={selectedOwner} onChange={e => setSelectedOwner(e.target.value)}>
                        <option>Selecciona el usuario</option>
                        {owners.map((val) => {
                            return (
                              <option value={val.id}>{val.name}</option>
                            )
                        })}
                    </Form.Select>
                    }
                    {owners.message === "empty model" &&
                        <Form.Label style={{color:"red"}}>Registra un Nuevo Usuario</Form.Label>
                    }
                    {buildings.message !== "empty model" &&
                    <Form.Select aria-label="Default select example" value={selectedBuilding} onChange={e => setSelectedBuilding(e.target.value)}>
                        <option>Selecciona el edificio</option>
                        {buildings.map((val) => {
                            return (
                              <option value={val.id}>{val.address}</option>
                            )
                        })}
                    </Form.Select>
                    }
                    {buildings.message === "empty model" &&
                        <Form.Label style={{color:"red"}}>Registra un Nuevo Edificio</Form.Label>
                    }
                </Form.Group>
            </Form>
            <button className="building formBuilding" onClick={addFlats}  disabled={selectedOwner === "" || selectedBuilding === "" || numberFlat === ""}
            >Registrar</button>
        </div>
        <div>
            <Countries
            countries_list={countriesList}
            />
        </div>
        </>
    )
}
export default Flat;

