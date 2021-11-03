import { createContext, useState } from 'react';

export const AuthContext = createContext({
    userId: '',
    nickname: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

const AuthContextProvider = (props) => {

    const initialUserId = sessionStorage.getItem('userId');
    const initialNickname = sessionStorage.getItem('nickname');

    const [userId, setUserId] = useState(initialUserId);
    const [nickname, setNickname] = useState(initialNickname);

    const userIsLoggedIn = !!userId;

    const loginHandler = (userId, nickname) => {
        setUserId(userId);
        setNickname(nickname);

        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('nickname', nickname);
    };

    const logoutHandler = () => {
        setUserId(null);
        setNickname(null);

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