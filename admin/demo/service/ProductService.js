import axios from 'axios';



const baseUrl = '//localhost:5000';

// '/demo/data/products.json'
export const ProductService = {


    // Client and Appointment List
    async postPatient(chamber, specialist, doctor, date1, time1, name, age, gender, phone, details, serial) {

        const formData = new FormData();
        
        formData.append('chamber', chamber);
        formData.append('specialist', specialist);
        formData.append('doctor', doctor);
        formData.append('date1', date1);
        formData.append('time1', time1);
        formData.append('name', name);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('phone', phone);
        formData.append('details', details);
        formData.append('serial', serial);
        formData.append('status', "Not Updated");

        const res = await axios.post(
            `${baseUrl}/client-data`,
            formData
        )

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

    getChamber() {
        return fetch(`${baseUrl}/get-chamber`, { headers: { 'Cache-Control': 'no-cache' } })
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

    getTime() {
        return fetch(`${baseUrl}/get-time`, { headers: { 'Cache-Control': 'no-cache' } })
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

    getAvailable() {
        
        return fetch(`${baseUrl}/get-available`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.AllData);
    }

    
};
