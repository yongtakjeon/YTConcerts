import concertListStyle from "./ConcertLists.module.css";
import ConcertItem from "./ConcertItem";
import Pagination from "../UI/Pagination";
import FilterView from "../UI/FilterView";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CONCERT_LIST, createTicketmasterURL } from "../../api/api";


const ConcertLists = () => {

  const [concerts, setConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [pageInfo, setPageInfo] = useState({});

  const query = new URLSearchParams(useLocation().search);
  let city = query.get("city");
  let pageNum = query.get("page");
  let filterDate = query.get("localStartDateTime");
  let filterGenre = query.get("genreId");

  let concertDate = "";
  let dateChanged = false;


  function concertsDataHandler() {

    setIsLoading(true);

    fetch(createTicketmasterURL(CONCERT_LIST, { pageNum, city, filterDate, filterGenre }))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setPageInfo(data.page);

        if (data._embedded) {
          setConcerts(data._embedded.events);
        }
        else {
          setConcerts([]);
        }

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
  }, [city, pageNum, filterDate, filterGenre]);


  return (

    <div className={concertListStyle.content}>
      <p className={concertListStyle['section-title']}>
        Upcoming Concerts of <span className={concertListStyle.city}>{city ? city : "Canada"}</span>
      </p>

      {/* === 1 === */}
      {
        isLoading && <p className={concertListStyle.loading}>Concerts lists are loading...👾</p>
      }


      {/* === 2 === */}
      {
        !isLoading && !isError && concerts.length > 0 &&
        <div className={concertListStyle['concert-list']}>
          <div className={concertListStyle.FilterView} >
            <FilterView
              selected={{
                genre: filterGenre && filterGenre,
                date: filterDate &&
                {
                  from: filterDate.substring(0, 10),
                  to: filterDate.split(',')[1].substring(0, 10)
                }
              }}
            />
          </div>

          <div className={concertListStyle.pagination}>
            <Pagination size={pageInfo.size} totalElements={pageInfo.totalElements} pageNum={parseInt(pageNum)} />
          </div>

          <div className={concertListStyle.concerts}>
            {
              concerts.map((concert, index) => {

                dateChanged = false;

                if (concertDate !== concert.dates.start.localDate) {
                  dateChanged = true;
                  concertDate = concert.dates.start.localDate;
                }

                return <div key={index}>
                  {dateChanged && <p className={concertListStyle.date}>{concert.dates.start.localDate.replaceAll('-', '/')}</p>}
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
                </div>;
              })
            }
          </div>

          <div className={concertListStyle.pagination}>
            <Pagination size={pageInfo.size} totalElements={pageInfo.totalElements} pageNum={parseInt(pageNum)} />
          </div>
        </div>
      }


      {/* === 3 === */}
      {
        !isLoading && !isError && concerts.length === 0 &&
        <div>
          <FilterView
            selected={{
              genre: filterGenre && filterGenre,
              date: filterDate &&
              {
                from: filterDate.substring(0, 10),
                to: filterDate.split(',')[1].substring(0, 10)
              }
            }} />
          <p className={concertListStyle.empty}>There is no upcoming concerts!😲</p>
        </div>
      }


      {/* === 4 === */}
      {
        !isLoading && isError &&
        <p className={concertListStyle.error}>{errMsg}</p>
      }

    </div>

  );
};

export default ConcertLists;