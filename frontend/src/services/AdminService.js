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
    // logout(){
    //     return this.api.get("/home", {headers: AuthHeader()})
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
    showServicesItem(id){
        return this.api.get(`/services/outdoor/${id}`, { headers: AuthHeader() })
    }
    addNewSerevice(data){
        return this.api.post(`/services/outdoor/add`, data, { headers: AuthHeader() })
    }
    showServices(id){
        return this.api.get(`/services/outdoor/get/${id}`, { headers: AuthHeader() })
    }
}


export default new AdminService()


