import Axios from "axios"


export default Axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        'Content-type': 'application/json'
    },
})