import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_HEADER, API_SIGNUP, API_UPDATE_NICKNAME } from '../../api/api';
import registerStyle from './Register.module.css';


const Register = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();
    const nicknameRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);


    const submitHandler = (event) => {

        event.preventDefault();
        setIsRegistered(false);

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const password2 = password2Ref.current.value;
        const nickname = nicknameRef.current.value;

        // validation
        if (password !== password2) {
            alert("Password do not match.");
            return;
        }

        if (nickname.trim() === "") {
            alert("Enter your nick name.")
            return;
        }

        setIsLoading(true);

        //call API
        fetch(API_SIGNUP, {
            method: 'POST',
            headers: API_HEADER,
            // 'body' part should be sent as a string so that JSON.stringfy() is used.
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                if (data.error) {
                    setIsLoading(false);
                    alert(data.error.message);
                    return;
                }


                //nickname update
                fetch(API_UPDATE_NICKNAME, {
                    method: 'POST',
                    headers: API_HEADER,
                    body: JSON.stringify({
                        idToken: data.idToken,
                        displayName: nickname
                    })
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {

                        setIsLoading(false);

                        // console.log(data);

                        if (data.error) {
                            alert(data.error.message);
                            return;
                        }

                        setIsRegistered(true);

                    });

            });

    };

    return (
        <form onSubmit={submitHandler} className={registerStyle.register}>
            <h2 className={registerStyle.title}>Sign Up</h2>
            <input type="email" placeholder="Email" name="email" required autoFocus ref={emailRef} className={registerStyle.inputBox} /> <br />
            <input type="password" placeholder="Password" name="password" required ref={passwordRef} className={registerStyle.inputBox} /> <br />
            <input type="password" placeholder="Password confirm" name="password2" required ref={password2Ref} className={registerStyle.inputBox} />
            <br />
            <input type="text" placeholder="Nickname" name="nickname" required ref={nicknameRef} className={registerStyle.inputBox} /> <br />

            <div className={registerStyle.buttons}>
                {
                    !isLoading &&
                    <button type="submit" className={registerStyle.button}>Register</button>
                }
                {
                    isLoading &&
                    <button disabled className={`${registerStyle.button} ${registerStyle.processingButton}`}>Processing Request</button>
                }

                {
                    isRegistered &&
                    <div><br /><br /><span className={registerStyle.loginNotice}>Registration Successful. Proceed to</span><br /><br />
                        <Link to="/login">
                            <button className={`${registerStyle.button} ${registerStyle.loginButton}`}>Log In</button>
                        </Link>
                    </div>
                }
            </div>
        </form>
    );
};

export default Register;