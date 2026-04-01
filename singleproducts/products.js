const container = document.querySelector(".container");

const params = new URLSearchParams(window.location.search);
const prodId = params.get("id");

let currentProduct = null;

fetch(`https://dummyjson.com/products/${prodId}`)
  .then(res => res.json())
  .then(data => {
    currentProduct = data;
    renderSingleProd(data);
  })
  .catch(err => console.log(err));


function renderSingleProd(el) {
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

        <p class="desc">${el.description}</p>

        <div class="feats">
          <span class="feat">Rating: ${el.rating}</span>
          <span class="feat">Stock: ${el.stock}</span>
          <span class="feat">Price: $${el.price}</span>
        </div>

        <div class="bottom">
          <button class="btn">
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const button = card.querySelector(".btn");

  button.addEventListener("click", () => {
    addToCart(el.id);
  });

  container.appendChild(card);
}


function addToCart(productId) {
  fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: productId,
          quantity: 1
        }
      ]
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Cart created:", data);

      window.location.href = `/cart/cart.html?id=${data.id}`;
    })
    .catch(err => console.log(err));
}