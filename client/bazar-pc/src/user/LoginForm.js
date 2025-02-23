import { useEffect, useState } from "react";
import { postJSONData } from "../utilities/fetch";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/session";
import { BASE_URL } from "../constants/GlobalConstants";

const LoginForm = () => {

    const navigate = useNavigate();
    const { session, setSession } = useSession();

    const [userState, setUser] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = () => {

        postJSONData(   `${BASE_URL}/api/user/account`,
                        userState )
                    .then((data) => setSession( {data, status: "authenticated"}));


    }

    useEffect(() => {
        // redirect to main page
        if(session.data) navigate("/");
    }, [session]);

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
                            required
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