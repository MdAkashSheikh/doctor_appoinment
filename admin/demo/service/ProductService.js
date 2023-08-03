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

    
    //Master Chamber 

    async postChamber(chamber) {
        
        const formData = new FormData();
        formData.append('chamber', chamber);
        
        const res = await axios.post(
            `${baseUrl}/post-chamber`,
            formData
        )
    },

    async getChamber() {
        return await fetch(`${baseUrl}/get-chamber`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.AllData);
    },

    
    //Master Time

    async postTime(st_time, en_time) {
        
        const formData = new FormData();

        formData.append('st_time', st_time);
        formData.append('en_time', en_time);

        const res = await axios.post(
            `${baseUrl}/post-time`,
            formData,
        )
    },

    async getTime() {
        return await fetch(`${baseUrl}/get-time`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.AllData);
    },


    //AvailAbility Management

    async postAvailable( chamber, time1, days, serial) {

        const formData = new FormData();

        formData.append('chamber', chamber);
        formData.append('time1', time1);
        formData.append('days', days);
        formData.append('serial', serial);

        const res = await axios.post(
            `${baseUrl}/post-available`,
            formData
        )
    },

    async getAvailable() {
        
        return await fetch(`${baseUrl}/get-available`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.AllData);
    }

    
};
