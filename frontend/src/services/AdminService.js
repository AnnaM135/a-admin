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
    // getLangInfo(name,id){
    //     return this.api.get("/services/getLangInfo", {name, id},  { headers: AuthHeader() })
    // }
    addServicesDesc(data, id, name) {
        console.log({ headers: AuthHeader() })
        return this.api.post("/services/add", {data, id, name}, { headers: AuthHeader() })
    }
    addInfo(data, id){
        return this.api.post("/services/addInfo", {data, id}, { headers: AuthHeader() })
    }
    showInfo(){
        return this.api.get("/services/showInfo", { headers: AuthHeader() })
    }

    deleteServicesInfo(id){
        return this.api.post("/services/delete", {id: id}, { headers: AuthHeader() })
    }
    //editData(data, id){
    //     return this.api.post("/edit", {data, id}, { headers: AuthHeader() })
    // }
}


export default new AdminService()


