import { createContext, useState } from 'react';

export const AuthContext = createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

const AuthContextProvider = (props) => {
    
    const initialToken = sessionStorage.getItem('token');

    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        sessionStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken(null);
        sessionStorage.removeItem('token');
    };
    

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;