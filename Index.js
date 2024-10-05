
let allProducts  =[];


fetch("https://fakestoreapi.com/products")

.then(fetchingResponse => fetchingResponse.json()) 
.then((dataFetching) => {

    allProducts = dataFetching;
    displayItems(dataFetching); 
    })
    .catch((err)=>console.error("error in while fetching the API",err));

// Function to display products
function displayItems(productss){
    const container = document.getElementById('gokul')
    container.innerHTML = '';

    productss.forEach((items) => {

        const card = document.createElement('div');
        card.className = 'product';

        let productTitle = items.title;
        let productDescription = items.description;


        card.innerHTML = `
                        <img src="${items.image}" alt="productsimages" class="product_img">
                        <h2 class="product_title">${productTitle.length >0 ? productTitle.substring(0, 11).concat("...") : productTitle}</h2>
                        <p class="product_description">${productDescription.length > 0 ? productDescription.substring(0, 90).concat("...") : productDescription}</p>
                        <div class="product_price"> $ ${items.price}</div>
                        <div class="button_div">
                        <button class="product_details">Details</button>
                        <button  class="add_to_cart" onClick="addToCart(${items.id})">add to cart</button>
                        </div>
                        `
        container.appendChild(card)

    });
}       
// Filter products
function filteringItems(cat){
    if(cat === 'all'){
        displayItems(allProducts)
    }else{
        let filteringItems = allProducts.filter((product)=> product.category === cat)
        displayItems(filteringItems)
    }
}

function addToCart(productId) {
    const product = allProducts.find(p =>p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct){

      } else {
        cart.push({ ...product, quantity: 1});

    }
    localStorage.setItem('cart',JSON.stringify(cart));

    updateCartCount();
}

// Update cart count in header

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const CartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.querySelector('#cart-btn').innerHTML = `<i calss = "fa-solid fa-c art-shopping"></i> Cart (${cartCount})`;
  } 

  window.onload = updateCartCount;
