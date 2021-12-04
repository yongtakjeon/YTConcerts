import loginStyle from './Login.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import { API_HEADER, API_LOGIN } from '../../api/api';


const Login = (() => {

    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);


    // This function will be executed when 'Log In' button is clicked.
    const submitHandler = (event) => {

        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        setIsLoading(true);


        // attempt to sign in and get the 'userId' and 'nickname' using Firebase Auth API
        fetch(API_LOGIN, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                setIsLoading(false);

                // if there is an error
                if (data.error) {
                    alert(data.error.message);
                    return;
                }

                // save the userId, nickname to Context
                authCtx.login(data.localId, data.displayName);

                // redirect to the home page
                history.push('/');

            })
            .catch(err => {
                console.log(err);
            });

    };

    return (
        <form onSubmit={submitHandler} className={loginStyle.login}>
            <h2 className={loginStyle.title}>Sign In</h2>
            <Link to="/register">
                <span className={loginStyle.registerLink}>Don’t have an account yet? Sign up.</span>
            </Link>
            <input type="email" placeholder="Email" name="email" required autoFocus ref={emailRef} className={loginStyle.inputBox} />
            <br />
            <input type="password" placeholder="Password" name="password" required ref={passwordRef} className={loginStyle.inputBox} />

            <div className={loginStyle.buttons}>
                {
                    !isLoading &&
                    <button type="submit" className={loginStyle.button}>Log In</button>
                }
                {
                    isLoading &&
                    <button disabled className={`${loginStyle.button} ${loginStyle.processingButton}`}>Processing Request</button>
                }
            </div>
        </form>
    );
});
export default Login;
