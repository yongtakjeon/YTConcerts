import planItemStyle from './PlanItem.module.css';
import { Link } from "react-router-dom"
import ConcertItem from './ConcertItem';

const PlanItem = (props) => {

    const deletePlan = () => {
        props.onDelete(props.id);
    };


    return (

        <div className={planItemStyle['plan-item']}>

            <ConcertItem
                id={props.id}
                imageURL={props.imageURL}
                concertName={props.concertName}
                artists={props.artists && props.artists}
                venue={props.venue}
                minPrice={props.minPrice && props.minPrice}
                maxPrice={props.maxPrice && props.maxPrice}
                status={props.status}
            />

            <div className={planItemStyle['plan-options']}>
                <Link to={{ pathname: props.concertURL }} target="_blank">
                    <button>BUY TICKETS</button>
                </Link>
                <button onClick={deletePlan}>DELETE</button>
            </div>

        </div>
    );
};

export default PlanItem;