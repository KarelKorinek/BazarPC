import React, { useEffect } from "react";

const PCComponentList = () => {

    const [ PcComponents, setPcComponents] = useState({});

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
                    { PcComponents.map((item) => {
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PCComponentList;