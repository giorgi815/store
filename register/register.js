const userName = document.querySelector("#username");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const form = document.querySelector("#registerform");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!userName.value || !lastName.value || !email.value || !password.value) {
    alert("Please fill all fields");
    return;
  }

  fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: userName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      username: userName.value.trim(),
      password: password.value.trim()
    })
  })
    .then(async resp => {
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message || "Registration failed");
      }
      return resp.json();
    })
    .then(data => {
      console.log("Registered user:", data);

      alert("Registration successful!");

      window.location.href = "/login/login.html";
    })
    .catch(err => {
      console.error(err.message);
      alert(err.message);
    });
});