'use strict'

// Function to append row with data of the random person in the table   
function addInfo(person){
   const table = document.getElementById("table");
   table.classList.add("display-table");
   const dataRow = `<tr> <td>${person.name.first}  ${person.name.last}</td> <td>${person.phone}</td> <td>${person.email}</td> </tr>`;
   const data = document.getElementById("data");
   data.innerHTML += dataRow;
}

/* asynchronous function that is using "then()" method and displays 
the first/last name, phone number and email of the random person*/
function randomUser(event){
   event.preventDefault();
   const targetId = event.target.getAttribute("id");
   const url = targetId === 'callBrowser' ? "https://randomuser.me/api/" : "/random-person"
   return fetch(url)
   .then(response => response.json())
   .then(data => addInfo(data.results[0]))
   .catch(error => console.error(error)); 
}



// Event listener for the buttons 
document.addEventListener("DOMContentLoaded", () => {
   const callBrowser = document.getElementById("callBrowser");
      callBrowser.addEventListener('click', randomUser);
   
   const callServer = document.getElementById("callServer");
      callServer.addEventListener('click', randomUser);
});
