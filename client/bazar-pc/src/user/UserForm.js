import { useState } from "react";
import { postJSONData } from "../utilities/fetch";
import { useNavigate } from "react-router-dom"; 
import { BASE_URL } from "../constants/GlobalConstants";

const UserForm = () => {

    const [userState, setUser] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {

        if(userState.password !== userState.confirmPassword) {
            alert("Hesla se neshodují!");
        } else {

            // create new object userData and copy userState content without confirmPassword
            const { confirmPassword, ...userData } = userState;

            postJSONData( `${BASE_URL}/bazar/user/`,
                          userData )
                    .then(() => {
                        // redirect to login page
                        navigate("/bazar/user/account")
                    });
        }
    }

    return(
        <div className="container custom-form-width card p-3 mt-3 mb-3">
            <h2>Registrace:</h2>

            {/*Form for user registration*/}
            <form className="pt-3" action={handleSubmit}>

                {/*First name input*/}
                <div className="mb-3">               
                    <label htmlFor="firstName" className="form-label">
                        Jméno:
                    </label>
                    <input  className="form-control" 
                            required
                            id="firstName" 
                            value={userState.firstName} 
                            onChange={ (e) => { setUser( {...userState, firstName: e.target.value} ) } } 
                    /> 
                </div>

                {/*Last name input*/}
                <div className="mb-3">               
                    <label htmlFor="lastName" className="form-label">
                        Příjmení: 
                    </label>
                    <input  type="text"
                            required
                            className="form-control"
                            id="lastName" 
                            value={userState.lastName} 
                            onChange={ (e) => { setUser( {...userState, lastName: e.target.value})}}
                    />
                </div>

                {/*City*/}
                <div className="mb-3">               
                    <label htmlFor="city" className="form-label">
                        Obec: 
                    </label>
                    <input  type="text"
                            required
                            className="form-control"
                            id="city"
                            value={userState.city}
                            onChange={ (e) => { setUser( {...userState, city: e.target.value})}}
                    />
                </div>

                {/*street*/}
                <div className="mb-3">               
                    <label htmlFor="street" className="form-label">
                        Ulice: 
                    </label>
                    <input  type="text"
                            required
                            className="form-control"
                            id="street"
                            value={userState.street}
                            onChange={ (e) => { setUser( {...userState, street: e.target.value})}}
                    />
                </div>

                {/*zipCode*/}
                <div className="mb-3">               
                    <label htmlFor="zipCode" className="form-label">
                        PSČ: 
                    </label>
                    <input  type="text"
                            required
                            className="form-control"
                            id="zipCode"
                            value={userState.zipCode}
                            onChange={ (e) => { setUser( {...userState, zipCode: e.target.value})}}
                    />
                </div>

                {/*email*/}
                <div className="mb-3">               
                    <label htmlFor="email" className="form-label">
                        e-mail: 
                    </label>
                    <input  type="email"
                            required
                            className="form-control"
                            id="email"
                            value={userState.email}
                            onChange={ (e) => { setUser( {...userState, email: e.target.value})}}
                    />
                </div>

                {/*password*/}
                <div className="mb-3">               
                    <label htmlFor="password" className="form-label">
                        Heslo: 
                    </label>
                    <input  type="password"
                            required minLength={8}
                            className="form-control"
                            id="password"
                            value={userState.password}
                            onChange={ (e) => { setUser( {...userState, password: e.target.value})}}/>
                </div>

                {/*confirm password*/}
                <div className="mb-3">               
                    <label htmlFor="confirmPassword" className="form-label">
                        Potvrďte Heslo: 
                    </label>
                    <input  type="password"
                            required minLength={8}
                            className="form-control"
                            id="confirmPassword"
                            value={userState.confirmPassword}
                            onChange={ (e) => { setUser( {...userState, confirmPassword: e.target.value})}}/>
                </div>

                {/*Button to post form to server*/}
                <hr/>
                <button className="btn btn-primary" type="submit">Registrovat</button>
            </form>
        </div>
    );
}

export default UserForm;