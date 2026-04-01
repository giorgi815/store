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

            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>

          <button class="delete-btn">
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const addBtn = card.querySelector(".btn");
  const deleteBtn = card.querySelector(".delete-btn");

  addBtn.addEventListener("click", () => {
    fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: el.id,
            quantity: 1
          }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Added to cart:", data);
        alert("Product added to cart!");
      })
      .catch(err => console.log(err));
  });


  deleteBtn.addEventListener("click", () => {


    alert("Removed from cart (UI simulation)");

    container.innerHTML = "";
  });


  container.appendChild(card);
}