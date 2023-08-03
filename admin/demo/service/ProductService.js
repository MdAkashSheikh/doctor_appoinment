import axios from 'axios';



const baseUrl = '//localhost:5000';

// '/demo/data/products.json'
export const ProductService = {

    getProductsSmall() {
        return fetch(`//localhost:5000/get-data`, { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getProducts() {
        return fetch(`${baseUrl}/get-data`, { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.AllData);
    },


    async postChamber(chamber) {
        
        const formData = new FormData();
        formData.append('chamber', chamber);
        
        const res = await axios.post(
            `${baseUrl}/post-chamber`,
            formData
        )
    },

    getChamber() {
        return fetch(`${baseUrl}/get-chamber`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.AllData);
    },

    getProductsWithOrdersSmall() {
        return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
};
