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
        <span>delete</span>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>

    `
    const button = card.querySelector(".btn")

    button.addEventListener("click", () => {
      fetch(`https://fakestoreapi.com/carts/${el.id}`,{
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        window.location.reload()
      })
    })


  container.appendChild(card)

}

