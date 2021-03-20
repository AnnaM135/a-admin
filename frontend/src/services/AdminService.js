import AuthHeader from "./AuthHeader"
import Axios from "axios"


class AdminService {
    constructor() {
        this.api = Axios.create({
            baseURL: "http://localhost:8000",
            headers: {
                'Content-type': 'application/json'
            },
        })

    }
    getServicesDesc() {
        return this.api.get("/services", { headers: AuthHeader() })
    }
    addServicesDesc(data) {
        console.log({ headers: AuthHeader() })
        return this.api.post("/services/add", data, { headers: AuthHeader() })
    }
}


export default new AdminService()


