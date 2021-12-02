import concertDetailStyle from "./ConcertDetail.module.css";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { createTicketmasterURL, CONCERT_DETAIL, createYTConcertsURL, PLAN_ADD, API_HEADER } from "../../api/api";


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

        fetch(createTicketmasterURL(CONCERT_DETAIL, { concertId: id }))
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

        fetch(createYTConcertsURL(PLAN_ADD, { userId: authCtx.userId }),
            {
                method: 'POST',
                headers: API_HEADER,
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
            .catch(err => {
                console.log(err);
            });

    };


    useEffect(() => {
        concertDataHandler();
    }, []);

    // to execute settingBestImg() AFTER setConcert(data)
    useEffect(() => {
        settingBestImg();
    }, [concert]);


    return (
        <div className={concertDetailStyle['concert-detail']}>

            {/* 1 */}
            {
                isLoading && <p>Loading...</p>
            }


            {/* 2 */}
            {
                !isLoading && !isError &&
                <div>
                    <div className={concertDetailStyle.mainContent}>
                        <div className={concertDetailStyle.mainInfo}>
                            <p className={concertDetailStyle.concertName}>
                                <span>{concert.name}</span>
                                {
                                    concert.dates && concert.dates.status.code === "cancelled" &&
                                    <span className={concertDetailStyle.cancelled}>{concert.dates.status.code}</span>
                                }
                            </p>

                            <div>
                                {
                                    concert._embedded && concert._embedded.attractions &&
                                    <div className={concertDetailStyle.artists}>
                                        {
                                            concert._embedded.attractions.map((artist, index) => {
                                                return (
                                                    <span key={index}>
                                                        <Link to={{ pathname: artist.url }} target="_blank" className={concertDetailStyle.artist}>{artist.name}</Link>
                                                        {index !== concert._embedded.attractions.length - 1 && <span className={concertDetailStyle.comma}>, </span>}
                                                    </span>

                                                );
                                            })
                                        }
                                    </div>
                                }
                            </div>

                            {
                                concert._embedded &&
                                <Link to={{ pathname: concert._embedded.venues[0].url }} target="_blank" className={concertDetailStyle.venue}>{concert._embedded.venues[0].name}, {concert._embedded.venues[0].city.name}, {concert._embedded.venues[0].state.stateCode}, {concert._embedded.venues[0].country.name}</Link>
                            }
                            <Link to={{ pathname: concert.url }} target="_blank">
                                <button className={`${concertDetailStyle.button} ${concertDetailStyle.blueButton}`}>Buy Tickets</button>
                            </Link>
                            {
                                authCtx.isLoggedIn &&
                                <form onSubmit={addPlanHandler}>
                                    <button type="submit" className={`${concertDetailStyle.button} ${concertDetailStyle.greenButton}`}>
                                        Save to Plans
                                    </button>
                                </form>
                            }
                            {
                                !authCtx.isLoggedIn &&
                                <span>
                                    <button onClick={() => { history.push('/login'); }} className={`${concertDetailStyle.button} ${concertDetailStyle.greenButton}`}>
                                        Save to Plans
                                    </button>
                                </span>
                            }
                        </div>
                        {bestImg && <img src={bestImg.url} alt="Concert" className={concertDetailStyle.imageInfo} />}
                    </div>

                    <div className={concertDetailStyle.subContent}>
                        {
                            concert.dates &&
                            <p className={concertDetailStyle.contentLists}>
                                <span className={concertDetailStyle.title}>Start: </span>
                                <span className={concertDetailStyle.content}>
                                    {concert.dates.start.localDate}
                                    {
                                        concert.dates.start.localTime &&
                                        <span>&nbsp;at {concert.dates.start.localTime.substring(0, 5)}</span>
                                    }
                                    &nbsp;(Time zone: {concert.dates.timezone})
                                </span>
                            </p>
                        }
                        <p className={concertDetailStyle.contentLists}>
                            {
                                concert.classifications &&
                                <span>
                                    <span className={concertDetailStyle.title}>Genre: </span>
                                    <span className={concertDetailStyle.content}>{concert.classifications[0].genre.name}</span>
                                </span>
                            }
                            {
                                concert.classifications && concert.classifications[0].subGenre &&
                                <span className={concertDetailStyle.content}>/{concert.classifications[0].subGenre.name}</span>
                            }
                        </p>

                        {
                            concert.priceRanges &&
                            <p className={concertDetailStyle.contentLists}>
                                <span className={concertDetailStyle.title}>Price: </span>
                                <span className={concertDetailStyle.content}>Min: ${concert.priceRanges[0].min} / Max: ${concert.priceRanges[0].max}</span>
                            </p>
                        }

                        {
                            concert.info &&
                            <p className={concertDetailStyle.contentLists}>
                                <span className={concertDetailStyle.title}>Info: </span>
                                <span className={concertDetailStyle.content}>{concert.info}</span>
                            </p>
                        }
                        {
                            concert.pleaseNote &&
                            <p className={concertDetailStyle.contentLists}>
                                <span className={concertDetailStyle.title}>please Note: </span>
                                <span className={concertDetailStyle.content}>{concert.pleaseNote}</span>
                            </p>
                        }
                    </div>
                </div>

            }


            {/* 3 */}
            {
                !isLoading && isError &&
                <p>{errMsg}</p>
            }


            <button onClick={() => { history.goBack() }} className={concertDetailStyle.goBackButton}>back</button>

        </div>
    );
};

export default ConcertDetail;