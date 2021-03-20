import Axios from "axios"


class AuthService {
    constructor() {
        this.api = Axios.create({
            baseURL: "http://localhost:8000",
            headers: {
                'Content-type': 'application/json'
            },
        })

    }
    login(data){
        return this.api.post("/login/add", data)
    }

}


export default new AuthService()


