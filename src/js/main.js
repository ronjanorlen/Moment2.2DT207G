"use strict";

/* Variabler */
const url = "https://moment-2-dt207g.onrender.com/api/workexperience"; // API

init();

/* Hämta webbtjänst */
async function init() {
    try {
        const response = await fetch(url);
        let jobData = await response.json();

        // Hämta URL för aktuell sida 
        const currentPageUrl = window.location.href;

        // Kontroll om aktuell sida är startsida 
        if (currentPageUrl.includes("index.html")) {
            // Om ja - kör displayJobs-funktionen
            displayJobs(jobData);
        }

    } catch (e) {
        console.log(e);
        document.getElementById('error').innerHTML = "<p>Något gick fel vid hämtning av jobb</p>";
    }
}


/* Visa jobb som lagts till */
function displayJobs(jobData) {
    const jobEl = document.getElementById('allJobs');

    // Kontrollera om jobEl är null
    if (!jobEl) {
        console.error("Hittar inte id 'allJobs'.");
        return;
    }

    // Loopa igenom jobbdata och skapa div för varje jobb
    jobData.forEach(job => {
        // Skapa div med id 
        const jobContainer = document.createElement('div');
        jobContainer.id = `jobContainer${job.id}`;


        // Skapa h3 för företagsnamn och lägg till i jobb-container
        const jobHeader = document.createElement('h3');
        jobHeader.textContent = job.companyname;
        jobContainer.appendChild(jobHeader);

        // Skapa ul-element och lägg till i jobb-container
        const ul = document.createElement('ul');

        // Skapa li-element och lägg till i ul
        const listItemTitle = document.createElement('li');
        listItemTitle.textContent = "Jobbtitel: " + job.jobtitle;
        ul.appendChild(listItemTitle);

        const listItemLocation = document.createElement('li');
        listItemLocation.textContent = "Plats: " + job.location;
        ul.appendChild(listItemLocation);

        const listItemStartDate = document.createElement('li');
        listItemStartDate.textContent = "Startdatum: " + job.startdate;
        ul.appendChild(listItemStartDate);

        const listItemEndDate = document.createElement('li');
        listItemEndDate.textContent = "Slutdatum: " + job.enddate;
        ul.appendChild(listItemEndDate);

        const listItemDescription = document.createElement('li');
        listItemDescription.textContent = "Beskrivning: " + job.description;
        ul.appendChild(listItemDescription);

        // Lägg till ul i jobb-container
        jobContainer.appendChild(ul);

        // Skapa en knapp för att ta bort jobbet
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Ta bort';
        deleteButton.addEventListener('click', () => confirmDelete(job.id)); // Anropa deleteJobs när knapp klickas på
        jobContainer.appendChild(deleteButton);

        // Lägg till jobb-container i allJobs
        jobEl.appendChild(jobContainer);
    });
}

/* För att lägga till nya jobb */
// Hämta formulär
const addJobForm = document.getElementById('addJobForm');

// Kontrollera att formuläret finns
if (addJobForm) {
    // Om formulär finns, kör addNewJob-funktionen
    addJobForm.addEventListener('submit', addNewJob);
}
// Funktion för att lägga till nytt jobb
async function addNewJob(e) {
    e.preventDefault();

    // Hämta inputvärden från formuläret
    const companynameInput = document.getElementById('companyname');
    const jobtitleInput = document.getElementById('jobtitle');
    const locationInput = document.getElementById('location');
    const startdateInput = document.getElementById('startdate');
    const enddateInput = document.getElementById('enddate');
    const descriptionInput = document.getElementById('description');

    // Kontroll av inmatning i formuläret
    if (!companynameInput.value.trim()) {
        alert("Fyll i företagets namn");
        return;
    }

    if (!jobtitleInput.value.trim()) {
        alert("Fyll i titel");
        return;
    }

    if (!locationInput.value.trim()) {
        alert("Fyll i ort");
        return;
    }

    if (!startdateInput.value.trim()) {
        alert("Fyll i startdatum");
        return;
    }

    if (!enddateInput.value.trim()) {
        alert("Fyll i slutdatum");
        return;
    }

    if (!descriptionInput.value.trim()) {
        alert("Fyll i beskrivning");
        return;
    }

    // Gör ett objekt med info från formulär
    const myJob = {
        companyname: companynameInput.value.trim(),
        jobtitle: jobtitleInput.value.trim(),
        location: locationInput.value.trim(),
        startdate: startdateInput.value.trim(),
        enddate: enddateInput.value.trim(),
        description: descriptionInput.value.trim()
    }

    // Ta med objekt till api och databas
    try {
        const response = await fetch((url), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myJob)
        });

        // Kontroll om lyckat
        if (response.ok) {
            const updatedResponse = await fetch(url);
            const updatedJobs = await updatedResponse.json();

            // Skriv ut den uppdaterade listan
            displayJobs(updatedJobs);

            // Skicka besökaren till startsidan igen
            window.location.href = "index.html";


        } else {
            alert("Något gick fel när nytt jobb lades till");
        }

    } catch (error) {
        alert("Något gick fel vid inmatning");
        console.error("Något gick fel: ", error);
    }
}

// Funktion för att bekräfta borttagning av jobb
function confirmDelete(jobId) {
    const confirmation = confirm("Vill du ta bort detta jobb?");

    if (confirmation) {
        deleteJob(jobId);
    }
}

/* Ta bort data från webbtjänst */
async function deleteJob(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        const responseData = await response.json();
        console.log(responseData); 
        
        if (response.ok) {
            // Ta bort jobb med specifikt id
            const jobToRemove = document.getElementById(`jobContainer${id}`);
            if (jobToRemove) {
                jobToRemove.remove();
            } else {
                console.error(`Jobb med ID ${id} hittades inte.`);
            }
        } else {
            console.error('Något gick fel när jobbet skulle tas bort från webbtjänsten.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

