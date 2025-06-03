const cartDOM = document.getElementById('cartItemsContainer')
const token = localStorage.getItem('token')


const loadCart = async()=>{
    cartDOM.innerHTML=""
    try {
        const decodedToken = jwt_decode(token)
        const userId = decodedToken.userId
        const response = await axios.get(`/api/v1/carts/${userId}`,{headers:{'Authorization':`Bearer ${token}`}})
        const products = response.data.cart.products
        console.log(products);
        
        for(const p of products){
            
            const productId = p.productId;
            const quantity = p.quantity;

            // Fetch the full product details using the productId
            const productResponse = await axios.get(`/api/v1/products/${productId}`,{headers:{'Authorization':`Bearer ${token}`}});
            const product = productResponse.data.product
            if (!product) {
                
                console.warn(`Skipping cart item, details not found for productId: ${productId}`);
                
                return; // Move to the next cart item
            }

           

            
            const itemRow = document.createElement('div');
            itemRow.className = 'flex items-center p-4 border-b border-gray-200 last:border-b-0';

            // 2. Product Image
            const img = document.createElement('img');
            // Use property names from your fetched 'product' object
            img.src = product.image || 'https://via.placeholder.com/80x80.png?text=No+Image'; 
            img.alt =  product.title;
            img.className = 'w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md mr-4';
            itemRow.appendChild(img);

            // 3. Product Info (Name, Remove button) - this part will grow
            const infoDiv = document.createElement('div');
            infoDiv.className = 'flex-grow'; 

            const productName = document.createElement('h3');
            productName.className = 'text-md sm:text-lg font-semibold text-gray-700';
            productName.textContent = product.title
            infoDiv.appendChild(productName);

            const removeButton = document.createElement('button');
            removeButton.className = 'text-xs text-red-500 hover:text-red-700 hover:underline mt-1 transition-colors';
            removeButton.innerHTML = '<i class="fas fa-trash-alt mr-1"></i>Remove'; // Font Awesome example
            removeButton.dataset.productId = productId; // Store product ID for the event listener
            removeButton.addEventListener('click', (event) => {
                const idToRemove = event.currentTarget.dataset.productId;
                console.log(`Remove clicked for product ID: ${idToRemove}`);
                // Call your function to remove item from cart, e.g., handleRemoveFromCart(idToRemove);
                alert(`Product ID ${idToRemove} would be removed.`);
            });
            infoDiv.appendChild(removeButton);
            itemRow.appendChild(infoDiv);

          
            const quantityPriceDiv = document.createElement('div');
            quantityPriceDiv.className = 'flex flex-col items-end ml-2 sm:ml-4 w-auto'; // Adjusted width to auto for flexibility

            const unitPrice = document.createElement('span');
            unitPrice.className = 'text-sm sm:text-lg font-semibold ecopuff-green-text mb-1 sm:mb-2';
            if (typeof product.price === 'number' || (typeof product.price === 'string' && !isNaN(parseFloat(product.price)))) {
                unitPrice.textContent = `$${parseFloat(product.price).toFixed(2)}`;
            } else {
                unitPrice.textContent = 'N/A';
            }
            quantityPriceDiv.appendChild(unitPrice);

            // Quantity Adjuster
            const quantityAdjuster = document.createElement('div');
            quantityAdjuster.className = 'flex items-center';

            const decreaseBtn = document.createElement('button');
            decreaseBtn.className = 'quantity-btn text-gray-600 hover:text-ecopuff-green-text p-1 border rounded-l-md transition-colors disabled:opacity-50';
            decreaseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" /></svg>';
            decreaseBtn.dataset.productId = productId;
            decreaseBtn.addEventListener('click', (event) => {
                const idToChange = event.currentTarget.dataset.productId;
                console.log(`Decrease quantity for product ID: ${idToChange}`);
                // Call function: handleUpdateQuantity(idToChange, currentQuantity - 1);
            });
            if (quantity <= 1) { 
                decreaseBtn.disabled = true;
            }

            const quantityInput = document.createElement('input');
            quantityInput.type = 'text'; 
            quantityInput.value = quantity; 
            quantityInput.className = 'quantity-input w-10 sm:w-12 text-center border-t border-b focus:outline-none focus:ring-1 focus:ring-ecopuff-green';
            quantityInput.readOnly = true; 
            quantityInput.dataset.productId = productId;

            const increaseBtn = document.createElement('button');
            increaseBtn.className = 'quantity-btn text-gray-600 hover:text-ecopuff-green-text p-1 border rounded-r-md transition-colors';
            increaseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>';
            increaseBtn.dataset.productId = productId;
            increaseBtn.addEventListener('click', (event) => {
                const idToChange = event.currentTarget.dataset.productId;
                console.log(`Increase quantity for product ID: ${idToChange}`);
                // Call function: handleUpdateQuantity(idToChange, currentQuantity + 1);
            });

            quantityAdjuster.appendChild(decreaseBtn);
            quantityAdjuster.appendChild(quantityInput);
            quantityAdjuster.appendChild(increaseBtn);
            quantityPriceDiv.appendChild(quantityAdjuster);
            itemRow.appendChild(quantityPriceDiv);

            // 5. Append the completed itemRow to your main cart items container
            cartDOM.appendChild(itemRow);
        };
        
        
        
    } catch (error) {
        console.log(error);
        
    }
}

loadCart()