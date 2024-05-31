document.addEventListener('DOMContentLoaded', function (event) {
    var searchInput = document.querySelector('.filters input[type="text"]');
    var categorySelect = document.querySelector('.filters .filter');
    var productsGrid = document.querySelector('.products-grid');
    var currentSearchTerm = '';
    var currentCategory = '';
    var fetchAndDisplayProducts = function () {
        fetch('http://localhost:3000/products')
            .then(function (response) { return response.json(); })
            .then(function (products) {
            productsGrid.innerHTML = '';
            products.forEach(function (product) {
                if ((currentSearchTerm && product.name.toLowerCase().indexOf(currentSearchTerm.toLowerCase()) === -1) || (currentCategory && product.category !== currentCategory)) {
                    return;
                }
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
    if (searchInput && categorySelect && productsGrid) {
        searchInput.addEventListener('input', function () {
            currentSearchTerm = searchInput.value;
            fetchAndDisplayProducts();
        });
        categorySelect.addEventListener('change', function () {
            currentCategory = categorySelect.value;
            fetchAndDisplayProducts();
        });

        fetchAndDisplayProducts();
    }
});
