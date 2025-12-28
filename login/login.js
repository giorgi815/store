const form = document.querySelector("#loginForm")
const password = document.querySelector("#password")
const userName = document.querySelector("#username")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (!userName.value || !password.value) {
    alert("Please fill all fields")
    return
  }

  fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: userName.value.trim(),
      password: password.value.trim()
    })
  })
  .then(async resp => {
    if (!resp.ok) {
      const errorText = await resp.text()
      throw new Error(errorText)
    }
    return resp.json()
  })
  .then(data => {
    localStorage.setItem("token", data.token)
    console.log("Logged in")
    window.location.href = "../index.html"
  })
  .catch(err => {
    console.error(err.message)
    alert(err.message)
  })
})