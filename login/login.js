const form = document.querySelector("#loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  console.log({ username, password });

  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  console.log("API RESPONSE:", data);

  if (!res.ok) {
    alert(data.message || "Invalid credentials");
    return;
  }

  localStorage.setItem("token", data.token);
  window.location.href = "../index.html";
});