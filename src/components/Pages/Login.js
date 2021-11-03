import loginStyle from './Login.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../store/auth-context';


const Login = (() => {

    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);


    const submitHandler = (event) => {

        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        setIsLoading(true);


        //call API
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTPHN12nrc4XXAV_nxW4F97LKiRK-LZ14', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

                // save the userId, nickname
                authCtx.login(data.localId, data.displayName);

                // redirect to the home page
                history.push('/');

            })
            .catch(err => {
                console.log(err);
            });

    };

    return (
        <form onSubmit={submitHandler}>
            <h2>Log In</h2>

            <input type="email" placeholder="Email" name="email" required autoFocus ref={emailRef} />
            <br />
            <input type="password" placeholder="Password" name="password" required ref={passwordRef} />
            <br />

            {
                !isLoading &&
                <button type="submit">
                    <span>Login</span>
                </button>

            }
            {
                isLoading &&
                <button disabled>
                    <span>Processing Request</span>
                </button>
            }

            <Link to="/register">
                <button>Register</button>
            </Link>
        </form>
    );
});
export default Login;
