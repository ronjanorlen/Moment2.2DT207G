"use strict";

/* Variabler */
const url = "https://moment-2-dt207g.onrender.com/api/workexperience"; // API

/* När sidan laddas, kör init-funktion */
window.onload = init();

/* Hämta webbtjänst */
async function init() {
    try {
        const response = await fetch(url);
        let jobData = await response.json();

        // TA BORT SEN
        console.table(jobData);

        // Ta med data till ny funktion
        displayJobs(jobData);

    } catch (e) {
        console.log(e);
        document.getElementById('error').innerHTML = "<p>Något gick fel vid hämtning av jobb</p>";
    }
}

/* Visa jobb som lagts till */
function displayJobs(jobData) {
    const jobEl = document.getElementById('allJobs');

    // Skapa ul-element
    const ul = document.createElement('ul');

    // Skapa nytt li-element för varje jobb
    jobData.forEach((job) => {
        const listItem = document.createElement('li');
        listItem.textContent = job.companyname;

        // Lägg till li-element till ul
        ul.appendChild(listItem);
    
    });

    // Lägg till i div
    jobEl.appendChild(ul);
}



