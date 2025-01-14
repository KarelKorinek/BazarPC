import React, { useEffect, useState } from "react";
import {getData} from "../utilities/fetch"

const PCComponentList = () => {

    const [ PcComponentsState, setPcComponents] = useState([]);

    useEffect( () => {
        getData("http://localhost:8080/bazar/component")
        .then(data => setPcComponents(data));
    },[]);

    return (
        <div >
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Cena</th>
                        <th>Prodejce</th>
                    </tr>
                </thead>
                <tbody>
                    { PcComponentsState.map( (item) => (
                        <tr>
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