let submit = document.querySelector("#submit");
submit.addEventListener("click", Confirm);

function Confirm() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let loginsInfo = new Logins(email.value, password.value);

  if (areInputsField()) {
    if (!validateLength(password)) {
      return true;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      return true;
    }
    let personInfo = [];
    personInfo = JSON.parse(localStorage.getItem("storage"));
    if (!personInfo) {
      personInfo = [];
    }
    personInfo.push(loginsInfo);
    localStorage.setItem("storage", JSON.stringify(personInfo));
    window.location.href = "LoginPage.html";
  }
}

function Logins(email, password) {
  this.email = email;
  this.password = password;
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

function validateLength(input) {
  let password = input.value;
  if (password.length >= 5) {
    input.style.border = "1px solid green";
    return true;
  }
  input.style.border = "1px solid red";
  return false;
}
