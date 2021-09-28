import itemStyle from './ConcertItem.module.css';
import { Link } from "react-router-dom"

const ConcertItem = (props) => {

    const id = props.id;
    const imageURL = props.imageURL;
    const concertName = props.concertName;
    const artists = props.artists;
    let artistsForPrint = [];
    const venue = props.venue;
    const minPrice = props.minPrice;
    const maxPrice = props.maxPrice;
    const status = props.status;

    if (artists) {
        for (let i = 0; i < artists.length; i++) {

            i !== artists.length - 1 ?
                artistsForPrint.push({ name: artists[i].name + "‚\xa0", id: artists[i].id })
                :
                artistsForPrint.push({ name: artists[i].name, id: artists[i].id })
        }
    }

    return (

        <div className={itemStyle['concert-item']}>

            <div className={itemStyle.imageInfo} >
                <img src={imageURL} className={itemStyle.image} alt="concert"/>
            </div>

            <div className={itemStyle.concertMainInfo}>
                <Link to={`concert/${id}`} className={itemStyle.concertName}>{concertName}</Link>
                {artistsForPrint.length > 0 &&
                    <div className={itemStyle.artists}>
                        {
                            artistsForPrint.map((artist, index) => {
                                return <Link to={`/artist/${artist.id}`} key={index} className={itemStyle.artist}>{artist.name}</Link>;
                            })

                        }
                    </div>
                }
                <Link to={`/venue/${venue.id}`} className={itemStyle.venue}>{venue.name}</Link>
            </div>

            <div className={itemStyle.concertSubInfo}>
                <div>
                    {status === "cancelled" && <span className={itemStyle.cancelled}>{status}</span>}
                    {/* {status == "rescheduled" && <span className={itemStyle.rescheduled}>{status}</span>} */}
                </div>
                <div className={itemStyle.price}>
                    {minPrice > 0 && <p>{`Min: $${minPrice}`}</p>}
                    {maxPrice > 0 && <p>{`Max: $${maxPrice}`}</p>}
                </div>
            </div>

        </div>

    );

};

export default ConcertItem;