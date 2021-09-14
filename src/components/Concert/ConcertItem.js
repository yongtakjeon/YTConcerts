import itemStyle from './ConcertItem.module.css';
import { Link } from "react-router-dom"

const ConcertItem = (props) => {

    const id = props.id;
    const imageURL = props.imageURL;
    const concertName = props.concertName;
    const artists = props.artists;
    const venue = props.venue;
    const minPrice = props.minPrice;
    const maxPrice = props.maxPrice;

    return (
        <div className={itemStyle['concert-item']}>
            <img src={imageURL} className={itemStyle.image} />
            <Link to={`concert/${id}`} className={itemStyle.concertName}>{concertName}</Link>
            {/* <p className={itemStyle.artist}>{artist}</p> */}
            {
                artists.length > 0 &&
                artists.map((artist, index) => {
                    return <p key={index} className={itemStyle.artist}>{artist.name}</p>;
                })
            }
            <p className={itemStyle.venue}>{venue}</p>
            {minPrice && <p>{`$${minPrice}`}</p>}
            {maxPrice && <p>{`$${maxPrice}`}</p>}
        </div>
    );

};

export default ConcertItem;