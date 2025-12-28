const container = document.querySelector(".container");
const params = new URLSearchParams(window.location.search);
const prodId = params.get("id");



fetch(`https://fakestoreapi.com/products/${prodId}`)
.then(resp => resp.json())
.then(data => {
  console.log(data)
  renderSingleProd(data)
})

function renderSingleProd(el){

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
    <p class="desc">${el.description}</p>
    <div class="feats">
      <span class="feat">Rating: ${el.rating.rate}</span>
      <span class="feat">Stock: ${el.rating.count}</span>
      <span class="feat">Price: ${el.price}</span>
    </div>
    <div class="bottom">
      <button class="btn" data-id="${el.id}">
        <span>Add to Cart</span>
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

    let cart = [card]
    const button = card.querySelector(".btn")
    
    function addNewCart(){
      fetch("https://fakestoreapi.com/carts", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          products: [
            {
              productId: el.id,
              quantity: 1
            }
          ]
        })
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        cartExists = true
        return data
      })
      .catch(err => console.error(err))
    }
    
    
    function getAllCarts(){
      fetch(`https://fakestoreapi.com/carts/${el.id}`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      window.location.href = `/cart/cart.html?id=${el.id}`
    })
    }

      button.addEventListener("click", () => {
        if(!addNewCart()) {
          addNewCart()
          getAllCarts()
        }
        else{
          getAllCarts()
        }
      })


  container.appendChild(card)

}