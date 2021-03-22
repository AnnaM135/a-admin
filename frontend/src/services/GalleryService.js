import AuthHeader from "./AuthHeader"
import Axios from "axios"


class GalleryService {
    constructor() {
        this.api = Axios.create({
            baseURL: "http://localhost:8000",
            headers: {
                'Content-type': 'application/json'
            },
        })

    }

    addProject(data){
        return this.api.post("/gallery/add", data,  { headers: AuthHeader() })
    }

    getGalleryInfo(){
        return this.api.get("/gallery", { headers: AuthHeader() })
    }

   
    deleteGalleryInfo(id){
        return this.api.post("/gallery/delete", {id: id}, { headers: AuthHeader() })
    }

    showProjectItem(id){
        return this.api.get(`/gallery/project/${id}`, { headers: AuthHeader() })
    }

    // addNewProject(data){
    //     return this.api.post(`/gallery/project/${id}`, data, { headers: AuthHeader() })
    // }

}


export default new GalleryService()


