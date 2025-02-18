import { useEffect, useRef, useState } from "react";
import { getData, postFormData, putFormData } from "../utilities/fetch";
import { base64ToFile } from "../utilities/base64"
import { useSession } from "../context/session";
import { useParams } from "react-router-dom";

const PCComponentForm = () => {

    const dataLoaded = useRef(false);
    const {id} = useParams();
    const {session, setSession} = useSession();
    const [imagesState, setImages] = useState([]);
    const [imagesURLState, setImagesURL] = useState([]);
    const [PCComponentState, setPCComponent] = useState( {
        name: "",
        category: "",
        price: "",
        description: "",
        publishedDate: "",
        userId: null,
    } );

    const handleSubmit = (e) => {

        const formData = new FormData();

        // insert PC Component state to data variable and set content-type to application/json 
        const data = new Blob([JSON.stringify(PCComponentState)], { type: 'application/json' });
        
        formData.append("images", imagesState[0]);
        formData.append("images", imagesState[1]);
        formData.append("images", imagesState[2]);
        formData.append("data", data);
        
        if(id) { 
                putFormData( "http://localhost:8080/bazar/component/" + id,
                            formData) 
        } else {
              postFormData( "http://localhost:8080/bazar/component",
                             formData ) 
        }
    };

    useEffect( () => {
        console.log(imagesState[0]);
    },[imagesState])

    useEffect( () => {
        if(dataLoaded.current) return;

        if(id) {
             getData("http://localhost:8080/bazar/component/" + id)
                .then( (data) => {  
                    setPCComponent(data);
                    // Load images from server, check if imageFile is not null or undefined and convert them to File from base64 format
                    if(data.imageFiles) 
                        data.imageFiles.map( (imageFile, index) => (
                            setImages( (prevImage) => [...prevImage, base64ToFile(imageFile, data.imageNames[index])])
                        ));

                    // Convert images to URL
                    if(data.imageFiles)
                        data.imageFiles.map( (imageFile) => (
                            setImagesURL( (image) => [ ...image, `data:image/jpeg;base64,${imageFile}`])
                    ))
                });
            dataLoaded.current = true;
        }
    },[id])

    useEffect(() =>{
        if(session.data) 
            setPCComponent( {...PCComponentState, userId: session.data.id});
    },[session]);

    return (
        <div className="container custom-form-width card p-3 mt-3 mb-3">
            <h2>Vytvoření inzerátu:</h2>

            {/*Form for an ad creation*/}
            <form className="pt-3" action={handleSubmit}>

                {/*Name input*/}
                <div className="mb-3">               
                    <label htmlFor="name" className="form-label">
                        Název:
                    </label>
                    <input  className="form-control" 
                            id="name" 
                            value={PCComponentState.name} 
                            onChange={ (e) => { setPCComponent( {...PCComponentState, name: e.target.value} ) } } 
                    /> 
                </div>

                {/*Category input*/}
                <div className="mb-3">               
                    <label htmlFor="category" className="form-label">
                        Kategorie: 
                    </label>
                    <input  type="text"
                            className="form-control"
                            id="category" 
                            value={PCComponentState.category} 
                            onChange={ (e) => { setPCComponent( {...PCComponentState, category: e.target.value})}}
                    />
                </div>

                 {/*Price input*/}
                 <div className="mb-3">               
                    <label htmlFor="price" className="form-label">
                        Cena: 
                    </label>
                    <input  type="number"
                            className="form-control"
                            id="price"
                            value={PCComponentState.price}
                            onChange={ (e) => { setPCComponent( {...PCComponentState, price: e.target.value})}}
                    />
                </div>

                {/*Description input*/}
                <div className="mb-3">               
                    <label htmlFor="description" className="form-label">
                        Popis: 
                    </label>
                    <textarea   className="form-control" 
                                id="description" rows="5"
                                value={PCComponentState.description}
                                onChange={ (e) => { setPCComponent( {...PCComponentState, description: e.target.value})}} 
                    />
                </div>

                {/*Load images input*/}
                <div className="mb-3">
                    <div className="container mt-3">
                        <div className="row border border-2">
                            {   
                                (imagesURLState) ? 
                                                    imagesURLState.map( (item, index) => (
                                                        <div key={index} className="col-4 position-relative">
                                                            <img src={item} alt="image preview" className="m-2 img-thumbnail"/> 
                                                            <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0 m-3" 
                                                                    onClick={ () => {
                                                                        const updatedImagesURL = imagesURLState.filter((_, i) => i !== index);
                                                                        setImagesURL(updatedImagesURL);
                                                                        const updatedImages = imagesState.filter((_, i) => i !== index);
                                                                        setImages(updatedImages);
                                                                    }}>
                                                            x</button>
                                                        </div>))
                                                :
                                                    <img src="/icons/imageIcon.png" alt="image preview" className="img-thumbnail"/>   
                            }
                        </div>
                    </div>
                    <br/>
                    <label htmlFor="imageUpload" className="form-label">
                        Nahrát fotku (max. 3): 
                    </label>
                    <input  type="file"
                            className="form-control"
                            id="image01"
                            onChange={ (e) => { 
                                setImages( (prevImage) => [...prevImage, e.target.files[0]]);
                                setImagesURL( (image) => [ ...image, URL.createObjectURL(e.target.files[0])]); }}
                    />                  
                </div>

                {/*Button to post form to server*/}
                <hr/>
                { id ? <button className="btn btn-primary" type="submit">Upravit</button>
                     : <button className="btn btn-primary" type="submit">Vytvořit</button>}
                
            </form>
        </div>
    )
}

export default PCComponentForm;