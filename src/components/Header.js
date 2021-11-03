import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import headerStyle from './Header.module.css'

const Header = () => {

    const authCtx = useContext(AuthContext);

    return (
        <div className={headerStyle.header}>
            <h1 className={headerStyle.mainTitle}>YT Concerts</h1>

            {
                !authCtx.isLoggedIn &&
                <div className={headerStyle.beforeLogin}>
                    <Link to="/login">
                        <button className={headerStyle.buttons}>Log In</button>
                    </Link>

                    <Link to="/register">
                        <button className={headerStyle.buttons}>Sign Up</button>
                    </Link>
                </div>
            }
            {
                authCtx.isLoggedIn &&
                <div className={headerStyle.beforeLogin}>

                    <span className={headerStyle.nickName}> {authCtx.nickname} </span>

                    <Link to="/plans">
                        <button className={headerStyle.buttons}>Plans</button>
                    </Link>

                    <button className={headerStyle.buttons} onClick={authCtx.logout}>Log Out</button>
                </div>
            }
        </div>
    );
};
export default Header;