import { Link } from 'react-router-dom';
import registerStyle from './Register.module.css';

const Register = () => {

    return <div>
        <form action="/user/register" method="POST">
            <h2>Register</h2>
            <input placeholder="User Name" name="username" required autofocus /> <br/>

            <input type="password" placeholder="Password" name="password" required /> <br/>

            <input type="password" placeholder="Password" name="password2" required /> <br/>

            <input placeholder="Nick Name" name="nickname" required /> <br/>

            <button type="submit">
                <span>Register</span>
                {/* {loading && <span>Processing Request</span>} */}
            </button>

        </form>

        {/* {
            success &&
            <div>Registration Successful. Proceed to<br /><br />
                <button>
                    <Link to="/login">Log In</Link>
                </button>
            </div>
        } */}
    </div>;
};

export default Register;