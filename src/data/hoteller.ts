export type Hotell = {
  navn: string;
  /** Domene brukt til logo-oppslag */
  domene: string;
  beskrivelse: string;
  lenke: string;
};

/** Alle lenker er forhåndsutfylt med 4.–7. september 2026 */
export const HOTELLER: Hotell[] = [
  {
    navn: "Radisson Blu Royal Garden",
    domene: "radissonhotels.com",
    beskrivelse: "Ved Nidelva, kort vei til sentrum og festningen.",
    lenke:
      "https://www.radissonhotels.com/no-no/booking/room-display?hotelCode=NOTRDGDN&checkInDate=2026-09-04&checkOutDate=2026-09-07&adults%5B%5D=2&children%5B%5D=0&aoc%5B%5D=&searchType=lowest&promotionCode=&voucher=&brands=&brandFirst=&so=&usePoints=false",
  },
  {
    navn: "Thon Hotels",
    domene: "thonhotels.no",
    beskrivelse: "Flere hoteller i Trondheim sentrum.",
    lenke:
      "https://www.thonhotels.no/hoteller/sok/?SearchPageId=1379&EntryPoint=Search&CheckInDate=2026-09-04&CheckOutDate=2026-09-07&Rooms=1,0,0,0&IsPointsSearch=False&SetDefaultDates=False",
  },
  {
    navn: "Best Western Trondheim",
    domene: "bestwestern.no",
    beskrivelse: "Rimeligere alternativ i sentrum.",
    lenke:
      "https://www.bestwestern.no/hoteller/norge/trondheim?startDate=2026-09-04&endDate=2026-09-07&room%5B0%5D=1",
  },
  {
    navn: "Strawberry (Nordic Choice)",
    domene: "strawberry.no",
    beskrivelse: "Comfort, Quality og Clarion sortert etter avstand.",
    lenke: "https://www.strawberry.no/hotell/norge/trondheim/?sort=distance",
  },
  {
    navn: "SynXis-booking",
    domene: "synxis.com",
    beskrivelse: "Direktebooking, 2 voksne, 1 rom.",
    lenke:
      "https://be.synxis.com/?adult=2&arrive=2026-09-04&chain=24447&child=0&currency=NOK&depart=2026-09-07&hotel=6742&level=hotel&locale=nb-NO&productcurrency=NOK&rooms=1&src=30",
  },
  {
    navn: "Clarion Collection Hotel Grand Olav",
    domene: "hoteltrondheim.net",
    beskrivelse: "Midt i sentrum, inkludert kveldsbuffet.",
    lenke:
      "https://clarioncollectionolav.hoteltrondheim.net/no/?from=2026-09-04&to=2026-09-07&adults=2&children=0&clirder=1&_1786195610176#rooms",
  },
  {
    navn: "Bjørvika Apartments",
    domene: "bjorvika-apartments.no",
    beskrivelse: "Leiligheter — kjøkken og plass til tre.",
    lenke:
      "https://bjorvika-apartments.no/no/apartments?search_locations=trondheim&_sfm_apartment_price=0+5000&_sfm_apartment_bedrooms=0+5&_sfm_apartment_beds=0+8&date_range=2026-09-04+to+2026-09-07&search_guests=2",
  },
  {
    navn: "Visbook-booking",
    domene: "visbook.com",
    beskrivelse: "Lokal booking, 4.–7. september.",
    lenke: "https://reservations.visbook.com/369/search?lang=no&checkIn=2026-09-04&checkOut=2026-09-07",
  },
  {
    navn: "Scandic Hotels",
    domene: "scandichotels.com",
    beskrivelse: "Flere Scandic-hoteller i Trondheim.",
    lenke:
      "https://www.scandichotels.com/no/hotelreservation/select-hotel?room%5B0%5D.adults=2&fromdate=2026-09-04&todate=2026-09-07&city=TRONDHEIM",
  },
];
