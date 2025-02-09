import { createContext, useContext, useEffect, useState} from "react";
import { getData } from "../utilities/fetch";

/**
 *      Create context for session
 */
const SessionContext = createContext( {
    session: {data: null, status: "loading"}, setSession: (data) => {

    }
}); 

/**
 *  Wrapper function for useContext
 *  This function has to be called in React component to access session data.
 * 
 * @returns     the session context object
 */
export function useSession() {
    const session =  useContext(SessionContext);
    
    if(session === undefined) {
        // throw error in case session is undefined
        throw new Error("useSession has to be used within SessionContext");
    }

    return session;
}

/**
 *  useContext Provider for user session 
 *  React components has to be wrapped inside of this component to access the user session data
 * 
 * @param {children} wrappedComponent   the user session data will be available for this wrapped component 
 * @returns                             the session context provider
 */
export const SessionProvider = ({children}) => {
    
    // user session data useState hook 
    const [sessionState, setSessionState] = useState( {
        data: null,
        status: "loading"
    });

    // get session data from server
    useEffect( () => {
        getData( "http://localhost:8080/bazar/user/account")
            .then( data => setSessionState( {
                data,
                status: "authenticated"
            }))
            .catch( e => {
                if(e.response.status === 401) {                    
                    setSessionState( {
                        data: null,
                        status: "unauthenticated"
                    });

                    throw new Error("Unauthorized client error");
                } else {
                    throw e;
                }
            });
    }, []);

    return (
        <SessionContext.Provider value= {{session: sessionState, setSession: setSessionState}}>
            {children}
        </SessionContext.Provider>
    )

};