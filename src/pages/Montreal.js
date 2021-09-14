import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ConcertList from "../components/Concert/ConcertList";

function Montreal() {
    return (
        <>
            <Header />
            <NavBar />
            <ConcertList location="Montreal"/>
        </>

    );
};

export default Montreal;