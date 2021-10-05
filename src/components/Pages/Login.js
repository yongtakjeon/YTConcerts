import loginStyle from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = (() => {

    return (

        <form action="/user/login" method="POST">
            <h2>Log In</h2>

            <input placeholder="User Name" name="username" required autofocus />
            <br/>
            <input type="password" placeholder="Password" name="password" required />
            <br/>

            <button type="submit" >
                <span>Login</span >
                {/* <span>Processing Request</span > */}
            </button>

            <Link to="/register">Register</Link>
            

        </form>
    );

});

export default Login;
