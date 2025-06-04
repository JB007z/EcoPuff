const productsDOM = document.getElementById('products')
const token = localStorage.getItem('token')
const decodedToken = jwt_decode(token)
const userId = decodedToken.userId

let cartIds = new Set()

const getAndDisplayProducts = async()=>{
    if(token){

        try {
            await checkCart()
            const response = await axios.get('/api/v1/products',{headers:{
                'Authorization':`Bearer ${token}`
            }})
            const products = response.data.products
            if(!products||products.length===0){
                productsDOM.innerHTML = '<p class="text-center text-gray-500 col-span-full">No products found.</p>'
            }
            else{
                populateGrid(products)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    else{
        console.log('User must log in to proceed');
        
    }
}

const populateGrid = function(products){
    productsDOM.innerHTML=""
    
    products.forEach(product=>{
        const card = document.createElement('div')
        card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col';
        
        const img = document.createElement('img')
        img.src = product.image||'https://via.placeholder.com/300x200.png?text=No+Image'; // Use a placeholder if no image URL
        img.alt = product.name;
        img.className = 'w-full h-48 object-contain';
        card.appendChild(img);

        const contentDiv = document.createElement('div')
        contentDiv.className ='p-6 flex flex-col flex-grow'

        const textInfoWrapper = document.createElement('div');
        textInfoWrapper.className = 'flex-grow'

        const productName = document.createElement('h3')
        productName.className = 'text-xl font-semibold text-gray-800 mb-2';
        productName.textContent = product.title

        const productDescription = document.createElement('p')
        productDescription.className = 'text-gray-600 text-sm mb-4';
        productDescription.textContent = product.desc||'No description for this product'
        
        textInfoWrapper.appendChild(productName);
        textInfoWrapper.appendChild(productDescription);
        contentDiv.appendChild(textInfoWrapper); 


        const bottomWrapper = document.createElement('div');

        const priceContainer = document.createElement('div')
        priceContainer.className ='flex justify-between items-center mb-4'

        const productPrice = document.createElement('span')
        productPrice.className = 'text-2xl font-bold ecopuff-green-text';
        productPrice.textContent = `$${product.price}`
        
        priceContainer.appendChild(productPrice);
        bottomWrapper.appendChild(priceContainer);
        
        const productId = product._id
        const actionButton = document.createElement('button')
        actionButton.className = 'w-full ecopuff-green hover:ecopuff-green-dark text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300'

        if(cartIds.has(productId)){
            actionButton.textContent = 'Product added to cart';
            actionButton.disabled = true;
        }
        else{
            actionButton.textContent = 'Add to Cart'
        }
        
        actionButton.addEventListener('click',()=>{
            if (productId) {
                addToCart(productId)
                actionButton.textContent = 'Product added to cart';
                actionButton.disabled = true;  // Optional for UX
                
                
            } else {
                console.error('Product ID is missing for this item.');
                alert('Could not add item to cart: Product ID missing.');
            }
            
        })


        bottomWrapper.appendChild(actionButton);
        contentDiv.appendChild(bottomWrapper); // Add the bottom part (price & button)

        card.appendChild(contentDiv);

        productsDOM.appendChild(card)

    })  

}

const addToCart = async(productId)=>{
    const productResponse = await axios.get(`/api/v1/products/${productId}`,{headers:{'Authorization':`Bearer ${token}`}})
    
    const product = productResponse.data.product
    const { _id, ...rest } = product;
    const productWithRenamedKey = { productId: _id, ...rest };    
    try {
        
        const cartResponse = await axios.get(`/api/v1/carts/${userId}`,{headers:{'Authorization':`Bearer ${token}`}})
        
        const updatedProducts = [...cartResponse.data.cart.products, productWithRenamedKey];
        
        console.log(updatedProducts);
        
       await axios.patch(`/api/v1/carts/${userId}`,{products:updatedProducts},{headers:{'Authorization':`Bearer ${token}`}})
        
    } catch (error) {
        if (error.response && error.response.status === 404) {
            try {
                 await axios.post(`/api/v1/carts/`,{userId,products:[productWithRenamedKey]},{headers:{'Authorization':`Bearer ${token}`}})
                 
            } catch (error) {
                console.log(error);
            }
        }
        else{
            console.log(error);
            
        }

    }}
const checkCart = async () => {
    cartIds = new Set(); // Reset before each check
    if (!token || !userId) { // Use the globally initialized and validated token/userId
        console.log("User not authenticated, cannot check cart.");
        return; // cartIds remains empty
    }
    try {
        const cartResponse = await axios.get(`/api/v1/carts/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (cartResponse.data && cartResponse.data.cart && cartResponse.data.cart.products) {
            const productsInCart = cartResponse.data.cart.products;
            productsInCart.forEach(p => cartIds.add(p.productId));
            console.log("Cart IDs populated:", cartIds);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('No cart found for user, or cart is empty.'); // This is fine, cartIds remains empty
        } else {
            console.error('Error fetching cart in checkCart:', error);
        }
    }
};

getAndDisplayProducts()