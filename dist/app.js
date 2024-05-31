document.addEventListener('DOMContentLoaded', function (event) {
    var createButton = document.getElementById('create-btn');
    var productForm = document.getElementById('product-form');
    var cancelIcon = document.getElementById('cancel-icon');
    var submitButton = document.getElementById('submit-button');
    var productNameInput = document.getElementById('product-name');
    var productPriceInput = document.getElementById('product-price');
    var productImageInput = document.getElementById('product-image');
    var productCategorySelect = document.getElementById('product-category');
    var productsGrid = document.querySelector('.products-grid');
    var editingProductId = null;
    var fetchAndDisplayProducts = function () {
        fetch('http://localhost:3000/products')
            .then(function (response) { return response.json(); })
            .then(function (products) {
            productsGrid.innerHTML = '';
            products.forEach(function (product) {
                var productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = "\n                        <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n                        <div class=\"product-details\">\n                            <p><b>").concat(product.name, "</b></p>\n                            <p>$").concat(product.price, "</p>\n                            <div class=\"product-actions\">\n                                <button class=\"edit-btn\" data-id=\"").concat(product.id, "\"><i class=\"fas fa-edit\"></i></button>\n                                <button class=\"delete-btn\" data-id=\"").concat(product.id, "\"><i class=\"fas fa-trash\"></i></button>\n                            </div>\n                        </div>\n                    ");
                productsGrid.appendChild(productCard);
            });
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    };
    if (createButton && productForm && cancelIcon && submitButton && productNameInput && productPriceInput && productImageInput && productCategorySelect && productsGrid) {
        createButton.addEventListener('click', function () {
            productForm.style.display = 'block';
            productForm.classList.add('show');
            submitButton.textContent = 'Create';
            productNameInput.value = '';
            productPriceInput.value = '';
            productImageInput.value = '';
            productCategorySelect.value = '';
            editingProductId = null;
        });
        cancelIcon.addEventListener('click', function () {
            productForm.style.display = 'none';
            productForm.classList.remove('show');
        });
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                image: productImageInput.value,
                category: productCategorySelect.value
            };
            if (editingProductId) {
                // Update existing product
                fetch("http://localhost:3000/products/".concat(editingProductId), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    console.log('Success:', data);
                    fetchAndDisplayProducts();
                    productForm.style.display = 'none';
                    productForm.classList.remove('show');
                })
                    .catch(function (error) {
                    console.error('Error:', error);
                });
            }
            else {
                // Create new product
                fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    console.log('Success:', data);
                    fetchAndDisplayProducts();
                    productForm.style.display = 'none';
                    productForm.classList.remove('show');
                })
                    .catch(function (error) {
                    console.error('Error:', error);
                });
            }
        });
        // Event delegation for edit and delete buttons
        productsGrid.addEventListener('click', function (event) {
            var targetElement = event.target;
            if (targetElement.classList.contains('edit-btn')) {
                var id = targetElement.dataset.id;
                fetch("http://localhost:3000/products/".concat(id))
                    .then(function (response) { return response.json(); })
                    .then(function (product) {
                    productForm.style.display = 'block';
                    productForm.classList.add('show');
                    submitButton.textContent = 'Update';
                    productNameInput.value = product.name;
                    productPriceInput.value = product.price;
                    productImageInput.value = product.image;
                    productCategorySelect.value = product.category;
                    editingProductId = product.id;
                })
                    .catch(function (error) {
                    console.error('Error:', error);
                });
            }
            else if (targetElement.classList.contains('delete-btn')) {
                var id = targetElement.dataset.id;
                fetch("http://localhost:3000/products/".concat(id), {
                    method: 'DELETE',
                })
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    var _a;
                    console.log('Success:', data);
                    (_a = targetElement.closest('.product-card')) === null || _a === void 0 ? void 0 : _a.remove();
                })
                    .catch(function (error) {
                    console.error('Error:', error);
                });
            }
        });
        // Initial fetch and display products
        fetchAndDisplayProducts();
    }
});
