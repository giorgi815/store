const container = document.querySelector(".container");
const register = document.querySelector(".register");
const logOut = document.querySelector(".logout");
const search = document.querySelector("#search");

let allProducts = [];

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    renderProducts(allProducts);
  })
  .catch(err => console.log(err));


function renderProducts(prod) {
  container.innerHTML = "";

  prod.forEach(el => {
    const card = document.createElement("div");

    card.innerHTML = `
      <div class="card">
        <div class="badge">HOT SALE</div>

        <div class="img">
          <img src="${el.thumbnail}" alt="${el.title}">
        </div>

        <div class="info">
          <div class="cat">${el.category}</div>

          <h2 class="title">${el.title}</h2>

          <p class="desc">
            ${el.description.slice(0, 100)}...
          </p>

          <div class="feats">
            <span class="feat">Rating: ${el.rating}</span>
            <span class="feat">Stock: ${el.stock}</span>
            <span class="feat">Price: $${el.price}</span>
          </div>

          <div class="bottom">
            <button class="btn" data-id="${el.id}">
              <span>View product</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const button = card.querySelector(".btn");

    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      window.location.href = `/singleproducts/singleprod.html?id=${id}`;
    });

    container.appendChild(card);
  });
}


search.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(value) ||
    product.category.toLowerCase().includes(value) ||
    product.description.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});


if (localStorage.getItem("token")) {
  register.classList.add("hidden");
  logOut.classList.add("log");
}

logOut.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});