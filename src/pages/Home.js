import ConcertList from "../components/Concert/ConcertList";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function Home(props) {

    return (
        <>
            <Header />
            <NavBar />
            <ConcertList location="Canada"/>
            
        </>
    );
};
export default Home;
