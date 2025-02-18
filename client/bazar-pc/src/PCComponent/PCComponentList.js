import React, { useEffect, useState } from "react"
import {getData, deleteData} from "../utilities/fetch"
import "../styles.css"
import {Link, useNavigate, useParams} from "react-router-dom"

const PCComponentList = () => {

    const navigate = useNavigate();
    const {userId} = useParams();
    const [ PcComponentsState, setPcComponents] = useState(null);

    useEffect( () => {
        userId ?
                    getData("http://localhost:8080/bazar/components/" + userId)
                        .then( data => setPcComponents(data))
                :   
                    getData("http://localhost:8080/bazar/components")
                        .then(data => setPcComponents(data))
    },[]);

    const deletePCComponent = (id) => {
        deleteData("http://localhost:8080/bazar/component/" + id);
        // update PC component list (remove deleted item according its id)
        setPcComponents( prevList => prevList.filter(item => item.id !== id));
    }

    if(!PcComponentsState) return(<p>Načítám...</p>);
    
    return (
        <div className="container-mt5">
            <table className="table  centered-table table-hover" id="components-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Název</th>
                        <th>Cena</th>
                        {userId ? <th>Akce</th>
                                : <th>Prodejce</th>    
                    }
                    </tr>
                </thead>
                <tbody>
                    { PcComponentsState.map( (item) => (
                        <tr key={item.id}> 

                            <td>
                                <Link to={"/bazar/detail/" + item.id}>
                                    <img src={`data:image/jpeg;base64,${item.imageFiles[0]}`} className="img"></img>
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
                            { userId ?  <td>
                                            <div class="d-grid gap-2">
                                                <button type="button" class="btn btn-danger" onClick={ () => {deletePCComponent(item.id)} }>Odstranit</button>
                                                <button type="button" class="btn btn-warning" onClick={ () => {navigate("/bazar/component/edit/" + item.id)} }>Upravit</button>
                                            </div>
                                        </td>
                                     :                           
                                        <td>
                                            { item.userDetail ? `${item.userDetail.firstName} ${item.userDetail.lastName}`  : "Neznámý uživatel"}
                                        </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PCComponentList;