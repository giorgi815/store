const container = document.querySelector(".container")
const addProduct = document.querySelector(".add")
const register = document.querySelector(".register")
const logOut = document.querySelector(".logout")
const search = document.querySelector("#search")

let allProducts = []

fetch("https://fakestoreapi.com/products")
.then(resp => resp.json())
.then(data => {
  allProducts = data
  renderProducts(allProducts)
})

function renderProducts(prod){
  container.innerHTML= ''

  prod.forEach(el => {
    const card = document.createElement('div')

    card.innerHTML = `
      <div class="card">
  <div class="badge">HOT SALE</div>
  <div class="tilt">
    <div class="img">
      <img src="${el.image}" alt="${el.title}">
    </div>
  </div>
  <div class="info">
    <div class="cat">${el.category || "Category"}</div>
    <h2 class="title">${el.title}</h2>
    <p class="desc">${el.description ? el.description.slice(0, 100) + "..." : "No description available."}</p>
    <div class="feats">
      <span class="feat">Rating: ${el.rating.rate}</span>
      <span class="feat">Stock: ${el.rating.count}</span>
      <span class="feat">Price: ${el.price}$</span>
    </div>
    <div class="bottom">
      <button class="btn" data-id="${el.id}">
        <span>View product</span>
        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
      </button>
    </div>
  </div>
</div>

    `

    const button = card.querySelector(".btn");
    button.addEventListener("click", () => {
      const prodId = button.getAttribute("data-id")
      fetch(`https://fakestoreapi.com/products/${prodId}`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      window.location.href = `/singleproducts/singleprod.html?id=${prodId}`
    })
    })

    container.appendChild(card)

  });

}



fetch("https://fakestoreapi.com/products", {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify()
})
.then(resp => resp.json())
.then(data => {
  console.log(data)
})

if(localStorage.getItem('token')){
  register.classList.add("hidden")
  logOut.classList.add("log")
}

logOut.addEventListener("click", () => {
  localStorage.removeItem("token")
  window.location.reload()
})


search.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase()

  const filterProducts = allProducts.filter(products =>
    products.title.toLowerCase().includes(value) ||
    products.category.toLowerCase().includes(value) ||
    products.description.toLowerCase().includes(value)
  )

  renderProducts(filterProducts)

})