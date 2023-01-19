import moment from "moment";
import 'moment/locale/it' 
moment.locale('it')


export const CITIES = [
  "Rome",
  "London",
  "Paris",
  "Amsterdam",
  "Newyork",
  "Miami",
] as const;

export type ICity = typeof CITIES[number];


export const TODAY = moment();

export const LABELS = {

};

