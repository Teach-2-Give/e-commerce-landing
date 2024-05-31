document.addEventListener('DOMContentLoaded', function (event) {
    var ordersLink = document.getElementById('orders-link');
    var customersLink = document.getElementById('customers-link');
    var statisticsLink = document.getElementById('statistics-link');
    var productsGrid = document.querySelector('.products-grid');
    if (ordersLink) {
        ordersLink.addEventListener('click', function (event) {
            event.preventDefault();
            productsGrid.innerHTML = 'Orders page is under construction.';
        });
    }
    if (customersLink) {
        customersLink.addEventListener('click', function (event) {
            event.preventDefault();
            productsGrid.innerHTML = 'Customers page is under construction.';
        });
    }
    if (statisticsLink) {
        statisticsLink.addEventListener('click', function (event) {
            event.preventDefault();
            productsGrid.innerHTML = 'Statistics page is under construction.';
        });
    }
});
