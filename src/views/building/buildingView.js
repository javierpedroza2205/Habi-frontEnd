import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../../services/API';
import './buildingDesign.css';


function Building() {
    const [buildingInfo, setBuildingInfo] = useState("startView")
    const [orderParam, setOrderParam] = useState("created")
    const [descending, setDescending] = useState(0)
    const [deleteValue,setDeleteValue] = useState("")
    const [area, setArea] = useState("")
    const [rooms, setRooms] = useState("")
    const [price, setPrice] = useState("")
    const [address, setAddress] = useState("")
    const [town, setTown] = useState("")



    useEffect ( () => {
        getBuildings(orderParam, descending)
    }, []);

    
    async function getBuildings(order, desc){
        const buildingResult = await API.getBuildings(order, desc)
        .then(res => {
            console.log(res.data)
            setBuildingInfo(res.data)
        })
    }
    
    function changeOrderValue(val){
        if (val === "0" || val === "1"){
            setDescending(val)
            getBuildings(orderParam,val)
        }
        else{
            setOrderParam(val)
            getBuildings(val,descending)
        }
    }

    async function deleteBuilding(){
        const params = {building_id: deleteValue}
        API.deleteBuilding(params)
        .then(res => {
            alert("Delete ok")
            getBuildings(orderParam, descending)

        })
        .catch(err => {
            alert("Building doesnt exist.")
        })
        setDeleteValue("")
    }

    async function addBuilding(){
        const params = {
            area: area,
            number_rooms:rooms,
            price: price,
            address: address,
            town: town
        }
        API.addBuilding(params)
        .then(res => {
            alert("Building register")
            getBuildings(orderParam, descending)
        })
        .catch(err => {
            alert("Register Error")
        })
        clearValues()
    }

    function clearValues(){
        setArea("")
        setRooms("")
        setPrice("")
        setAddress("")
        setTown("")
    }



  return (
    <>
        <button onClick={() => document.location = "/flats"}>Ir a Departamentos</button>
        {(buildingInfo.message !== "empty model"  && buildingInfo !== "startView") &&
            <>

                <div className='building'>
                            <div style={{display:"grid"}}>
                                <p>ordenado por: </p>
                                <select value={orderParam} onChange={e => changeOrderValue(e.target.value)}>
                                    <option value="town">Localidad</option>
                                    <option value="created" >Fecha de creacion</option>
                                </select><br/>
                                <select value={descending} onChange={e => changeOrderValue(e.target.value)}>
                                    <option value={1}>Ascendente</option>
                                    <option value={0} >Descendente</option>
                                </select>
                            </div>  
                            <table>
                                <tr>
                                <th>ID</th>
                                <th>area(Metros)</th>
                                <th>Cuartos</th>
                                <th>Precio</th>
                                <th>Localidad</th>
                                <th>Direccion</th>
                                <th>Registrado</th>
                                </tr>
                                {buildingInfo.map((val) => {
                                return (
                                    <tr>
                                    <td>{val.id}</td>
                                    <td>{val.area}</td>
                                    <td>{val.number_rooms}</td>
                                    <td>{val.price}</td>
                                    <td>{val.town}</td>
                                    <td>{val.address}</td>
                                    <td>{val.created}</td>
                                    </tr>
                                )
                                })}
                            </table>
                            <p>Mostrando: {buildingInfo.length} registros.</p>
                            <div>
                                <p>Eliminar Edificio: </p>
                                <input 
                                placeholder='Ingresa el ID del edificio'
                                type={"number"}
                                value={deleteValue}
                                onChange={e => setDeleteValue(e.target.value)}></input>
                                <button
                                style={{marginLeft:"2rem"}}
                                disabled={deleteValue == "" || deleteValue < 1}
                                onClick={deleteBuilding}>Eliminar</button>
                            </div>
                </div>
            </>
        }
    <div>
        <Card.Title className="building formBuilding">Registrar Edificio</Card.Title>
            <Form  className="building formBuilding">
                <Form.Group className="mb-3">
                    <Form.Label>Area del edificio (Metros)</Form.Label>
                    <Form.Control placeholder="Ingresa el area" type='number' value={area} onChange={e => setArea(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Numero de cuartos</Form.Label>
                    <Form.Control placeholder="Numero de cuartos" type='number' value={rooms} onChange={e => setRooms(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control placeholder="Precio" type='number' value={price} onChange={e => setPrice(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control placeholder="Direccion" type='text' value={address} onChange={e => setAddress(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control placeholder="Localidad" type='text' value={town} onChange={e => setTown(e.target.value)}/>
                </Form.Group><br/>
            </Form>
            <button className="building formBuilding" onClick={addBuilding}
            disabled={area === "" || rooms === "" || price === "" || address === "" || town === ""}>Registrar</button>
    </div>
    </>
  );
}

export default Building;
