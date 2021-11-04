import itemStyle from './ConcertItem.module.css';
import { Link } from "react-router-dom";

const ConcertItem = (props) => {

    const id = props.id;
    const imageURL = props.imageURL;
    const concertName = props.concertName;
    const artists = props.artists;
    const venue = props.venue;
    const minPrice = props.minPrice;
    const maxPrice = props.maxPrice;
    const status = props.status;


    return (

        <div className={itemStyle['concert-item']}>

            <div className={itemStyle.imageInfo} >
                <img src={imageURL} className={itemStyle.image} alt="concert" />
            </div>

            <div className={itemStyle.concertMainInfo}>
                <Link to={`concert/${id}`} className={itemStyle.concertName}>{concertName}</Link>

                {
                    artists.length > 0 &&
                    <div className={itemStyle.artists}>
                        {
                            artists.map((artist, index) => {
                                return (
                                    <span key={index}>
                                        <Link to={{ pathname: artist.url }} target="_blank" className={itemStyle.artist}>{artist.name}</Link>
                                        {index !== artists.length - 1 && <span className={itemStyle.comma}>, </span>}
                                    </span>

                                );
                            })
                        }
                    </div>
                }
                <Link to={{ pathname: venue.url }} target="_blank" className={itemStyle.venue}>{venue.name}</Link>
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