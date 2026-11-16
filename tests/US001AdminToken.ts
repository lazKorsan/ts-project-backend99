import {LoginPlugin} from "../utils/LoginPlugin";

const axios = require('axios');
let data = '{\r\n    "email":"ahmet.admin@instulearn.com",\r\n    "password":"Learn.123"\r\n}';

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://qa.instulearn.com/api/token',
    headers: {
        'Accept': 'application/json',
        'x-api-key': '1234'
    },
    data : data
};

axios.request(config)
    .then((response: { data: any; }) => {
        LoginPlugin.logError(JSON.stringify(response.data));
    })
    .catch((error: any) => {
        console.log(error);
    });
