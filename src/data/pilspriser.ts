export type Pilssted = {
  navn: string;
  /** Pris per halvliter i kroner */
  pris: number;
  /** Har happy hour */
  happyHour: boolean;
  /** Prisen er usikker/ikke bekreftet */
  usikker: boolean;
};

/** Kilde: pilsguiden.no/liste/trondelag/trondheim (hentet august 2026) */
export const PILS_KILDE = "https://www.pilsguiden.no/liste/trondelag/trondheim";
export const MEDIANPRIS_TRONDHEIM = 120;
export const MEDIANPRIS_TRONDELAG = 125;

export const pilssteder: Pilssted[] = [
  {
    "navn": "Hammerhead BC. Taproom & Juicy Burger",
    "pris": 61,
    "happyHour": true,
    "usikker": true
  },
  {
    "navn": "Bifrons Trondheim",
    "pris": 61,
    "happyHour": true,
    "usikker": true
  },
  {
    "navn": "Los Tacos Trondheim",
    "pris": 74,
    "happyHour": true,
    "usikker": true
  },
  {
    "navn": "Bar Circus Trondheim",
    "pris": 75,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Studentersamfundet i Trondhjem",
    "pris": 75,
    "happyHour": true,
    "usikker": false
  },
  {
    "navn": "Digg Nordre Gate - Trondheim",
    "pris": 81,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Digg Pizza - Sirkus",
    "pris": 81,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Super Hero Pizza",
    "pris": 86,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Super Hero Burger",
    "pris": 86,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Heidi's Bier Bar Trondheim",
    "pris": 86,
    "happyHour": true,
    "usikker": true
  },
  {
    "navn": "Super Hero Burger Torget",
    "pris": 86,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Verkstedhallen & Lobbyen",
    "pris": 93,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Fru Lundgreen",
    "pris": 98,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Hamo Bar Trondheim",
    "pris": 99,
    "happyHour": true,
    "usikker": true
  },
  {
    "navn": "Aust 63˚nord Trondheim",
    "pris": 99,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Ramp Pub & Spiseri",
    "pris": 104,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Sing Sing Karaoke Trondheim",
    "pris": 105,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Rosendal Kafé Trondheim",
    "pris": 106,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Antikvariatet Musikkafe og Bokbar",
    "pris": 109,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Havet Trondheim",
    "pris": 109,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Xu‘s Nan Jing Hus",
    "pris": 109,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Ciabatta Trondheim",
    "pris": 110,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Ila Brainnstasjon",
    "pris": 115,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Restaurant Milano Nardo",
    "pris": 119,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Den gode nabo Trondheim",
    "pris": 119,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Work-Work Trondheim",
    "pris": 119,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Bobbys Bar",
    "pris": 120,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "P-Hotels Brattøra",
    "pris": 120,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Daniel på hjørnet",
    "pris": 120,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Lager11 Street Food & Scene",
    "pris": 124,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Lille Skansen Trondheim",
    "pris": 125,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Flipper Kafe",
    "pris": 129,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Olavstorget",
    "pris": 129,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Pincho Nation Trondheim",
    "pris": 129,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Broen Bar & Restaurant",
    "pris": 131,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Lan Na Restaurant",
    "pris": 131,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Ladekaia",
    "pris": 132,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Raus Bar Trondheim",
    "pris": 132,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "E.C. Dahls Pub og Kjøkken",
    "pris": 135,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Olivia Solsiden",
    "pris": 136,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Brooklyn Diner and Sportsbar Trondheim",
    "pris": 136,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Leos Pizzeria",
    "pris": 136,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Kafe Skuret Trondheim",
    "pris": 136,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "San Sebastian Torget",
    "pris": 136,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Blomster og Vin",
    "pris": 136,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Ladejarlen",
    "pris": 136,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Radisson Blu Royal Garden Hotel",
    "pris": 139,
    "happyHour": false,
    "usikker": false
  },
  {
    "navn": "Egon City Syd",
    "pris": 140,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Egon Solsiden",
    "pris": 140,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Egon Restaurant Tyholttårnet",
    "pris": 140,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Egon Lade",
    "pris": 140,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Egon Prinsen",
    "pris": 140,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Egon Søndre",
    "pris": 140,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Scandic Lerkendal",
    "pris": 140,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Lille London",
    "pris": 140,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Tollbua Trondheim",
    "pris": 149,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Scandic Nidelven",
    "pris": 149,
    "happyHour": false,
    "usikker": true
  },
  {
    "navn": "Clarion Hotel & Congress Trondheim",
    "pris": 150,
    "happyHour": false,
    "usikker": true
  }
];
