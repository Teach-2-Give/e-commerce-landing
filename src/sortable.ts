document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput = document.querySelector('.filters input[type="text"]') as HTMLInputElement;
    const categorySelect = document.querySelector('.filters .filter') as HTMLSelectElement;
    const productsGrid = document.querySelector('.products-grid') as HTMLElement;

    let currentSearchTerm = '';
    let currentCategory = '';

    const fetchAndDisplayProducts = () => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                productsGrid.innerHTML = '';
                products.forEach((product) => {
                    if ((currentSearchTerm && product.name.toLowerCase().indexOf(currentSearchTerm.toLowerCase()) === -1) || (currentCategory && product.category !== currentCategory)) {
                        return;
                    }
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-details">
                            <p><b>${product.name}</b></p>
                            <p>$${product.price}</p>
                            <div class="product-actions">
                                <button class="edit-btn" data-id="${product.id}"><i class="fas fa-edit"></i></button>
                                <button class="delete-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;
                    productsGrid.appendChild(productCard);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (searchInput && categorySelect && productsGrid) {
        searchInput.addEventListener('input', () => {
            currentSearchTerm = searchInput.value;
            fetchAndDisplayProducts();
        });

        categorySelect.addEventListener('change', () => {
            currentCategory = categorySelect.value;
            fetchAndDisplayProducts();
        });


        fetchAndDisplayProducts();
    }
});