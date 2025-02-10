import React, { useEffect, useState } from "react"
import {getData} from "../utilities/fetch"
import "../styles.css"
import {Link, useNavigate, useParams} from "react-router-dom"

const PCComponentList = () => {

    const navigate = useNavigate();
    const {userId} = useParams();
    const [ PcComponentsState, setPcComponents] = useState([]);

    useEffect( () => {
        userId ?
                    getData("http://localhost:8080/bazar/components/" + userId)
                        .then( data => setPcComponents(data))
                :   
                    getData("http://localhost:8080/bazar/components")
                        .then(data => setPcComponents(data))
    },[]);

    if(!PcComponentsState.length) return(<p>Načítám...</p>);
    
    return (
        <div className="container-mt5">
            <table className="table  centered-table table-hover" id="components-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Název</th>
                        <th>Cena</th>
                        <th>Prodejce</th>
                    </tr>
                </thead>
                <tbody>
                    { PcComponentsState.map( (item) => (
                        <tr key={item.id}> 

                            <td>
                                <Link to={"/bazar/detail/" + item.id}>
                                    <img src={`data:image/jpeg;base64,${item.imageFile01}`} className="img"></img>
                                </Link>
                            </td>
                            <td>
                                <Link to={"/bazar/detail/" + item.id}>
                                    {item.name}
                                </Link>
                            </td>
                            <td>
                                {item.price} Kč
                            </td>                           
                            <td>
                                { item.userDetail ? `${item.userDetail.firstName} ${item.userDetail.lastName}`  : "Neznámý uživatel"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PCComponentList;