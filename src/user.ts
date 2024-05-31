interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Function to fetch products from the backend
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('http://localhost:3000/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

// Function to create product element for rendering
function createProductElement(product: Product): HTMLElement {
  const productItem = document.createElement('div');
  productItem.className = 'product-item';
  productItem.setAttribute('data-id', product.id);

  productItem.innerHTML = `
    <img src="${product.image}" alt="Product Image">
    <h3>${product.name}</h3>
    <p>${product.category}</p>
    <div class="product-rating">
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star-half-alt"></i>
      <span>| 89 Sold</span>
    </div>
    <p class="product-price">$${product.price}</p>
    <div class="buttons">
      <button class="buy-now">Buy</button>
      <button class="add-to-cart"><i class="fa fa-cart-plus"></i></button>
    </div>
  `;

  return productItem;
}

// Function to render products on the page
async function renderProducts() {
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) {
    console.error('Product grid element not found');
    return;
  }

  try {
    const products = await fetchProducts();
    products.forEach(product => {
      const productElement = createProductElement(product);
      productGrid.appendChild(productElement);
    });
    attachAddToCartListeners();
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
}

// Function to get cart items from local storage
function getCartItems(): CartItem[] {
  return JSON.parse(localStorage.getItem('cartItems') || '[]');
}

// Function to save cart items to local storage
function saveCartItems(cartItems: CartItem[]): void {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to update cart UI
function updateCartUI(): void {
  const cartItems = getCartItems();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price), 0).toFixed(2);

  document.getElementById('cart-count')!.textContent = `${cartCount}`;
  document.getElementById('cart-total')!.textContent = `$${cartTotal}`;
}

// Function to handle adding items to the cart
function handleAddToCart(product: Product): void {
  const cartItems = getCartItems();
  const existingItem = cartItems.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  saveCartItems(cartItems);
  updateCartUI();
}

// Function to attach event listeners to add-to-cart buttons
function attachAddToCartListeners(): void {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productElement = (button.closest('.product-item') as HTMLElement);
      const product: Product = {
        id: productElement.getAttribute('data-id')!,
        name: productElement.querySelector('h3')!.textContent!,
        price: productElement.querySelector('.product-price')!.textContent!.replace('$', ''),
        image: productElement.querySelector('img')!.src,
        category: productElement.querySelector('p')!.textContent!
      };
      handleAddToCart(product);
    });
  });
}

// Function to render cart items in the modal
function renderCartItems(): void {
  const cartItems = getCartItems();
  const cartItemsContainer = document.getElementById('cart-items')!;
  cartItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Category: ${item.category}</p>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });

  document.getElementById('cart-total-items')!.textContent = `${cartItems.length}`;
  document.getElementById('cart-total-price')!.textContent = `$${cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price), 0).toFixed(2)}`;
}

// Function to show cart modal
function showCartModal(): void {
  document.getElementById('cart-modal')!.style.display = 'block';
  renderCartItems();
}

// Function to hide cart modal
function hideCartModal(): void {
  document.getElementById('cart-modal')!.style.display = 'none';
}

// Function to handle removing items from the cart
function handleRemoveCartItem(productId: string): void {
  let cartItems = getCartItems();
  cartItems = cartItems.filter(item => item.id !== productId);
  saveCartItems(cartItems);
  updateCartUI();
  renderCartItems();
}

// Function to handle checkout
async function handleCheckout(): Promise<void> {
  const cartItems = getCartItems();

  // Send cart details to the backend for processing
  const response = await fetch('http://localhost:3000/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems),
  });

  if (response.ok) {
    alert('Checkout successful!');
    localStorage.removeItem('cartItems');
    updateCartUI();
    hideCartModal();
  } else {
    alert('Checkout failed. Please try again.');
  }
}

// Attach event listeners to cart icon and modal buttons
document.addEventListener('DOMContentLoaded', () => {
  renderProducts().then(() => {
    attachAddToCartListeners();
    updateCartUI();
  });

  document.querySelector('.cart-icon')!.addEventListener('click', showCartModal);
  document.querySelector('.close')!.addEventListener('click', hideCartModal);
  document.getElementById('checkout-button')!.addEventListener('click', handleCheckout);
  document.getElementById('clear-cart-button')!.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    updateCartUI();
    hideCartModal();
  });

  document.addEventListener('click', event => {
    if ((event.target as HTMLElement).classList.contains('remove-item')) {
      const productId = (event.target as HTMLElement).getAttribute('data-id')!;
      handleRemoveCartItem(productId);
    }
  });
});
