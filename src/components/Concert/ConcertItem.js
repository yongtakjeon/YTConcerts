import itemStyle from './ConcertItem.module.css';

const ConcertItem = (props) => {

    const posterURL = props.posterURL;
    const concertName = props.name;
    const artist = props.artist;
    const location = props.location;

    return (
        <div className={itemStyle['concert-item']}>
            <img src={posterURL} className={itemStyle.poster}/>
            <p className={itemStyle.name}>{concertName}</p>
            <p className={itemStyle.artist}>{artist}</p>
            <p className={itemStyle.location}>{location}</p>
        </div>
    );

};

export default ConcertItem;