import React from "react";
import "../css/gallery.css"
import Header from "./Header";
import "../css/header.css"
import Footer from "./Footer";
import "../css/footer.css"
import "../App.css"
import {Link} from "react-router-dom";
import { lang } from "../lang"
import {connect} from "react-redux"
import {changeData} from "../store/languages/action"
import GalleryService from "../services/GalleryService";
import swal from 'sweetalert';




class Gallery extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          inp: {
            project_name: "",
            photo_url: "",
          },
          gallery: []
        };
      }

      componentDidMount(){
        GalleryService.getGalleryInfo().then((r) => {
            this.state.gallery = r.data.gallery
            this.setState({})
        })
      }

    handelChangeLang = (id) =>{
        this.props.changeData(id)
    }

    change(e) {
        if(e.target.getAttribute("data-id") == "photo_url"){
            this.state.inp[e.target.getAttribute("data-id")] = e.target.files;
        }
        else{
            this.state.inp[e.target.getAttribute("data-id")] = e.target.value;
        }
        this.setState({});
    }
    deleteProject(id){
        GalleryService.deleteGalleryInfo(id).then((r) =>{
            this.state.gallery.filter(x => {
                if(x.id == id){
                    id = r.data
                }
                this.componentDidMount()
            })
            this.setState({})
        })
    }
    add(){
        console.log(this.state.inp)
        let formData = new FormData()
        formData.append("project_name", this.state.inp.project_name)
        formData.append("photo_url", this.state.inp.photo_url[0])
        GalleryService.addProject(formData).then((r) => {
            swal("Good job!", "You clicked the button!", "success")
               this.state.inp.project_name = "";
               this.state.inp.photo_url =  "";
            this.setState({})
        })
        .catch((err) => console.log(err))
    }
    render(){
      
        return(
            <div class="gallery">
                <Header handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
                    <h1>Add Project</h1>
                    <div>
                    Project Name:
                    <input type="text" data-id="project_name" value={this.state.inp.project_name} onChange={this.change.bind(this)} />
                    Photo: <input type="file" data-id = "photo_url" onChange={this.change.bind(this)}/>
                    <button onClick = {this.add.bind(this)}>Add</button>
                    </div>
                <div class="gallery-main">
                    {
                        this.state.gallery.map((a) => (
                            <div class="column">
                                <img src={`http://localhost:8000/images/${a.photo_url}`}  class="gallery-image"/>
                                <div class="overlay">
                                <button className = "btn-danger" onClick = {this.deleteProject.bind(this, a.id)}><i className ="fa fa-trash-o" aria-hidden="true"></i></button>
                                    <div class="text"><Link to ={ `/gallery/project/${a.id}`} class = "special-item">{a.project_name}{lang[this.props.langData.langId].titleOne}</Link></div>
                                </div>
                            </div>
                        ))
                    }
                   
                </div>
                <Footer />
	        </div>
        )
    }
}

function mapstatetoprops(state){
    return{
        langData: state.langReducer
    }
}
const mapDispatchToProps = {
     changeData
}


export default connect(mapstatetoprops, mapDispatchToProps)(Gallery) 