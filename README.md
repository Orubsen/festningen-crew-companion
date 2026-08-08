# Festningen Crew Companion

Bygg en mobilvennlig webapp/PWA på norsk (bokmål) kalt "Festningen 2026 – Crew".

Formål: En personlig festivalkompanjong for en vennegjeng (Lisbeth, Dømbe og Røsten) som skal på Festningen-festivalen i Trondheim. Appen skal fungere både som informasjonsside og praktisk sjekkliste før og under festivalen.

Designretning: Mørk, "gammel festning møter rockeplakat"-estetikk — dyp antrasitt/svart bakgrunn, steintekstur-antydninger, høy kontrast, en skarp aksentfarge (f.eks. rustrødt eller elektrisk oransje) for CTA-er og advarsler. Stor, dristig typografi i hero-seksjonen. Mobile-first, bunnmeny/faner for enkel navigering mellom seksjoner: Forside · Program · Vær · Reise · Sjekkliste.

1. Forside (Hero)

Stor tittel "FESTNINGEN 2026" + undertittel med festivaldatoer (4.–5. september 2026, Kristiansten Festning, Trondheim).

Stor, animert nedtellingsklokke (dager : timer : minutter : sekunder) som teller ned mot dørene åpner fredag 4. september 2026 kl. 15:00 (Europe/Oslo-tidssone). Etter dette tidspunktet, bytt til en "Vi er her!"-melding eller vis i stedet nedtelling til hjemreise.

Kort crew-seksjon med tre bildekort (navn: Lisbeth, Dømbe, Røsten) — bruk bildeopplastingsfunksjon/placeholder-avatarer der jeg selv kan laste opp faktiske bilder etterpå, ikke generer syntetiske ansikter.

2. Program/lineup-seksjon

List opp alle 16 bekreftede artistene i en ryddig, filtrerbar liste/kortvisning: DJ Snake, Sigrid, Ari Bajgora, Undergrunn, Tobias Sten, TIX, Erik og Kriss, Soppgirobygget, Synne Vo, Musti, Bausa, Donkeyboy, Søte & Rare, Skinny E, Marcus og Martinus, Zimmermann.

Bygg dette som en enkel, lett-redigerbar datastruktur (f.eks. et JSON-objekt eller array i egen fil) med feltene navn, dag og klokkeslett — men sett dag og klokkeslett til null/"Ikke annonsert ennå" for alle artister nå, siden Festningen ikke har publisert dette per august 2026.

Vis en tydelig informasjonsboks øverst i denne seksjonen: "Fullstendig program med dag og klokkeslett publiseres nærmere festivalstart på festningen.no/program — oppdater artist-filen når det slippes."

Når dag/tid fylles inn senere, skal listen automatisk kunne sorteres/filtreres per dag (Fredag 4/9, Lørdag 5/9).

3. Værseksjon

Live værvarsel for Trondheim (bruk MET Norways gratis Locationforecast-API fra Yr, som ikke krever API-nøkkel — kun en unik User-Agent-header i kallet). Hvis nettleseren blokkerer kallet via CORS, rut det gjennom en enkel serverless-funksjon.

Vis temperatur, nedbørssannsynlighet og vind, med spesiell fremheving av værmeldingen for 4.–5. september når den prognosen blir tilgjengelig (normalt maks 9-10 dager frem).

Oppdater automatisk (f.eks. hver time) frem til festivalstart.

4. Reiseseksjon

Bygg som tre tydelig atskilte reisekort:

Utreise (alle tre), fredag 4. september, avgang 09:35 — Rute SK4154, SAS Link, Embraer 195.

Lisbeths hjemreise, søndag 6. september, avgang 08:50 — Rute WF1302, Widerøe, De Havilland DHC-8 400.

Dømbe og Røstens hjemreise, mandag 7. september — vis begge aktuelle alternativer tydelig merket som "ikke endelig bestemt ennå": Rute WF681 kl. 17:10 ELLER Rute WF1312 kl. 18:35, begge Widerøe DHC-8 400.

5. Sjekkliste-seksjon

To store, iøynefallende varselbannere (rød/oransje, umulig å overse) som IKKE kan forsvinne av seg selv:

"🏨 Hotell er IKKE bestilt ennå" — med lenke til f.eks. booking.com/Trondheim-søk.

"🎟️ Festivalpass er IKKE kjøpt ennå" — med lenke til Tikkio-billettsiden.

Hvert banner skal ha en avhukingsboks/knapp jeg selv kan trykke på når det er ordnet, som lagrer status i localStorage slik at banneret bytter til en rolig grønn "Ordnet ✅"-status.

6. Footer

Lenker til festningen.no og Tikkio-billettsiden.

Teknisk: Ren frontend er nok (React/Vite, slik Lovable normalt bygger), ingen tung backend nødvendig — bruk localStorage til sjekkliste-status og en enkel datafil for artist-programmet som er triviell å redigere manuelt senere.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://festningen-crew-companion.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/98b4c7aa-90b4-4efd-bf6a-8e15eef2a769).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
