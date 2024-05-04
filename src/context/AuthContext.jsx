import React, {createContext, useState} from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = (props) =>{
    const [token, setToken] = useState(() => (localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null))

    return (
        <AuthContext.Provider value = {[token,setToken]}>
            {props.children}
        </AuthContext.Provider>
    )
}