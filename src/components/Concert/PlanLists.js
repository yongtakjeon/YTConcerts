import planListStyle from "./PlanLists.module.css";
import { useContext, useEffect, useState } from 'react';
import { CONCERT_DETAIL, createTicketmasterURL, createYTConcertsURL, PLAN_DELETE, PLAN_LIST } from '../../api/api';
import { AuthContext } from '../../store/auth-context';
import PlanItem from './PlanItem';


const PlanLists = () => {

    const authCtx = useContext(AuthContext);
    const [concertIds, setConcertIds] = useState([]);
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    let concertDate = "";
    let dateChanged = false;

    // sleep for a specified number of milliseconds
    const sleep = (milliseconds) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds)
        })
    };

    // fetch the plan lists data
    const getPlans = () => {
        setIsLoading(true);

        // 1. get concert IDs (using YTConcerts server API)
        fetch(createYTConcertsURL(PLAN_LIST, { userId: authCtx.userId }))
            .then((response) => {
                return response.json();
            })
            .then(async (plans) => {

                let concertIds = [];

                plans.forEach(plan => {
                    concertIds.push(plan.concertId);
                });

                // console.log(concertIds);


                // 2. get concerts' details (using Ticketmaster API)
                let response;
                let data;
                let concerts = [];
                let failedConcertIds = [];

                for (let i = 0; i < concertIds.length; i++) {

                    try {
                        response = await fetch(createTicketmasterURL(CONCERT_DETAIL, { concertId: concertIds[i] }));

                        data = await response.json();

                        concerts.push(data);
                    }
                    catch (err) {
                        // if there is an error fetching concert data using certain concertID, delete the plan from YTConcerts server
                        response = await fetch(createYTConcertsURL(PLAN_DELETE, { userId: authCtx.userId, concertId: concertIds[i] }),
                            { method: 'DELETE' });

                        data = await response.json();

                        failedConcertIds.push(concertIds[i]);

                        console.log(err);
                    }

                    // ※ Ticketmaster API keys are issued with rate limitation of 5 requests per second.
                    await sleep(210);
                }

                // subtract 'failedConcertIds' from 'concertIds'
                if (failedConcertIds.length > 0) {
                    for (let i = 0; i < failedConcertIds.length; i++) {
                        concertIds = concertIds.filter(id => id !== failedConcertIds[i]);
                    }
                }

                // sort the plans by date
                concerts.sort(function (a, b) {
                    return new Date(a.dates.start.localDate) - new Date(b.dates.start.localDate);
                });

                setConcertIds(concertIds);
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

    // This function will be sent to each of PlanItem component,
    // and in the PlanItem component, if 'DELETE' button is clicked, this function will be executed receiving 'concertId' from PlanItem.
    function deletePlan(concertId) {
        fetch(createYTConcertsURL(PLAN_DELETE, { userId: authCtx.userId, concertId }),
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


    return <div className={planListStyle.content}>
        <p className={planListStyle.title}>Plans</p>

        {/* === 1 - when it is still loading === */}
        {
            isLoading &&
            <p className={planListStyle.loading}>
                Plan lists are loading...👾
                <p style={{ fontSize: '0.75em' }}>It could take a few seconds to load the plan lists.</p>
            </p>
        }


        {/* === 2 - when the loading is finished, and there is no error, and plans.length is greater than 0 === */}
        {
            !isLoading && !isError && plans.length > 0 &&
            <div>
                <p className={planListStyle.planNotice}>You're tracking <span className={planListStyle.planNumber}>{concertIds.length}</span> concerts. </p>
                <div className={planListStyle.concerts}>
                    {
                        plans.map((plan, index) => {

                            dateChanged = false;

                            if (concertDate !== plan.dates.start.localDate) {
                                dateChanged = true;
                                concertDate = plan.dates.start.localDate;
                            }

                            return <div key={index}>
                                {dateChanged && <p className={planListStyle.date}>{plan.dates.start.localDate.replaceAll('-', '/')}</p>}
                                <PlanItem
                                    key={index}
                                    id={plan.id}
                                    imageURL={plan.images && plan.images[0].url}
                                    concertName={plan.name}
                                    artists={plan._embedded && plan._embedded.attractions ? plan._embedded.attractions : ""}
                                    venue={plan._embedded && plan._embedded.venues[0]}
                                    minPrice={plan.priceRanges && plan.priceRanges[0].min}
                                    maxPrice={plan.priceRanges && plan.priceRanges[0].max}
                                    status={plan.dates.status && plan.dates.status.code}
                                    concertURL={plan.url && plan.url}
                                    onDelete={deletePlan}
                                />
                            </div>
                        })
                    }
                </div>
            </div>
        }


        {/* === 3 - when the loading is finished, and there is no error, but plans.length is equal to 0 === */}
        {
            !isLoading && !isError && plans.length === 0 &&
            <p className={planListStyle.empty}>There is no plan at the moment.🤔</p>
        }


        {/* === 4 - when loading is finished, but there is an error === */}
        {
            !isLoading && isError &&
            <p className={planListStyle.error}>{errMsg}</p>
        }

    </div >
};

export default PlanLists;