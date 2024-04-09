"use strict";

/* Variabler */
const url = "https://moment-2-dt207g.onrender.com/"; // API

/* När sidan laddas, kör init-funktion */
window.onload = init();

/* Hämta webbtjänst */
async function init() {
    try {
        const response = await fetch(url);
        let data = await response.json();

        // TA BORT SEN
        console.table(data);

        // Ta med data till ny funktion
       // displayJobs(data);

    } catch (e) {
        console.log(e);
        document.getElementById('error').innerHTML = "<p>Något gick fel vid hämtning av jobb</p>";
    }
}



