import { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";


function ConcertDetail() {

    const { id } = useParams();
    const [concert, setConcert] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [bestImg, setBestImg] = useState(null);
    const history = useHistory();

    // for saving the concert to the Plans
    const authCtx = useContext(AuthContext);


    function concertDataHandler() {

        setIsLoading(true);

        fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setConcert(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setErrMsg(`There is an error fetching data! (${err})`);
                setIsLoading(false);
                setIsError(true);
            });

    };

    function settingBestImg() {
        if (concert.images) {
            let img;
            let width = 0;

            concert.images.forEach(imgObj => {
                if (imgObj.width > width) {
                    width = imgObj.width;
                    img = imgObj;
                }
            });

            setBestImg(img);
        }
    };

    const addPlanHandler = (event) => {

        event.preventDefault();

        fetch(`https://ytconcerts-server.herokuapp.com/api/users/${authCtx.userId}/plans`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    concertId: id
                })
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.error) {
                    alert(data.error.message);
                }
                else {
                    alert("The concert is successfully added to the plans!");
                }
            })

    };


    useEffect(() => {
        concertDataHandler();
    }, []);

    // to execute settingBestImg() AFTER setConcert(data)
    useEffect(() => {
        settingBestImg();
    }, [concert]);


    return (
        <div>
            {/* 1 */}
            {
                isLoading && <p>Loading...</p>
            }


            {/* 2 */}
            {
                !isLoading && !isError &&
                <div>
                    {bestImg && <img src={bestImg.url} alt="Concert" />}
                    <Link to={`/concert/${concert.id}`}>{concert.name}</Link>

                    {
                        concert.dates && concert.dates.status.code === "cancelled" &&
                        <span>
                            {concert.dates.status.code}!
                        </span>
                    }

                    <div>
                        {
                            concert._embedded && concert._embedded.attractions &&
                            concert._embedded.attractions.map((artist, index) => {
                                return <Link to={`/artist/${artist.id}`} key={index}>{artist.name}, </Link>;
                            })
                        }
                    </div>

                    {
                        concert._embedded &&
                        <p>
                            <Link to={`/venue/${concert._embedded.venues[0].id}`}>{concert._embedded.venues[0].name}</Link>
                            , {concert._embedded.venues[0].city.name}, {concert._embedded.venues[0].state.stateCode}, {concert._embedded.venues[0].country.name}
                        </p>
                    }

                    {
                        authCtx.isLoggedIn &&
                        <form onSubmit={addPlanHandler}>
                            <button type="submit">
                                Save to Plans
                            </button>
                        </form>
                    }
                    {
                        !authCtx.isLoggedIn &&
                        <div>
                            <button onClick={() => { history.push('/login'); }}>
                                Save to Plans
                            </button>
                        </div>
                    }

                    {
                        concert.dates &&
                        <span>
                            Start: {concert.dates.start.localDate} {concert.dates.start.localTime} (Time zone:{concert.dates.timezone})
                        </span>
                    }
                    <p>
                        {
                            concert.classifications &&
                            <span>Genre: {concert.classifications[0].genre.name}</span>
                        }
                        {
                            concert.classifications && concert.classifications[0].subGenre &&
                            <span>/{concert.classifications[0].subGenre.name}</span>
                        }
                    </p>

                    {
                        concert.priceRanges &&
                        <p>Price: Min: ${concert.priceRanges[0].min} / Max: ${concert.priceRanges[0].max}</p>
                    }
                    <Link to={{ pathname: concert.url }} target="_blank">Buy Tickets</Link>
                    {
                        concert.info &&
                        <p>Info: {concert.info}</p>
                    }
                    {
                        concert.pleaseNote &&
                        <p>please Note: {concert.pleaseNote}</p>
                    }

                </div>
            }


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