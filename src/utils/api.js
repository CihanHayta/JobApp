import axios from "axios";


const Api =  axios.create({
    baseURL:"http://localhost:4040",
});

export default Api;