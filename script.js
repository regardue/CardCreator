let submit = document.querySelector("#submit");
submit.addEventListener("click", Save);

function Save() {
  let name = document.getElementById("nameInput");
  let number = document.getElementById("numberInput");
  let month = document.getElementById("monthInput");
  let year = document.getElementById("yearInput");
  let cvc = document.getElementById("cvcInput");

  let cardData = new Card(
    name.value,
    number.value,
    month.value,
    year.value,
    cvc.value
  );
  if (areInputsField()) {
    if (!validateName(name)) {
      return true;
    }
    if (!validateCardNumber(number)) {
      return true;
    }
    if (!validateMonth(month)){
        return true;
    }
    if (!validateYear(year)){
        return true;
    }
    if (!validateCvc(cvc)){
        return true;
    }
    let personInfo = [];
    personInfo = JSON.parse(localStorage.getItem("cardInfo"));
    if (!personInfo) {
      personInfo = [];
    }
    personInfo.push(cardData);
    localStorage.setItem("cardInfo", JSON.stringify(personInfo));
    clearInputs();
  } else {
    alert("Please fill in all the boxes!");
  }
}

function Card(name, number, month, year, cvc) {
  this.name = name;
  this.number = number;
  this.month = month;
  this.year = year;
  this.cvc = cvc;
}

function clearInputs() {
  let inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function areInputsField() {
  let inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      return false;
    }
  }
  return true;
}

function validateName(input) {
  let name = input.value;
  if (name.length >= 3 && isNaN(name)) {
    input.style.border = "1px solid green";
    document.getElementById("correctName").innerText=name;
    return true;
  }
  input.style.border = "1px solid red";
  return false;
}

function validateCardNumber(input) {
  let number = input.value;
  if (number.length == 16 && !isNaN(number)) {
    input.style.border = "1px solid green";
    document.getElementById("correctNumber").innerText=number;
    return true;
  }
  input.style.border = "1px solid red";
  return false;
}

function validateMonth(input) {
  let month = input.value;
  if (month.length <= 2 && !isNaN(month)) {
    input.style.border = "1px solid green";
    document.getElementById("correctMonth").innerText=month;
    return true;
  }
  input.style.border = "1px solid red";
  return false;
}

function validateYear(input) {
  let year = input.value;
  if (year.length == 4 && !isNaN(year) && year > 2023) {
    input.style.border = "1px solid green";
    document.getElementById("correctYear").innerText=year;
    return true;
  }
  input.style.border = "1px solid red";
  return false;
}

function validateCvc(input) {
    let cvc = input.value;
    if (cvc.length == 3 && !isNaN(cvc)) {
      input.style.border = "1px solid green";
      document.getElementById("correctCvc").innerText=cvc;
      return true;
    }
    input.style.border = "1px solid red";
    return false;
}