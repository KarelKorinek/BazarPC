import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getData} from "../utilities/fetch"

const PCComponentDetail = () => {

    const {id} = useParams();
    const [PCComponent, setPcComponent] = useState(null);
    
    useEffect( () => {
        getData("http://localhost:8080/bazar/component/" + id)
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
            
            <h5 className="pt-5">
                Popis: 
            </h5>
            <p>
                {PCComponent.description}
            </p>
            <h5>
                Kontakt:  
            </h5>
            <p>
                
            </p>
            <h5>
                Cena:  
            </h5>
            <p>
                {PCComponent.price} Kč
            </p>

        </div>
    );
}


export default PCComponentDetail;