import FilterStyle from './FilterView.module.css';
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { useRef } from 'react';


const FilterView = (props) => {

    const history = useHistory();
    const path = useLocation().pathname;
    const query = new URLSearchParams(useLocation().search);

    // for date filter
    const startDateRef = useRef();
    const endDateRef = useRef();
    const from = props.selected.date && props.selected.date.from;
    const to = props.selected.date && props.selected.date.to;

    // for genre filter
    // The id of genre will be used when Ticketmaster URL is created.
    const genres = [
        {
            name: 'All',
            id: '0'
        },
        {
            name: 'Rock',
            id: 'KnvZfZ7vAeA'
        },
        {
            name: 'Pop',
            id: 'KnvZfZ7vAev'
        },
        {
            name: 'Dance/Electronic',
            id: 'KnvZfZ7vAvF'
        },
        {
            name: 'R&B',
            id: 'KnvZfZ7vAee'
        },
        {
            name: 'Hip-Hop/Rap',
            id: 'KnvZfZ7vAv1'
        },
        {
            name: 'Country',
            id: 'KnvZfZ7vAv6'
        },
        {
            name: 'Alternative',
            id: 'KnvZfZ7vAvv'
        },
        {
            name: 'Latin',
            id: 'KnvZfZ7vAJ6'
        },
        {
            name: 'Folk',
            id: 'KnvZfZ7vAva'
        },
        {
            name: 'Blues',
            id: 'KnvZfZ7vAvd'
        },
        {
            name: 'Jazz',
            id: 'KnvZfZ7vAvE'
        },
        {
            name: 'Metal',
            id: 'KnvZfZ7vAvt'
        },
        {
            name: 'World',
            id: 'KnvZfZ7vAeF'
        },
        {
            name: 'Chanson Francaise',
            id: 'KnvZfZ7vAvA'
        },
        {
            name: 'Other',
            id: 'KnvZfZ7vAvl'
        }
    ];

    const genreId = props.selected.genre;
    const genreIdx = genreId ? genres.findIndex((genre) => genre.id === genreId) : 0;


    // get current date in the form of 'YYYY-MM-DD'
    function getCurrentDate() {
        const now = new Date();
        const month = (now.getMonth() + 1).toString().length > 1 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
        const date = now.getDate().toString().length > 1 ? now.getDate() : '0' + now.getDate();

        return now.getFullYear() + '-' + month + '-' + date;
    }

    // This function will be executed when 'Search' button is clicked.
    const setFilterDate = () => {

        const from = startDateRef.current.value;
        const to = endDateRef.current.value;

        // when user select a invalid date range
        if (from < getCurrentDate()) {
            alert("From date cannot be earlier than today's date.");

            startDateRef.current.value = "";
            endDateRef.current.value = "";
        }
        else if (!from || !to || from > to) {
            alert('Please select a valid date range.');

            startDateRef.current.value = "";
            endDateRef.current.value = "";
        }
        // when user select a valid date range
        else {
            const date = `${from}T00:00:00,${to}T23:59:59`;

            // set the query parameters
            query.set('localStartDateTime', date);
            query.set('page', 0);

            // URLSearchParams.toString(): returns a query string suitable for use in a URL.
            history.push(path + "?" + query.toString());
        }

    };

    // This function will be executed when '↺' button is clicked.
    const resetFilterDate = () => {
        query.delete('localStartDateTime');
        query.set('page', 0);
        history.push(path + "?" + query.toString());

        startDateRef.current.value = "";
        endDateRef.current.value = "";
    };

    // This function will be executed when one of genres is clicked.
    const setFilterGenre = (genreId) => {

        if (genreId === '0') {
            query.delete('genreId');
            query.set('page', 0);
            history.push(path + "?" + query.toString());
        }
        else {
            query.set('genreId', genreId);
            query.set('page', 0);
            history.push(path + "?" + query.toString());
        }

    };


    return <div>

        <h4 className={FilterStyle.filterTitle}>Filter by date</h4>
        <div className={FilterStyle.date}>
            <span className={FilterStyle.fromToTitle}>From:</span>
            <input type='date' ref={startDateRef} defaultValue={from} /> <br />
            <span className={FilterStyle.fromToTitle}>To:</span>
            <input type='date' ref={endDateRef} defaultValue={to} />
            <button onClick={resetFilterDate} className={`${FilterStyle.dateButton} ${FilterStyle.reset}`}>↺</button>
            <button onClick={setFilterDate} className={`${FilterStyle.dateButton} ${FilterStyle.search}`}>Search</button>
        </div>

        <h4 className={FilterStyle.filterTitle}>Filter by genre</h4>
        <div className={FilterStyle.genre}>
            {
                genres.map((genre, index) => {
                    return <button key={index} onClick={() => setFilterGenre(genre.id)} className={`${FilterStyle.genreItem} ${index === genreIdx && FilterStyle.selectedGenre}`}>{genre.name}</button>
                })
            }
        </div>

    </div>;

};

export default FilterView;