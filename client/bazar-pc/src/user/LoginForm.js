import { useState } from "react";
import { postJSONData } from "../utilities/fetch";

const LoginForm = () => {

    const [userState, setUser] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {

        postJSONData(   "http://localhost:8080/bazar/user/account",
                        userState );
    }

    return (
        <div className="container custom-form-width card p-3 mt-3 mb-3">
            <h2>Přihlášení: </h2>
            {/*Form for user registration*/}
            <form className="pt-3" action={handleSubmit}>
                {/*email*/}
                <div className="mb-3">               
                    <label htmlFor="email" className="form-label">
                        e-mail: 
                    </label>
                    <input  type="text"
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
                            className="form-control"
                            id="password"
                            value={userState.password}
                            onChange={ (e) => { setUser( {...userState, password: e.target.value})}}/>
                </div>
                {/*Button to post form to server*/}
                <hr/>
                <button className="btn btn-primary" type="submit">Přihlásit se</button>
            </form>
        </div>
    )
}


export default LoginForm;