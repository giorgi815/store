const userName = document.querySelector("#username")
const lastName = document.querySelector("#lastname")
const email = document.querySelector("#email")
const password = document.querySelector("#password")

const form = document.querySelector("#registerform")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (!userName.value || !lastName.value || !email.value || !password.value) {
    alert("Please fill all fields");
    return;
  }

  fetch("https://fakestoreapi.com/users", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usEmail: email.value,
      username: userName.value,
      usPassword: password.value,
      name: {
        firstname: userName.value,
        lastname: lastName.value
      }
    })
  })
  .then(resp => resp.json())
  .then(data => {
    console.log("Registered user", data)
    window.location.href = "/login/login.html"
  })
  .catch(err => console.error(err));
})
