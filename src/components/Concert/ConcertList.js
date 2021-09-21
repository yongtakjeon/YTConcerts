import concertListStyle from "./ConcertList.module.css"
import ConcertItem from "./ConcertItem";
import Pagination from "../UI/Pagination";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";




const ConcertList = () => {

  const [concerts, setConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [pageInfo, setPageInfo] = useState({});

  let concertDate = "";
  let dateChanged = false;

  const query = new URLSearchParams(useLocation().search);
  let city = query.get("city");
  let pageNum = query.get("page");


  function creatingAPIurl() {

    if (city) {
      return `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${city}&sort=date,name,asc&&page=${pageNum}&apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`;
    }
    else {
      return `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=CA&sort=date,name,asc&page=${pageNum}&apikey=mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J`;
    }


  }

  function concertsDataHandler() {

    setIsLoading(true);

    fetch(creatingAPIurl())
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPageInfo(data.page);
        setConcerts(data._embedded.events);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrMsg(`There is an error fetching data!😓 (${err})`);
        setIsLoading(false);
        setIsError(true);
      });

  };

  useEffect(() => {
    concertsDataHandler();
  }, [city, pageNum]);





  return (

    <div className={concertListStyle.content}>
      <p className={concertListStyle['section-title']}>
        Upcoming Concerts of <span className={concertListStyle.city}>{city ? city : "Canada"}</span>
      </p>

      {
        isLoading && <p className={concertListStyle.loading}>Concerts list is loading...👾</p>
      }

      {
        !isLoading && !isError && concerts.length > 0 &&
        <div className={concertListStyle['concert-list']}>
          <Pagination size={pageInfo.size} totalElements={pageInfo.totalElements} city={city} pageNum={parseInt(pageNum)}/>
          
          {
            concerts.map((concert, index) => {

              dateChanged = false;

              if (concertDate != concert.dates.start.localDate) {
                concertDate = concert.dates.start.localDate;
                dateChanged = true;
              }

              return dateChanged ?
                <div key={index}>
                  <p className={concertListStyle.date}>{concert.dates.start.localDate.replaceAll('-', '/')}</p>
                  <ConcertItem
                    id={concert.id}
                    imageURL={concert.images[0].url}
                    concertName={concert.name}
                    artists={concert._embedded.attractions ? concert._embedded.attractions : ""}
                    venue={concert._embedded.venues[0]}
                    minPrice={concert.priceRanges && concert.priceRanges[0].min}
                    maxPrice={concert.priceRanges && concert.priceRanges[0].max}
                    status={concert.dates.status.code}
                  />
                </div>
                :
                <ConcertItem
                  key={index}
                  id={concert.id}
                  imageURL={concert.images[0].url}
                  concertName={concert.name}
                  artists={concert._embedded.attractions ? concert._embedded.attractions : ""}
                  venue={concert._embedded.venues[0]}
                  minPrice={concert.priceRanges && concert.priceRanges[0].min}
                  maxPrice={concert.priceRanges && concert.priceRanges[0].max}
                  status={concert.dates.status.code}
                />;
            })
          }

          <Pagination size={pageInfo.size} totalElements={pageInfo.totalElements} city={city} pageNum={parseInt(pageNum)}/>
        </div>
      }

      {
        !isLoading && !isError && concerts.length === 0 &&
        <p className={concertListStyle.error}>There is no upcoming concerts!😲</p>
      }

      {
        !isLoading && isError &&
        <p className={concertListStyle.error}>{errMsg}</p>
      }



    </div>





  );
};

export default ConcertList;