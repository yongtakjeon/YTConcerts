import { createContext, useState } from 'react';

export const AuthContext = createContext({
    userId: '', // The uid of the authenticated user.
    nickname: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

const AuthContextProvider = (props) => {

    // sessionStorage properties allow to save key/value pairs in a web browser.
    // read data from sessionStorage
    const initialUserId = sessionStorage.getItem('userId');
    const initialNickname = sessionStorage.getItem('nickname');

    const [userId, setUserId] = useState(initialUserId);
    const [nickname, setNickname] = useState(initialNickname);

    const userIsLoggedIn = !!userId;

    // This function will be executed when the user tries to log in.
    const loginHandler = (userId, nickname) => {
        setUserId(userId);
        setNickname(nickname);

        // save data to sessionStorage
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('nickname', nickname);
    };

    // This function will be executed when the user tries to log out.
    const logoutHandler = () => {
        setUserId(null);
        setNickname(null);

        // remove saved data from sessionStorage
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('nickname');
    };


    const contextValue = {
        userId: userId,
        nickname: nickname,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;