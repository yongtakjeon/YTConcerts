import { Link } from 'react-router-dom';
import headerStyle from './Header.module.css'

const Header = () => {
    return (
        <div className={headerStyle.header}>
            <h1 className={headerStyle.mainTitle}>YT Concerts</h1>
            <div className={headerStyle.beforeLogin}>
                <Link to="/login">
                    <button className={headerStyle.buttons}>Log In</button>
                </Link>

                <Link to="/register">
                    <button className={headerStyle.buttons}>Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default Header;