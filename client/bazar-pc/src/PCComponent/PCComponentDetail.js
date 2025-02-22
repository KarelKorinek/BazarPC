import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getData} from "../utilities/fetch"
import { BASE_URL } from "../constants/GlobalConstants";

const PCComponentDetail = () => {

    const {id} = useParams();
    const [PCComponent, setPcComponent] = useState(null);
    
    useEffect( () => {
        getData(`${BASE_URL}/bazar/component/` + id)
        .then(data => setPcComponent(data));

    }, []);


    if(!PCComponent) return (<div>Načítám...</div>);
    
    return (
        <div className="container w-50 card pt-5 mt-3 mb-3">

            <h1>
                {PCComponent.name}
            </h1>
            <div id="ImageCarousel" className="carousel slide pt-5" >
                <div className="carousel-indicators">
                    { PCComponent.imageFiles.map( (image, index) => (
                        (index === 0) ?                     
                            <button type="button" data-bs-target="#ImageCarousel" data-bs-slide-to={index} className="active" aria-current="true" aria-label={`Slide ,${index}`}></button>
                            :
                            <button type="button" data-bs-target="#ImageCarousel" data-bs-slide-to={index} className="active" aria-current="true" aria-label={`Slide ,${index}`}></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    { PCComponent.imageFiles.map( (image, index) => (
                        (index === 0) ?                     
                            <div key={index} className="carousel-item active">
                                <img className="d-block w-100" src={`data:image/jpeg;base64,${image}`}></img>
                            </div>
                            :
                            <div key={index} className="carousel-item">
                                <img className="d-block w-100" src={`data:image/jpeg;base64,${image}`}></img>
                            </div>                           
                        
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#ImageCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#ImageCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="card  mt-4 mb-4 shadow">
                <div className="card-body">
                    <h5 className="card-title">{PCComponent.name}</h5>
                    <h6 className="card-subtitle mt-2">Popis:</h6>
                    <p className="card-text mt-1"> {PCComponent.description}</p>
                    <h6 className="card-subtitle mt-2">Prodejce:</h6>
                    <p className="card-text mt-1"> {PCComponent.userDetail.firstName} {PCComponent.userDetail.lastName} </p>
                    <h6 className="card-subtitle mt-2">E-mail:</h6>
                    <p className="card-text mt-1"> {PCComponent.userDetail.email}</p>
                    <h6 className="card-subtitle mt-2">Adresa:</h6>
                    <p className="card-text"> 
                        {PCComponent.userDetail.city}
                        <br/>
                        {PCComponent.userDetail.street}
                        <br/>
                        {PCComponent.userDetail.zipCode}
                    </p>
                    <h6 className="card-subtitle mt-2">Cena:</h6>
                    <h5 className="card-title mt-1">{PCComponent.price} Kč</h5>
                </div>
            </div>
        </div>
    );
}


export default PCComponentDetail;