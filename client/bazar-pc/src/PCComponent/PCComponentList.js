import React, { useEffect, useState } from "react"
import {getData, deleteData} from "../utilities/fetch"
import "../styles.css"
import {Link, useNavigate, useParams} from "react-router-dom"
import ReactPaginate from "react-paginate"

const PCComponentList = () => {

    const navigate = useNavigate();
    const {userId} = useParams();
    const [ PcComponentsState, setPcComponents] = useState(null);
    const [ pageNumberState, setPageNumber] = useState(0);

    // Pagination parameters
    const pageSize = 10;
    const PAGE_QUERY = `pageNumber=${pageNumberState}&pageSize=${pageSize}`;

    useEffect( () => {
        userId ?
                    getData(`http://localhost:8080/bazar/components/${userId}?${PAGE_QUERY}`)
                        .then( data => setPcComponents(data))
                :   
                    getData(`http://localhost:8080/bazar/components?${PAGE_QUERY}`)
                        .then(data => setPcComponents(data))
    },[pageNumberState]);

    const deletePCComponent = (id) => {
        deleteData("http://localhost:8080/bazar/component/" + id);
        // update PC component list (remove deleted item according its id)
        setPcComponents( prevPage => (  {...prevPage, 
                                            content: prevPage.content.filter( item => item.id !== id) // remove deleted PC component from the list
                                        }));
    }

    if(!PcComponentsState) return(<p>Načítám...</p>);
    
    return (
        <div className="container-mt5">
            <table className="table  centered-table table-hover" id="components-table">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Název</th>
                        <th>Cena</th>
                        {userId ? <th>Akce</th>
                                : <th>Prodejce</th>    
                    }
                    </tr>
                </thead>
                <tbody>
                    { PcComponentsState.content.map( (item) => (
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

            {/* Pagination */}
            <ReactPaginate 
                breakLabel              = {"..."}
                previousLabel           = {"< Předchozí"}
                nextLabel               = {"Další >"}
                onPageChange            = {({selected}) =>  setPageNumber(selected)}
                containerClassName      = {"pagination d-flex justify-content-center"}
                previousClassName       = {"page-item"}
                previousLinkClassName   = {"page-link"}
                nextClassName           = {"page-item"}
                nextLinkClassName       = {"page-link"}
                pageLinkClassName       = {"page-link"}
                activeClassName         = {"active"}
                pageCount               = {PcComponentsState.totalPages}
            />
        </div>
    )
}

export default PCComponentList;