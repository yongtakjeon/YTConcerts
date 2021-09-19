import navStyle from "./NavBar.module.css";
import { Link } from "react-router-dom";


const NavBar = () => {
    return(
        <nav>
            <ul className={navStyle.nav}>
                <li className={navStyle['nav-item']}>
                    <Link to="/concerts?page=0" className={navStyle['nav-link']}>All</Link>
                </li>
                <li className={navStyle['nav-item']}>
                    <Link to="/concerts?city=toronto&page=0" className={navStyle['nav-link']}>Toronto</Link>
                </li>
                <li className={navStyle['nav-item']}>
                    <Link to="/concerts?city=vancouver&page=0" className={navStyle['nav-link']}>Vancouver</Link>
                </li>
                <li className={navStyle['nav-item']}>
                    <Link to="/concerts?city=montreal&page=0" className={navStyle['nav-link']}>Montreal</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;