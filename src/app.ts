document.addEventListener('DOMContentLoaded', (event) => {
    const createButton = document.getElementById('create-btn') as HTMLButtonElement;
    const productForm = document.getElementById('product-form') as HTMLDivElement;
    const cancelIcon = document.getElementById('cancel-icon') as HTMLElement;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const productNameInput = document.getElementById('product-name') as HTMLInputElement;
    const productPriceInput = document.getElementById('product-price') as HTMLInputElement;
    const productImageInput = document.getElementById('product-image') as HTMLInputElement;
    const productCategorySelect = document.getElementById('product-category') as HTMLSelectElement;
    const productsGrid = document.querySelector('.products-grid') as HTMLElement;
    let editingProductId: string | null = null;

    const fetchAndDisplayProducts = () => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                productsGrid.innerHTML = '';
                products.forEach((product: { id: string, name: string, price: string, image: string }) => {
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

    if (createButton && productForm && cancelIcon && submitButton && productNameInput && productPriceInput && productImageInput && productCategorySelect && productsGrid) {
        createButton.addEventListener('click', () => {
            productForm.style.display = 'block';
            productForm.classList.add('show');
            submitButton.textContent = 'Create';
            productNameInput.value = '';
            productPriceInput.value = '';
            productImageInput.value = '';
            productCategorySelect.value = '';
            editingProductId = null;
        });

        cancelIcon.addEventListener('click', () => {
            productForm.style.display = 'none';
            productForm.classList.remove('show');
        });

        submitButton.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                image: productImageInput.value,
                category: productCategorySelect.value
            };

            if (editingProductId) {

                fetch(`http://localhost:3000/products/${editingProductId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    fetchAndDisplayProducts();
                    productForm.style.display = 'none';
                    productForm.classList.remove('show');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {

                fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    fetchAndDisplayProducts();
                    productForm.style.display = 'none';
                    productForm.classList.remove('show');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });


        productsGrid.addEventListener('click', (event) => {
            const targetElement = event.target as HTMLElement;
            if (targetElement.classList.contains('edit-btn')) {
                const id = targetElement.dataset.id;
                fetch(`http://localhost:3000/products/${id}`)
                    .then(response => response.json())
                    .then(product => {
                        productForm.style.display = 'block';
                        productForm.classList.add('show');
                        submitButton.textContent = 'Update';
                        productNameInput.value = product.name;
                        productPriceInput.value = product.price;
                        productImageInput.value = product.image;
                        productCategorySelect.value = product.category;
                        editingProductId = product.id;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else if (targetElement.classList.contains('delete-btn')) {
                const id = targetElement.dataset.id;
                fetch(`http://localhost:3000/products/${id}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    targetElement.closest('.product-card')?.remove();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        });


        fetchAndDisplayProducts();
    }
});