import React, { useEffect, useState } from "react"
import {getData, deleteData} from "../utilities/fetch"
import "../styles.css"
import {Link, useNavigate, useParams} from "react-router-dom"
import ReactPaginate from "react-paginate"
import { BASE_URL } from "../constants/GlobalConstants";

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
                    getData(`${BASE_URL}/api/components/${userId}?${PAGE_QUERY}`)
                        .then( data => setPcComponents(data))
                :   
                    getData(`${BASE_URL}/api/components?${PAGE_QUERY}`)
                        .then(data => setPcComponents(data))
    },[pageNumberState]);

    const deletePCComponent = (id) => {
        deleteData(`${BASE_URL}/api/component/` + id);
        // update PC component list (remove deleted item according its id)
        setPcComponents( prevPage => (  {...prevPage, 
                                            content: prevPage.content.filter( item => item.id !== id) // remove deleted PC component from the list
                                        }));
    }

    if(!PcComponentsState) return(<p>Načítám...</p>);
    
    return (
        <div className="container">
            { userId ? 
                        <div className="container d-block mx-auto mt-5">
                            <h1>Moje inzeráty: </h1>
                        </div>
                     :
                        <div className="container mx-auto mt-5 d-flex justify-content-center align-items-center">
                            <img src="icons/BazarPCLogo.webp" className="w-25 title-image"></img>
                            <h1 className="d-inline mx-5 title-text ">PC bazar</h1>
                        </div>
            }

            <div className="container mt-5">
                { PcComponentsState.content.map( (item, index) => (  
                    <div key={index} className="d-flex justify-content-center align-items-center"> 
                        <div className="card mb-3 ItemCard border-dark item-size">
                            <Link to={"/bazar/detail/" + item.id} className="remove-link-decoration">
                            <div className="row g-0">
                                <div className="col-md-4">                       
                                    <img className="img-fluid" src={`data:image/jpeg;base64,${item.imageFiles[0]}`}></img>       
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="card-title mb-5">
                                            {item.name}
                                        </h3>
                                        <h5 className="card-title">
                                            Prodejce:
                                        </h5>
                                        <div className="card-text">
                                            { item.userDetail ? `${item.userDetail.firstName} ${item.userDetail.lastName}`  : "Neznámý uživatel"}
                                        </div>
                                        <h5 className="card-title mt-3">
                                            Popis:
                                        </h5>
                                        <div className="card-text">
                                            { item.description}
                                        </div>
                                        <h5 className="card-title mt-3">
                                            Cena:
                                        </h5>
                                        <div className="card-footer">
                                            {item.price} Kč
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                        { userId ?
                                        <div className="d-flex flex-column">
                                            <button type="button" class="btn btn-danger my-2 mx-2" onClick={ () => {deletePCComponent(item.id)} }>Odstranit</button>
                                            <button type="button" class="btn btn-warning my-2 mx-2" onClick={ () => {navigate("/bazar/component/edit/" + item.id)} }>Upravit</button>                                    
                                        </div>
                                     : ""
                                    }
                    </div>
                ))}
            </div>

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