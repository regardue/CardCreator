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

viewShift.onclick = function () {
  let shiftItems = JSON.parse(localStorage.getItem("ShiftStorage"));
  (document.getElementById("viewShiftText").value = shiftItems[0].locatie),numarOreLucrate;
};
clear.onclick = function () {
  localStorage.removeItem("ShiftStorage");
};
