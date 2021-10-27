import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import PlanItem from './PlanItem';
import plansStyle from './Plans.module.css';




const Plans = () => {

    const authCtx = useContext(AuthContext);
    const [concertIds, setConcertIds] = useState([]);
    const [plans, setPlans] = useState([]);


    const getPlans = () => {

        // 1. get userId (using Firebase API)
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTPHN12nrc4XXAV_nxW4F97LKiRK-LZ14', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: authCtx.token
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                const userId = data.users[0].localId;
                console.log(userId);



                // 2. get concert IDs (using YTConcerts server API)
                fetch(`http://localhost:8080/api/users/${userId}/plans`)
                    .then((response) => {
                        return response.json()
                    })
                    .then(async (data) => {

                        const concertIds = [];

                        data.forEach(plan => {
                            concertIds.push(plan.concertId);
                        });

                        setConcertIds(concertIds);

                        console.log(concertIds);



                        

                        // 3. get concerts' details (using Ticketmaster API)


                        let concerts = [];
                        let result;
                        let result2;

                        // concertIds.forEach(async concertId => {
                        //     result = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${concertId}?apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`);

                        //     result2 = await result.json();

                        //     concerts.push(result2);

                        // });



                        for (let i = 0; i < concertIds.length; i++) {

                            result = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${concertIds[i]}?apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`);

                            result2 = await result.json();

                            concerts.push(result2);

                        }

                        console.log(concerts);
                        setPlans(concerts);


                    })
                    .catch((err) => {
                        console.log(err);
                    });

            });


    };



    useEffect(() => {
        getPlans();
    }, []);


    return <div>
        <p>Plans</p>
        <p>You're tracking {concertIds.length} upcoming concerts. </p>
        {
            plans.length > 0 &&
            plans.map((plan, index) => {
                return <PlanItem
                            key={index}
                            id={plan.id}
                            imageURL={plan.images[0].url}
                            concertName={plan.name}
                            artists={""}
                            venue={plan._embedded.venues[0]}
                            minPrice={plan.priceRanges && plan.priceRanges[0].min}
                            maxPrice={plan.priceRanges && plan.priceRanges[0].max}
                            status={plan.dates.status.code}
                            concertURL={plan.url}
                />
            })
        }
    </div>
};

export default Plans;