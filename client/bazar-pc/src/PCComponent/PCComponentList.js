import React, { useEffect, useState } from "react";
import {getData} from "../utilities/fetch"
import "../styles.css"

const PCComponentList = () => {

    const [ PcComponentsState, setPcComponents] = useState([]);

    useEffect( () => {
        getData("http://localhost:8080/bazar/component")
        .then(data => setPcComponents(data));
    },[]);

    if(!PcComponentsState) return(<p>Načítám...</p>);

    return (
        <div >
            <table className="table table-bordered">
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
                        <tr>
                            <td><img src={`data:image/jpeg;base64,${item.imageFile01}`}  className="img"></img></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PCComponentList;