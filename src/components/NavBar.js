import navStyle from "./NavBar.module.css";
import { Link } from "react-router-dom";


const NavBar = () => {
    return(
        <nav>
            <ul className={navStyle.nav}>
                <li className={navStyle['nav-item']}>
                    <Link to="/" className={navStyle['nav-link']}>All</Link>
                </li>
                <li className={navStyle['nav-item']}>
                    <Link to="/toronto" className={navStyle['nav-link']}>Toronto</Link>
                </li>
                <li className={navStyle['nav-item']}>
                    <Link to="/vancouver" className={navStyle['nav-link']}>Vancouver</Link>
                </li>
                <li className={navStyle['nav-item']}>
                    <Link to="/montreal" className={navStyle['nav-link']}>Montreal</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;