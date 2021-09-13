import listStyle from "./ConcertList.module.css"
import ConcertItem from "./ConcertItem";



const DUMMY_DATA = [
    {
        "id":11129128,
        "type":"Concert",
        "uri":"http://www.songkick.com/concerts/11129128-wild-flag-at-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
        "displayName":"Wild Flag at The Fillmore (April 18, 2012)",
        "start": {
          "time":"20:00:00",
          "date":"2012-04-18",
          "datetime":"2012-04-18T20:00:00-0800"
        },
        "performance": [
          {
            "artist":{
              "uri":"http://www.songkick.com/artists/29835-wild-flag?utm_source=PARTNER_ID&utm_medium=partner",
              "displayName":"Wild Flag",
              "id":29835,
              "identifier":[]
            },
            "id":21579303,
            "displayName":"Wild Flag",
            "billingIndex":1,
            "billing":"headline"
          }
        ],
        "location": {
          "city":"San Francisco, CA, US",
          "lng":-122.4332937,
          "lat":37.7842398
        },
        "venue": {
          "id":6239,
          "displayName":"The Fillmore",
          "uri":"http://www.songkick.com/venues/6239-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
          "lng":-122.4332937,
          "lat":37.7842398,
          "metroArea": {
            "uri":"http://www.songkick.com/metro-areas/26330-us-sf-bay-area?utm_source=PARTNER_ID&utm_medium=partner",
            "displayName":"SF Bay Area",
            "country": { "displayName":"US" },
            "id":26330,
            "state": { "displayName":"CA" }
          }
        },
        "status":"ok",
        "popularity":0.012763
      }
];

const DUMMY_IMG = [
  "https://render.fineartamerica.com/images/rendered/default/poster/8/10/break/images/artworkimages/medium/1/famous-janis-joplin-concert-posters-pd.jpg",
  "https://www.liveauctioneers.com/news/wp-content/uploads/2018/03/doors-REG.jpg",
  "https://dyn1.heritagestatic.com/lf?set=path%5B2%2F1%2F5%2F0%2F6%2F21506325%5D&call=url%5Bfile%3Aproduct.chain%5D",
  "https://cdn4.vectorstock.com/i/1000x1000/78/73/vintage-concert-posters-vector-1987873.jpg",
  "https://www.washingtonian.com/wp-content/uploads/2020/10/13.-Foo-Fighters-Troubadour.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6619f8106207401.5f8a8b1d6bdc0.jpg",
  "https://i.pinimg.com/236x/a8/57/74/a85774d6ca2dfd500fc3e74d860a21f6--toronto-rock-event-posters.jpg",
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/concert-poster-design-template-bb8a458084aec92f6a8ae1874d159dfd_screen.jpg?ts=1566602221",
  "https://static.displate.com/280x392/displate/2021-03-16/782001751ffb2d2f239e92ff18623ceb_00cf104753f0400705eacbcd02cc0076.jpg",
  "https://render.fineartamerica.com/images/rendered/default/canvas-print/10.5/14/mirror/break/images/artworkimages/medium/2/rolling-stones-steven-parker-canvas-print.jpg",
  "https://penji.co/wp-content/uploads/2019/08/blink-182-concert-posters.jpg",
  "https://static.displate.com/280x392/displate/2021-01-08/3dbaf31d4c543ec52d63aeb85c445868_e55b71be25716d3546b463660eba079c.jpg",
  "http://www.limitedruns.com/media/cache/47/a5/47a5cc446aed9d62965351f13ee915c2.jpg",
  "https://www.designyourway.net/blog/wp-content/uploads/2017/09/f07af862f68ff40ec8581058a6e.jpg",
  "https://www.blogto.com/upload/2015/10/20151030-green-day.jpg",
  "https://render.fineartamerica.com/images/rendered/default/acrylic-print/20/20/metalposts/break/images/artworkimages/medium/2/hand-in-rock-n-roll-sign-vector-premiumvector.jpg",
  "https://m.media-amazon.com/images/I/81b7mx0v1nL._AC_UL320_.jpg",
  "https://i.pinimg.com/236x/e5/c6/cf/e5c6cf266bdad97a7960f1bbef2253bc--music-flow-schoolboy-q.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfrKRY2d8zFcnsOz6MTkMf6R0xWaZ4VgTGA&usqp=CAU",
  "http://www.limitedruns.com/media/cache/7c/85/7c85f8bd1dfe9ca81379eccc9e59a283.jpg"
];

const ConcertList = () => {

    return (
        <div className = {listStyle['concert-list']}>
        {
            DUMMY_IMG.map((poster, index) => {
                return <ConcertItem
                        key = {index}
                        posterURL = {poster}
                        name = {DUMMY_DATA[0].displayName}
                        artist = {DUMMY_DATA[0].performance[0].artist.displayName}
                        location = {DUMMY_DATA[0].venue.displayName}/>
            })
        }
        </div>
    );
};

export default ConcertList;