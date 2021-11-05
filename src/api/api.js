// Firebase Auth APIs
const API_GOOGLE_KEY = "AIzaSyDTPHN12nrc4XXAV_nxW4F97LKiRK-LZ14";
export const API_LOGIN =
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_GOOGLE_KEY}`;
export const API_SIGNUP =
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_GOOGLE_KEY}`;
export const API_UPDATE_NICKNAME =
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_GOOGLE_KEY}`;


// Ticketmaster APIs
const API_TICKETMASTER_KEY = 'mXh7AoIGa0ug4nVAgOBHl7hfj3BHTu7J';
export const CONCERT_LIST = 'CONCERT_LIST';
export const CONCERT_DETAIL = 'CONCERT_DETAIL';
export const createTicketmasterURL = (api, data) => {
    let url = '';

    switch (api) {

        case CONCERT_LIST:
            url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_TICKETMASTER_KEY}&classificationName=music&sort=date,name,asc&page=${data.pageNum}${data.city ? `&city=${data.city}` : '&countryCode=CA'}${data.filterDate ? `&localStartDateTime=${data.filterDate}` : ''}${data.filterGenre ? `&genreId=${data.filterGenre}` : ''}`;
            break;

        case CONCERT_DETAIL:
            url = `https://app.ticketmaster.com/discovery/v2/events/${data.concertId}?apikey=${API_TICKETMASTER_KEY}`;
            break;
    }

    return url;
};


// YT Concerts Server APIs
export const PLAN_LIST = 'PLAN_LIST';
export const PLAN_ADD = 'PLAN_ADD';
export const PLAN_DELETE = 'PLAN_DELETE';
export const createYTConcertsURL = (api, data) => {
    let url = '';

    switch (api) {
        case PLAN_LIST:
            url = `https://ytconcerts-server.herokuapp.com/api/users/${data.userId}/plans`;
            break;
        case PLAN_ADD:
            url = `https://ytconcerts-server.herokuapp.com/api/users/${data.userId}/plans`;
            break;
        case PLAN_DELETE:
            url = `https://ytconcerts-server.herokuapp.com/api/users/${data.userId}/plans/${data.concertId}`;
            break;
    }

    return url;
};


// commonly used API header
export const API_HEADER = {
    'Content-Type': 'application/json'
};