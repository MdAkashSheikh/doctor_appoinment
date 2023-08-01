const baseUrl = '//localhost:5000';

// '/demo/data/products.json'
export const ProductService = {

    getProductsSmall() {
        return fetch(`//localhost:5000/get-data`, { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getProducts() {
        return fetch(`//localhost:5000/get-data`, { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getProductsWithOrdersSmall() {
        return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
};
