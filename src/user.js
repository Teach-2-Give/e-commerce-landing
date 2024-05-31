var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Function to fetch products from the backend
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/products')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
// Function to create product element for rendering
function createProductElement(product) {
    var productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.setAttribute('data-id', product.id);
    productItem.innerHTML = "\n    <img src=\"".concat(product.image, "\" alt=\"Product Image\">\n    <h3>").concat(product.name, "</h3>\n    <p>").concat(product.category, "</p>\n    <div class=\"product-rating\">\n      <i class=\"fa fa-star\"></i>\n      <i class=\"fa fa-star\"></i>\n      <i class=\"fa fa-star\"></i>\n      <i class=\"fa fa-star\"></i>\n      <i class=\"fa fa-star-half-alt\"></i>\n      <span>| 89 Sold</span>\n    </div>\n    <p class=\"product-price\">$").concat(product.price, "</p>\n    <div class=\"buttons\">\n      <button class=\"buy-now\">Buy</button>\n      <button class=\"add-to-cart\"><i class=\"fa fa-cart-plus\"></i></button>\n    </div>\n  ");
    return productItem;
}
// Function to render products on the page
function renderProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var productGrid, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productGrid = document.querySelector('.product-grid');
                    if (!productGrid) {
                        console.error('Product grid element not found');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchProducts()];
                case 2:
                    products = _a.sent();
                    products.forEach(function (product) {
                        var productElement = createProductElement(product);
                        productGrid.appendChild(productElement);
                    });
                    attachAddToCartListeners();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to fetch products:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to get cart items from local storage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
}
// Function to save cart items to local storage
function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
// Function to update cart UI
function updateCartUI() {
    var cartItems = getCartItems();
    var cartCount = cartItems.reduce(function (total, item) { return total + item.quantity; }, 0);
    var cartTotal = cartItems.reduce(function (total, item) { return total + item.quantity * parseFloat(item.price); }, 0).toFixed(2);
    document.getElementById('cart-count').textContent = "".concat(cartCount);
    document.getElementById('cart-total').textContent = "$".concat(cartTotal);
}
// Function to handle adding items to the cart
function handleAddToCart(product) {
    var cartItems = getCartItems();
    var existingItem = cartItems.find(function (item) { return item.id === product.id; });
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cartItems.push(__assign(__assign({}, product), { quantity: 1 }));
    }
    saveCartItems(cartItems);
    updateCartUI();
}
// Function to attach event listeners to add-to-cart buttons
function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(function (button) {
        button.addEventListener('click', function () {
            var productElement = button.closest('.product-item');
            var product = {
                id: productElement.getAttribute('data-id'),
                name: productElement.querySelector('h3').textContent,
                price: productElement.querySelector('.product-price').textContent.replace('$', ''),
                image: productElement.querySelector('img').src,
                category: productElement.querySelector('p').textContent
            };
            handleAddToCart(product);
        });
    });
}
// Function to render cart items in the modal
function renderCartItems() {
    var cartItems = getCartItems();
    var cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(function (item) {
        var cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = "\n      <img src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\">\n      <div class=\"cart-item-details\">\n        <h3>").concat(item.name, "</h3>\n        <p>Category: ").concat(item.category, "</p>\n        <p>Price: $").concat(item.price, "</p>\n        <p>Quantity: ").concat(item.quantity, "</p>\n      </div>\n      <button class=\"remove-item\" data-id=\"").concat(item.id, "\">Remove</button>\n    ");
        cartItemsContainer.appendChild(cartItemElement);
    });
    document.getElementById('cart-total-items').textContent = "".concat(cartItems.length);
    document.getElementById('cart-total-price').textContent = "$".concat(cartItems.reduce(function (total, item) { return total + item.quantity * parseFloat(item.price); }, 0).toFixed(2));
}
// Function to show cart modal
function showCartModal() {
    document.getElementById('cart-modal').style.display = 'block';
    renderCartItems();
}
// Function to hide cart modal
function hideCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}
// Function to handle removing items from the cart
function handleRemoveCartItem(productId) {
    var cartItems = getCartItems();
    cartItems = cartItems.filter(function (item) { return item.id !== productId; });
    saveCartItems(cartItems);
    updateCartUI();
    renderCartItems();
}
// Function to handle checkout
function handleCheckout() {
    return __awaiter(this, void 0, void 0, function () {
        var cartItems, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cartItems = getCartItems();
                    return [4 /*yield*/, fetch('http://localhost:3000/checkout', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(cartItems),
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        alert('Checkout successful!');
                        localStorage.removeItem('cartItems');
                        updateCartUI();
                        hideCartModal();
                    }
                    else {
                        alert('Checkout failed. Please try again.');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Attach event listeners to cart icon and modal buttons
document.addEventListener('DOMContentLoaded', function () {
    renderProducts().then(function () {
        attachAddToCartListeners();
        updateCartUI();
    });
    document.querySelector('.cart-icon').addEventListener('click', showCartModal);
    document.querySelector('.close').addEventListener('click', hideCartModal);
    document.getElementById('checkout-button').addEventListener('click', handleCheckout);
    document.getElementById('clear-cart-button').addEventListener('click', function () {
        localStorage.removeItem('cartItems');
        updateCartUI();
        hideCartModal();
    });
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            var productId = event.target.getAttribute('data-id');
            handleRemoveCartItem(productId);
        }
    });
});
