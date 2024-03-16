function Logout() {
  window.location.href = "LoginPage.html";
}

let popupShift = document.getElementById("popupShift");
let addShift = document.getElementById("addShift");
let closeShift = document.getElementById("closeShift");
let sendButton = document.getElementById("sendButton");
let viewShift = document.getElementById("viewShift");
let clear = document.getElementById("clear");

addShift.onclick = function () {
  popupShift.style.display = "block";
};
closeShift.onclick = function () {
  popupShift.style.display = "none";
};
sendButton.onclick = function () {
  let locatie = document.getElementById("locatieInput");
  let numarOreLucrate = document.getElementById("numarOreLucrateInput");
  let shiftSavedData = new Shift(locatie.value, numarOreLucrate.value);
  let confirmation = window.confirm(
    "Are you sure you want to save your shift?"
  );
  if (confirmation) {
    if (!validateHour(numarOreLucrate)) {
      return true;
    }
    shiftString = [];
    shiftString = localStorage.getItem("ShiftStorage");
    if (!shiftString) {
      shiftString = [];
    } else {
      shiftString = JSON.parse(shiftString);
    }
    shiftString.push(shiftSavedData);
    localStorage.setItem("ShiftStorage", JSON.stringify(shiftString));
  }
  popupShift.style.display = "none";
};

function Shift(locatie, numarOreLucrate) {
  this.locatie = locatie;
  this.numarOreLucrate = numarOreLucrate;
}

function validateHour() {
  let shiftLength = document.getElementById("numarOreLucrateInput").value;
  if (shiftLength <= 24 && !isNaN(shiftLength)) {
    return true;
  }
  alert("ziua are 24 de ore");
  return false;
}

clear.onclick = function () {
  localStorage.removeItem("ShiftStorage");
};

function showUserShifts(sorted=false) {
  let shifts
  if(sorted==false){
    shifts = JSON.parse(localStorage.getItem("ShiftStorage"));
    
  }
  else{
    shifts = sorted;
  }
 
  if (shifts && shifts.length > 0) {
    let container = document.getElementById("viewShiftText");
    container.innerHTML = "";

    shifts.forEach(function (shift, index) {
      let table = document.createElement("table");
      // let header = table.createTHead();
      let row = table.insertRow();
      let keys = Object.keys(shift);
      keys.forEach(function (key) {
        let cell = row.insertCell();
        cell.textContent = shift[key];
      });

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", function () {
        deleteShift(index);
      });
      row.appendChild(deleteButton);

      container.appendChild(table);
      if (index < shifts.length - 1) {
        container.appendChild(document.createElement("hr"));
      }
    });
  } else {
    alert("No user shifts found in local storage.");
  }
}
document.getElementById("viewShift").addEventListener("click", function () {
  showUserShifts();
});

function deleteShift(index) {
  let shifts = JSON.parse(localStorage.getItem("ShiftStorage"));
  if (shifts && shifts.length > 0) {
    shifts.splice(index, 1);
    localStorage.setItem("ShiftStorage", JSON.stringify(shifts));
    showUserShifts();
  }
}

document.getElementById("sortAscending").addEventListener("click",sortShiftAscending);
document.getElementById("sortDescending").addEventListener("click",sortShiftDescending);

function sortShiftAscending(){
  let shifts = JSON.parse(localStorage.getItem("ShiftStorage"));
  shifts.sort((a,b) => a.numarOreLucrate-b.numarOreLucrate);
  showUserShifts(shifts)
}
function sortShiftDescending(){
  let shifts = JSON.parse(localStorage.getItem("ShiftStorage"));
  shifts.sort((a,b) => b.numarOreLucrate-a.numarOreLucrate);
  showUserShifts(shifts)
}
