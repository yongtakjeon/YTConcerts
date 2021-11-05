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

    return <div>
        <form onSubmit={submitHandler}>
            <h2>Register</h2>
            <input type="email" placeholder="Email" name="email" required autoFocus ref={emailRef} /> <br />

            <input type="password" placeholder="Password" name="password" required ref={passwordRef} /> <br />

            <input type="password" placeholder="Password Confirm" name="password2" required ref={password2Ref} /> <br />

            <input type="text" placeholder="Nick Name" name="nickname" required ref={nicknameRef} /> <br />

            {
                !isLoading &&
                <button type="submit">
                    <span>Register</span>
                </button>

            }

            {
                isLoading &&
                <button disabled>
                    <span>Processing Request</span>
                </button>
            }

        </form>

        {
            isRegistered &&
            <div>Registration Successful. Proceed to<br /><br />
                <button>
                    <Link to="/login">Log In</Link>
                </button>
            </div>
        }
    </div>;
};

export default Register;