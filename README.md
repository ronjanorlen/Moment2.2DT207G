## Moment 2.2 - DT207G
### Introduktion till webbtjänster - Skapa ett CV
Detta repository innehåller källkoden för en webbapplikation som konsumerar den webbtjänst som 
skapades i del 1 av denna uppgift.  
Webbplatsen läser in och visar data från API:et med möjlighet att även lägga till och ta bort data.  
Datan lagras i en Postgre-databas som uppdateras vid ändringar och webbplatsen använder Fetch API
med GET, POST och DELETE för att hämta, visa och radera datan.  

På startsidan visas arbetserfarenheter som har lagts till och besökaren kan välja att ta bort ett jobb om de vill. Innan ett jobb tas bort 
får användaren en pop up-ruta som ber denne att bekräfta att de verkligen vill ta bort posten. Om användaren klickar OK tas jobbet bort 
och klickar de på Avbryt så avbryts förfrågan och jobbet ligger kvar i listan. 

På Lägg till-sidan finns en formulär för att lägga till nya arbetserfarenheter där en kontroll görs vid varje input 
så att alla fält fylls i. Om något fält är missat får användaren en notifiering om detta.
När allting är ifyllt och submit-knappen har klickats på skickas besökaren tillbaka till startsidan och kan se det nya jobbet i listan. 

Applikationen använder Parcel för en automatiserad utvecklingsmiljö och har publicerats till Netlify.

Av: Ronja Norlén, rono2300, 2024
