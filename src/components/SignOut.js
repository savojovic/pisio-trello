import { useContext } from "react";
import React from "react";
import { SessionContext } from "./SessionContext";
import { useHistory } from "react-router-dom";

const LogOut = () => {

    const { isLogged, setIsLogged } = useContext(SessionContext);

    const history = useHistory();
    localStorage.removeItem('token')
    setIsLogged(false)

    return (
        <div>
            {history.push('/login')}
        </div>)
}

export default LogOut;