import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import headerStyle from './Header.module.css'


const Header = () => {

    const authCtx = useContext(AuthContext);

    return (
        <div className={headerStyle.header}>
            <h1 className={headerStyle.mainTitle}>YT Concerts</h1>

            {/* when user is not logged in */}
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

            {/* when user is logged in */}
            {
                authCtx.isLoggedIn &&
                <div className={headerStyle.afterLogin}>

                    <span className={headerStyle.nickName}>{authCtx.nickname}😃</span>

                    <Link to="/plans" className={headerStyle.afterLoginButtons}>
                        <button className={`${headerStyle.buttons} ${headerStyle.plans}`}>Plans</button>
                    </Link>

                    <button className={`${headerStyle.buttons} ${headerStyle.afterLoginButtons}`} onClick={authCtx.logout}>Log Out</button>
                </div>
            }
        </div>
    );
};
export default Header;