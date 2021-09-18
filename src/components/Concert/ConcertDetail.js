import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";


function ConcertDetail() {

    const { id } = useParams();
    const [concert, setConcert] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const history = useHistory();

    function concertDataHandler() {

        setIsLoading(true);

        fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setConcert(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setErrMsg(`There is an error fetching data! (${err})`);
                setIsLoading(false);
                setIsError(true);
            });

    }

    useEffect(() => {
        concertDataHandler();
    }, []);

    return (
        <div>
            {/* 1 */}
            {
                isLoading && <p>Loading...</p>
            }


            {/* 2 */}
            {!isLoading && !isError &&
            console.log(concert)}

            {concert.images && <img src={concert.images[0].url} />}
            <p>{concert.name}</p>

            {/* <p>{concert._embedded.attractions}</p> */}
            {
                concert._embedded && concert._embedded.attractions &&
                concert._embedded.attractions.map((artist, index) => {
                    return <p key={index}>{artist.name}</p>;
                })
            }
            {concert._embedded && <p>{concert._embedded.venues[0].name}</p>}
            {concert.dates && <p>{concert.dates.start.localDate}</p>}
            {concert.dates && <p>{concert.dates.start.localTime} {concert.dates.timezone}</p>}
            {/* {concert.classifications && <p>{concert.classifications[1].genre.name}/{concert.classifications[1].subGenre.name}</p>} */}

            <Link to={{ pathname: concert.url }} target="_blank">
                Buy Tickets
            </Link>


            {/* 3 */}
            {
                !isLoading && isError &&
                <p>{errMsg}</p>
            }

            <button onClick={() => { history.goBack() }}>back</button>

        </div>
    );
};

export default ConcertDetail;