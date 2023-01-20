import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBolt, faCloudSunRain, faRainbow, faSnowflake, faSun, faUmbrella } from "@fortawesome/free-solid-svg-icons";
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

export const WEATHER_ICONS: IconDefinition[] = [
  faSun,
  faCloudSunRain,
  faRainbow,
  faUmbrella,
  faSnowflake,
  faBolt,
  faCloudSunRain,
];

export type ICity = typeof CITIES[number];

export const TODAY = moment();

export const ANIMATION_INTERVAL = 2000;

export const LABELS = {
  APP_TITLE: "What's the weather like in...",
  TABS: ["today", "3days"],
  FORM: {
    SELECT_PLACEHOLDER: "Pick a city",
    BUTTON: "Find out!",
    ERROR: "Error",
  }
};



