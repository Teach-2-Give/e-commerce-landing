document.addEventListener('DOMContentLoaded', (event) => {
    const ordersLink = document.getElementById('orders-link');
    const customersLink = document.getElementById('customers-link');
    const statisticsLink = document.getElementById('statistics-link');
    const productsGrid = document.querySelector('.products-grid') as HTMLElement;

   
    if (ordersLink) {
        ordersLink.addEventListener('click', (event) => {
            
            event.preventDefault();

            
            productsGrid.innerHTML = 'Orders page is under construction.';
        });
    }

    
    if (customersLink) {
        customersLink.addEventListener('click', (event) => {
            
            event.preventDefault();

            
            productsGrid.innerHTML = 'Customers page is under construction.';
        });
    }

    
    if (statisticsLink) {
        statisticsLink.addEventListener('click', (event) => {
            
            event.preventDefault();

            
            productsGrid.innerHTML = 'Statistics page is under construction.';
        });
    }
});