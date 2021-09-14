import concertListStyle from "./ConcertList.module.css"
import ConcertItem from "./ConcertItem";
import { useEffect, useState } from "react";



const ConcertList = (props) => {

  const [concerts, setConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  let concertDate = "";
  let dateChanged = false;

  function creatingAPIurl() {
    if (props.location == "Canada") {
      return 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=CA&sort=date,name,asc&apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J';
    }
    else {
      return `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${props.location}&sort=date,name,asc&apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`;
    }
  }

  function concertsDataHandler() {

    setIsLoading(true);

    fetch(creatingAPIurl())
      .then((response) => {
        // console.log(creatingAPIurl());
        return response.json();
      })
      .then((data) => {
        console.log(data._embedded.events);
        setConcerts(data._embedded.events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(`There is an error fetching data! (${err})`);
        setIsLoading(false);
      });

  };

  useEffect(() => {
    concertsDataHandler();
  }, []);



  return (

    <div className={concertListStyle.content}>
      <p className={concertListStyle['section-title']}>Upcoming Concerts of <span className={concertListStyle.location}>{props.location}</span></p>
      {
        isLoading && <p>Loading...</p>
      }

      {
        !isLoading && concerts.length > 0 &&
        concerts.map((concert, index) => {

          dateChanged = false;

          if (concertDate != concert.dates.start.localDate) {
            concertDate = concert.dates.start.localDate;
            dateChanged = true;
          }

          return dateChanged ?
            <div key={index}>
              <p className={concertListStyle.date}>{concert.dates.start.localDate}</p>
              <ConcertItem
                id={concert.id}
                imageURL={concert.images[0].url}
                concertName={concert.name}
                artists={concert._embedded.attractions ? concert._embedded.attractions : ""}
                venue={concert._embedded.venues[0].name}
                minPrice={concert.priceRanges && concert.priceRanges[0].min}
                maxPrice={concert.priceRanges && concert.priceRanges[0].max}
              />
            </div>
            :
            <ConcertItem
              key={index}
              id={concert.id}
              imageURL={concert.images[0].url}
              concertName={concert.name}
              artists={concert._embedded.attractions ? concert._embedded.attractions : ""}
              venue={concert._embedded.venues[0].name}
              minPrice={concert.priceRanges && concert.priceRanges[0].min}
              maxPrice={concert.priceRanges && concert.priceRanges[0].max}
            />;
          {/*// <p>{concert.name}</p>
            // <p>{concert._embedded.attractions ?
            //   concert._embedded.attractions[0].name : "no artist info"}
            // </p>
            // <p>{concert._embedded.venues[0].name}</p>
            // <p>{concert.priceRanges ?
            //   `Min: $${concert.priceRanges[0].min}, Max: $${concert.priceRanges[0].max}` : "no price info"}
            // </p>

            /* <p>{concert.dates.start.localDate} {concert.dates.start.localTime} {concert.dates.timezone}</p> */}


        })
      }

      {
        !isLoading && concerts.length === 0 &&
        <p>{errMsg}</p>
      }

    </div>




  );
};

export default ConcertList;