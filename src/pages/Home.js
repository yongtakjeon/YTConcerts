import ConcertList from "../components/Concert/ConcertList";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function Home() {
    return (
        <div>
            <Header/>
            <NavBar/>
            <p className="section-title">Recent Announcements</p>
            <ConcertList/>
            <br /> <br />
            <p className="section-title">Trending Now</p>
            <ConcertList />
        </div>
    );
};
export default Home;
