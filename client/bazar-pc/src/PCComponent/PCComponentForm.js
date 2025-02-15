import { useEffect, useState } from "react";
import { getData, postFormData } from "../utilities/fetch";
import { useSession } from "../context/session";
import { useParams } from "react-router-dom";

const PCComponentForm = () => {

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

        formData.append("image01", imagesState[0]);
        formData.append("image02", imagesState[1]);
        formData.append("image03", imagesState[2]);
        formData.append("data", data);

        postFormData( "http://localhost:8080/bazar/component",
                      formData );
    };

    useEffect( () => {
        if(id) {
             getData("http://localhost:8080/bazar/component/" + id)
                .then( (data) => {  
                    setPCComponent(data);
                    setImages( (prevImage) => [...prevImage, data.imageFile01]);
                    setImages( (prevImage) => [...prevImage, data.imageFile02]);
                    setImages( (prevImage) => [...prevImage, data.imageFile03]);
                    console.log(typeof data.imageFile01)
                    setImagesURL( (image) => [ ...image, `data:image/jpeg;base64,${data.imageFile01}`]);
                    setImagesURL( (image) => [ ...image, `data:image/jpeg;base64,${data.imageFile02}`]);
                    setImagesURL( (image) => [ ...image, `data:image/jpeg;base64,${data.imageFile03}`]);

                });
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

                {/*Load image 01 input*/}
                <div className="mb-3">
                    {imagesState[0] ? <img src={imagesURLState[0]} alt="image preview" class="img-fluid"/>
                                    : <img src="/icons/imageIcon.png" alt="image preview" class="img-fluid"/> }
                    <br/>
                    <label htmlFor="image01" className="form-label">
                        Nahrát 1. fotku: 
                    </label>
                    <input  type="file"
                            className="form-control"
                            id="image01"
                            onChange={ (e) => { 
                                if(id) {
                                    setImages( (prevImage) => { 
                                        const updateImages = [...prevImage];
                                        updateImages[0] = e.target.files[0];
                                        return updateImages;
                                    });
                                    setImagesURL( (image) => {
                                        const updateImages = [...image];
                                        updateImages[0] = URL.createObjectURL(e.target.files[0]);
                                        return updateImages;
                                    })
                                } else {
                                    setImages( (prevImage) => [...prevImage, e.target.files[0]]);
                                    setImagesURL( (image) => [ ...image, URL.createObjectURL(e.target.files[0])]); }}
                                }
                    />                  
                </div>

                {/*Load image 02 input*/}
                <div className="mb-3">
                    {imagesState[1] ? <img src={imagesURLState[1]} alt="image preview" class="img-fluid"/>
                                    : <img src="/icons/imageIcon.png" alt="image preview" class="img-fluid"/>}        
                    <br/>       
                    <label htmlFor="image02" className="form-label">
                        Nahrát 2. fotku: 
                    </label>
                    <input  type="file"
                            className="form-control"
                            id="image02"
                            onChange={ (e) => { setImages( (prevImage) => [...prevImage, e.target.files[0]])
                                                setImagesURL( (image) => [ ...image, URL.createObjectURL(e.target.files[0])])
                            }}
                    />
                </div>

                {/*Load image 03 input*/}
                <div className="mb-3">       
                    {imagesState[2] ? <img src={imagesURLState[2]} alt="image preview" class="img-fluid"/>
                                    : <img src="/icons/imageIcon.png" alt="image preview" class="img-fluid"/>}       
                    <br/> 
                    <label htmlFor="image03" className="form-label">
                        Nahrát 3. fotku: 
                    </label>
                    <input  type="file"
                            className="form-control"
                            id="image03"
                            onChange={ (e) => { setImages( (prevImage) => [...prevImage, e.target.files[0]])
                                                setImagesURL( (image) => [ ...image, URL.createObjectURL(e.target.files[0])])
                            }}/>
                </div>

                {/*Button to post form to server*/}
                <hr/>
                <button className="btn btn-primary" type="submit">Vytvořit</button>
            </form>
        </div>
    )
}

export default PCComponentForm;