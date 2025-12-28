

async function fetchAuth() {
  try {
    
    const loginRes = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "kminchelle",
        password: "0lelplR"
      })
    });

    const loginData = await loginRes.json();
    const accessToken = loginData.accessToken;

    
    const currentRes = await fetch("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const currentUser = await currentRes.json();

    
    const refreshRes = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    const refreshed = await refreshRes.json();

    console.log("Login:", loginData);
    console.log("Current User:", currentUser);
    console.log("Refreshed Token:", refreshed);

  } catch (error) {
    console.error(error);
  }
}
