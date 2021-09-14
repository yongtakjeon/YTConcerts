import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function ConcertDetail() {

    const { id } = useParams();
    const [concert, setConcert] = useState({});

    function concertDataHandler() {
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setConcert(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        concertDataHandler();
    }, []);

    return (
        <>  
            <Header/>
            <NavBar/>
            {console.log(concert)}

            <p>The Concert ID is: {id}</p>
            {/* <img src={concert.images[0].url}/> */}
            <p>{concert.name}</p>
            <p>{concert.type}</p>
            <p>{concert.id}</p>
            {/* <p>{concert._embedded.attractions}</p> */}
            {/* <p>{concert._embedded.venues[0].name}</p> */}
            {/* <p>{concert.dates.start.localDate}</p> */}
            {/* <p>{concert.dates.start.localTime} {concert.dates.timezone}</p> */}
            {/* <p>{concert.classifications[0].genre.name}/{concert.classifications[0].subGenre.name}</p> */}
            <a href={concert.url} target="_blank">buy tickets</a>
        </>
    );
};

export default ConcertDetail;