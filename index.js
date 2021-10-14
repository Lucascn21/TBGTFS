import dotenv from 'dotenv'
dotenv.config()
import {importGtfs, getAgencies, getCalendars, getCalendarDates, getFareAttributes, getFareRules, getFeedInfo, getFrequencies, getRoutes, getShapes, getStoptimes, getStops, getTransfers, getTrips, getPathways} from 'gtfs';
import { subwayCode } from "./methodcreator.js";

const config = {
  agencies: [
    { 
      url: `https://apitransporte.buenosaires.gob.ar/subtes/feed-gtfs?client_id=${process.env.gcba_transport_client_id}&client_secret=${process.env.gcba_transport_client_secret}`,
      exclude: [
        'shapes'
      ]
    }
  ],
  logFunction: function(text) {
    // Do something with the logs here, like save it or send it somewhere
    console.log(text);
  }
};


await importGtfs(config)
.then(() => {
  console.log('Import Successful');
})
.catch(err => {
  console.error(err);
});

/*
const routes2 = await getRoutes(
  {},
  [
    'route_id',
    'route_short_name',
    'route_color'
  ],
  [
    ['route_short_name', 'ASC']
  ]
);
*/

let  subwayCodeResult = await subwayCode;
console.dir("subwayCodeResult "+ subwayCodeResult)
console.dir(subwayCodeResult)
const agencies = await getAgencies()
//console.dir(agencies)
const calendars = await getCalendars()
//console.dir(calendars)
const calendar_dates = await getCalendarDates()
//console.dir(calendar_dates)
const fare_attributes = await getFareAttributes()
//console.dir(fare_attributes)
const fare_rules = await getFareRules()
//console.dir(fare_rules)
const feed_info = await getFeedInfo()
//console.dir(feed_info)
const frequencies = await getFrequencies()
//console.dir(frequencies)
const routes = await getRoutes()
//console.dir(routes)
const shapes = await getShapes()
//console.dir(shapes)
const stop_times = await getStoptimes()
//console.dir(stop_times)
const stops = await getStops()
//console.dir(stops)
const transfers = await getTransfers()
//console.dir(transfers)
const trips = await getTrips()
//console.dir(trips)
const pathways = await getPathways()
//console.dir(pathways)

