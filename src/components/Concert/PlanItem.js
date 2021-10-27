import planItemStyle from './PlanItem.module.css';
import { Link } from "react-router-dom"

const PlanItem = (props) => {

    // COPY START
    const id = props.id;
    const imageURL = props.imageURL;
    const concertName = props.concertName;
    const artists = props.artists;
    let artistsForPrint = [];
    const venue = props.venue;
    const minPrice = props.minPrice;
    const maxPrice = props.maxPrice;
    const status = props.status;
    const concertURL = props.concertURL;

    if (artists) {
        for (let i = 0; i < artists.length; i++) {

            i !== artists.length - 1 ?
                artistsForPrint.push({ name: artists[i].name + "‚\xa0", id: artists[i].id })
                :
                artistsForPrint.push({ name: artists[i].name, id: artists[i].id })
        }
    }
    // END

    const deletePlan = () => {

    };


    return (

        <div className={planItemStyle['plan-item']}>




            {/* Copied From 'ConcertItem' */}
            {/* ===== START ===== */}
            <div className={planItemStyle['concert-item']}>

                <div className={planItemStyle.imageInfo} >
                    <img src={imageURL} className={planItemStyle.image} alt="concert" />
                </div>

                <div className={planItemStyle.concertMainInfo}>
                    <Link to={`concert/${id}`} className={planItemStyle.concertName}>{concertName}</Link>
                    {artistsForPrint.length > 0 &&
                        <div className={planItemStyle.artists}>
                            {
                                artistsForPrint.map((artist, index) => {
                                    return <Link to={`/artist/${artist.id}`} key={index} className={planItemStyle.artist}>{artist.name}</Link>;
                                })

                            }
                        </div>
                    }
                    <Link to={`/venue/${venue.id}`} className={planItemStyle.venue}>{venue.name}</Link>
                </div>

                <div className={planItemStyle.concertSubInfo}>
                    <div>
                        {status === "cancelled" && <span className={planItemStyle.cancelled}>{status}</span>}
                        {/* {status == "rescheduled" && <span className={planItemStyle.rescheduled}>{status}</span>} */}
                    </div>
                    <div className={planItemStyle.price}>
                        {minPrice > 0 && <p>{`Min: $${minPrice}`}</p>}
                        {maxPrice > 0 && <p>{`Max: $${maxPrice}`}</p>}
                    </div>
                </div>

            </div>
            {/* ===== END ===== */}







            <div className={planItemStyle['plan-options']}>
            <Link to={{ pathname: concertURL }} target="_blank">
                <button>
                    BUY TICKETS
                </button>
                </Link>
                <button onClick={deletePlan}>DELETE</button>
            </div>



        </div>
    );


};

export default PlanItem;