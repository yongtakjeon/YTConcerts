import PlanItem from './PlanItem';
import plansStyle from './Plans.module.css';

const Plans = () => {


  
    const concertExample = [
        {
            id: "1Av7Zp8GkS74xAd",
            imageURL: "https://s1.ticketm.net/dam/a/a77/14e94304-ac03-4a49-988f-a0f99e37fa77_1399571_EVENT_DETAIL_PAGE_16_9.jpg",
            concertName: "The Teskey Brothers",
            venue: {
                name: "Orpheum Theatre"
            },
            minPrice: 25,
            maxPrice: 39.5,
            status: "cancelled"
        }
    ]

    return <div>
        <p>Plans</p>
        <p>You're tracking 2 upcoming concerts. </p>
        <PlanItem
                    id={concertExample[0].id}
                    imageURL={concertExample[0].imageURL}
                    concertName={concertExample[0].concertName}
                    artists={""}
                    venue={concertExample[0].venue}
                    minPrice={concertExample[0].minPrice}
                    maxPrice={concertExample[0].maxPrice}
                    status={concertExample[0].status}
                  />
    </div>
};

export default Plans;