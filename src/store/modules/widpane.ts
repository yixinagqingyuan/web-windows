import * as history from './history.json';
import * as news from './news.json';

import axios from 'axios';

var hisTemp = (history as any).default;
var date = new Date(),
  event = hisTemp[Math.floor(Math.random() * hisTemp.length)];
console.log(event)
date.setFullYear(event.year);


var newsList = [];
for (var i = 0; i < news.articles.length; i++) {
  var item = {
    ...news.articles[i]
  };
  item.title = item.title.split("-").reverse().splice(1).reverse().join("-").trim();
  newsList.push(item);
}

var abbr = ["sn", "sl", "h", "t", "hr", "lr", "s", "hc", "lc", "c"],
  wstates = ["Snow", "Sleet", "Hail", "Thunderstorm", "Heavy Rain", "Light Rain", "Showers", "Heavy Cloud", "Light Cloud", "Clear"];

var rem: any = null;

const getRandom = (x = 10, rm = 0) => {
  if (rem != null) {
    var tmp = rem;
    rem = null;
    return tmp;
  } else if (rm) {
    rem = Math.floor(Math.random() * x);
    return rem;
  }

  return Math.floor(Math.random() * x);
}

const defState = {
  data: {
    weather: {
      city: 'New Delhi',
      country: 'India',
      wstate: wstates[getRandom(10, 1)],
      icon: abbr[getRandom()],
      temp: 30 + getRandom(20),
      rain: 10 + getRandom(80),
      wind: 4 + getRandom(5),
      days: [0, 1, 2, 4].map(i => {
        return {
          day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
            (new Date().getDay() + i) % 7
          ],
          icon: abbr[getRandom(10)],
          min: 30 + getRandom(10),
          max: 40 + getRandom(10)
        }
      })
    },
    stock: [
      [
        Number(parseFloat(String(2300 + Math.random() * 200)).toFixed(2)).toLocaleString(),
        parseFloat(String(Math.random() * 2)).toFixed(2),
        Math.round(Math.random())
      ],
      [
        Number(parseFloat(String(600 + Math.random() * 200)).toFixed(2)).toLocaleString(),
        parseFloat(String(Math.random() * 2)).toFixed(2),
        Math.round(Math.random())
      ],
    ],
    date: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }),
    event: event,
    news: newsList
  },
  hide: true,
  updated: false
};

export default {
  state: () => defState,
  mutations: {
    WIDGTOGG: (state: any) => {
      state.hide = !state.hide
    },
  },
  getters: {
    widget: (state: any) => state
  }
}