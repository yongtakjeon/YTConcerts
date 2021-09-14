import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ConcertList from "../components/Concert/ConcertList";

function Vancouver() {
    return (
        <>
            <Header />
            <NavBar />
            <ConcertList location="Vancouver"/>
        </>

    );
};

export default Vancouver;