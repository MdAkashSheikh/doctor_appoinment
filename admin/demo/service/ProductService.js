import axios from 'axios';

//localhost
//home: 192.168.1.101
//office: 192.168.0.110
// '/demo/data/products.json'

const baseUrl = '//localhost:5000';


export const ProductService = {


    // Client and Appointment List
    async postPatient(chamber, specialist, doctor, date1, time1, name, age, gender, phone, details, serial) {

        const data = {
            chamber,
            specialist,
            doctor,
            date1,
            time1,
            name,
            age,
            gender,
            phone,
            details,
            serial,
            status: 'Not Update'
        }

        const res = await axios.post(
            `${baseUrl}/client-data`,
            data
        )

    },

    getProducts() {
        return fetch(`${baseUrl}/get-data`, { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.AllData);
    },

    
    //Master Chamber 

    async postChamber(chamber) {
        
        const data = {
            chamber
        }
        
        const res = await axios.post(
            `${baseUrl}/post-chamber`,
            data
        )
    },

    getChamber() {
        return fetch(`${baseUrl}/get-chamber`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.AllData);
    },

    async deleteChember(id) {
        await fetch(`${baseUrl}/delete-chamber/` + id, {
            method: "DELETE"
        })
    },

    
    //Master Time

    async postTime(st_time, en_time) {
        
        const data = {
            st_time,
            en_time
        };  

        const res = await axios.post(
            `${baseUrl}/post-time`,
            data,
        )
    },

    getTime() {
        return fetch(`${baseUrl}/get-time`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.AllData);
    },


    //AvailAbility Management

    async postAvailable( chamber, time1, days, serial) {

        const data = {
            chamber,
            time1,
            days,
            serial,
        }

        const res = await axios.post(
            `${baseUrl}/post-available`,
            data,
        )
    },

    getAvailable() {
        
        return fetch(`${baseUrl}/get-available`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.AllData);
    }

    
};
