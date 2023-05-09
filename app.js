
// THIS WAS MY ORIGINAL IDEA TO GET TOUR DATES 
// const axios = require('axios');

// const API_KEY = 'Bixjubx0mJuHUHBYrRWBzmoo4FFnkU4k';
// const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json' // this is to get a list of events

// axios.get(API_URL, {
//   params: {
//     apikey: API_KEY,
//     keyword: 'excision'
//   },
// })
//   .then(res => {
//     const events = res.data._embedded.events;
//     // console.log(events);
//     console.log('---------------------');
//     // console.log(events._embedded);
//     // iterate through events and store names, dates, url to purchase tickets
//     const event = {};
    
//     // we are storing ids, so when we lookup the events postal code, we can determine where we are using a third-party library like 'zipcode'
//     for (let i = 0; i < events.length; i++) {
//       let currEvent = [];
//       let name = events[i].name;
//       let dateStart = events[i].dates.start.localDate;
//       let url = events[i].url;
//       currEvent.push(name, dateStart, url);
//       event[i] = currEvent;

//       // getting the state
//       //   const postalCode = events[i]._embedded.venues
//       const city = events[i]._embedded.venues[0].city;
//       const state = events[i]._embedded.venues[0].state;
//       currEvent.push(city, state);
//     } 
//     console.log(event);
//   })
//   .catch(err => {
//     console.log(err);
//   });