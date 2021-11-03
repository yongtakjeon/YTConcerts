import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import PlanItem from './PlanItem';
import plansStyle from './PlanLists.module.css';


const PlanLists = () => {

    const authCtx = useContext(AuthContext);
    const [concertIds, setConcertIds] = useState([]);
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    let concertDate = "";
    let dateChanged = false;


    const sleep = (milliseconds) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds)
        })
    };

    const getPlans = () => {
        setIsLoading(true);

        // 1. get concert IDs (using YTConcerts server API)
        fetch(`https://ytconcerts-server.herokuapp.com/api/users/${authCtx.userId}/plans`)
            .then((response) => {
                return response.json();
            })
            .then(async (plans) => {

                const concertIds = [];

                plans.forEach(plan => {
                    concertIds.push(plan.concertId);
                });

                setConcertIds(concertIds);


                // 2. get concerts' details (using Ticketmaster API)
                let response;
                let data;
                let concerts = [];

                for (let i = 0; i < concertIds.length; i++) {

                    response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${concertIds[i]}?apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`);

                    data = await response.json();

                    concerts.push(data);

                    // ※ Ticketmaster API keys are issued with rate limitation of 5 requests per second.
                    await sleep(210);
                }


                // sort the plans by date
                concerts.sort(function (a, b) {
                    return new Date(a.dates.start.localDate) - new Date(b.dates.start.localDate);
                });

                setPlans(concerts);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setErrMsg(`There is an error fetching the plans!😓 (${err})`);
                setIsLoading(false);
                setIsError(true);
            });
    };

    const deletePlan = (concertId) => {
        fetch(`https://ytconcerts-server.herokuapp.com/api/users/${authCtx.userId}/plans/${concertId}`,
            {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                setConcertIds(concertIds.filter(id => id !== concertId));
                setPlans(plans.filter(plan => plan.id !== concertId));
            })
            .catch(err => {
                console.log(err);
            });
    };


    useEffect(() => {
        getPlans();
    }, []);


    return <div>

        {/* === 1 === */}
        {
            isLoading && <p>Loading...</p>
        }


        {/* === 2 === */}
        {
            !isLoading && !isError && plans.length > 0 &&
            <div>
                <p>Plans</p>
                <p>You're tracking {concertIds.length} upcoming concerts. </p>
                {
                    plans.map((plan, index) => {

                        dateChanged = false;

                        if (concertDate !== plan.dates.start.localDate) {
                            dateChanged = true;
                            concertDate = plan.dates.start.localDate;
                        }

                        return <div key={index}>
                            {dateChanged && <p className={plansStyle.date}>{plan.dates.start.localDate.replaceAll('-', '/')}</p>}
                            <PlanItem
                                key={index}
                                id={plan.id}
                                imageURL={plan.images[0].url}
                                concertName={plan.name}
                                artists={plan._embedded.attractions ? plan._embedded.attractions : ""}
                                venue={plan._embedded.venues[0]}
                                minPrice={plan.priceRanges && plan.priceRanges[0].min}
                                maxPrice={plan.priceRanges && plan.priceRanges[0].max}
                                status={plan.dates.status.code}
                                concertURL={plan.url}
                                onDelete={deletePlan}
                            />
                        </div>
                    })
                }
            </div>
        }


        {/* === 3 === */}
        {
            !isLoading && !isError && plans.length === 0 &&
            <div>
                <p>There is no plans at this time.</p>
            </div>
        }


        {/* === 4 === */}
        {
            !isLoading && isError &&
            <p>{errMsg}</p>
        }

    </div>
};

export default PlanLists;