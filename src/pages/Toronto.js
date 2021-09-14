import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ConcertList from "../components/Concert/ConcertList";

function Toronto() {
    return (
        <>
            <Header />
            <NavBar />
            <ConcertList location="Toronto"/>
        </>

    );
};

export default Toronto;