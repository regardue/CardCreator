let email = document.getElementById("email");
let password = document.getElementById("password");

function login() {
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  //   console.log(storage);
  let user = storage.filter(
    (x) => x.email == email.value && x.password == password.value
  );
  console.log(user);
    if (user.length > 0) {
      // console.log("Login Succesful!");
      alert("Login succesful")
      window.location.href = "HomePage.html";
    }
    else{
      alert("Invalid email or password!")
    }
}
