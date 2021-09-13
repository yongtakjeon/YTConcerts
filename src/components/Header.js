import headerStyle from './Header.module.css'

const Header = () => {
    return (
        <div className={headerStyle.header}>
            <h1 className={headerStyle.mainTitle}>YT Concerts</h1>
            <div className={headerStyle.beforeLogin}>
                <button className={headerStyle.buttons}>Log In</button>
                <button className={headerStyle.buttons}>Sign Up</button>
            </div>
        </div>
    );
};

export default Header;