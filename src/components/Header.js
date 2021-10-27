import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import headerStyle from './Header.module.css'

const Header = () => {


    const authCtx = useContext(AuthContext);
    const [nickName, setNickName] = useState('');

    const getNickName = () => {

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTPHN12nrc4XXAV_nxW4F97LKiRK-LZ14', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: authCtx.token
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                console.log(data);

                setNickName(data.users[0].displayName);

            });

    };



    useEffect(() => {

        if (authCtx.isLoggedIn) {
            getNickName();
        }
        else {
            setNickName('');
        }

    }, [authCtx.isLoggedIn]);


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

                    <span className={headerStyle.nickName}> {nickName} </span>

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