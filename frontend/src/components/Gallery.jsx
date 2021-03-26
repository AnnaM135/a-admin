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
            name_hy: "",
            name_en: "",
            photo_url: "",
          },
          gallery_hy: [],
          gallery_en: []
        };
      }

      componentDidMount(){
        GalleryService.getGalleryInfo().then((r) => {
            this.state.gallery_en = r.data.data.filter(elem=> elem.name_en)
            this.state.gallery_hy = r.data.data.filter(elem=> elem.name_hy)
            this.setState({})
            console.log(this.state.gallery_en, this.state.gallery_hy)
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
        GalleryService.delete(id).then((r) =>{
            console.log(r.data)
            this.state.gallery_en.filter(elem=> {
                if(elem.id == id){
                    id = r.data
                }
                this.componentDidMount()
            })
            this.state.gallery_hy.filter(elem=> {
                if(elem.id == id){
                    id = r.data
                }
                this.componentDidMount()
            })
            this.setState({})
        })
    }
    add(){
        const formData = new FormData()
        formData.append("name_hy", this.state.inp.name_hy)
        formData.append("name_en", this.state.inp.name_en)
        formData.append("id", this.props.langData.langId)
        formData.append("photo_url", this.state.inp.photo_url[0])
        GalleryService.addProject(formData).then((r) => {
            swal("Good job!", "You clicked the button!", "success")
            this.componentDidMount()
               this.state.inp.name_hy = "";
               this.state.inp.name_en =  "";
               this.state.inp.photo_url = "";
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
                   {
                       this.props.langData.langId == 1 ?
                       <>
                            Project Name_hy:
                            <input type="text" data-id="name_hy" value={this.state.inp.name_hy} onChange={this.change.bind(this)} />
                       </>:
                       <>
                            Project Name_eng:
                            <input type="text" data-id="name_en" value={this.state.inp.name_en} onChange={this.change.bind(this)} />
                       </>
                   }
                    
                    Photo: <input type="file" data-id = "photo_url" onChange={this.change.bind(this)}/>
                    <button onClick = {this.add.bind(this)}>Add</button>
                    </div>
                    
                    {
                        this.props.langData.langId == 1 ?
                        <>
                            <div class="gallery-main"> 
                                {
                                    this.state.gallery_hy.map(a => {
                                        return (
                                            <div class="column">
                                                <img src={a.photo_url} class="gallery-image"/>
                                                <div class="overlay">
                                                    <button className = "btn-danger" onClick = {this.deleteProject.bind(this, a.id)}><i className ="fa fa-trash-o" aria-hidden="true"></i></button>
                                                    <div class="text"><Link to ={ `/gallery/project/${a.id}`} class = "special-item">{a.name_hy}</Link></div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>:
                        <>
                            <div class="gallery-main"> 
                                {
                                    this.state.gallery_en.map(a => {
                                        return (
                                            <div class="column">
                                                <img src={a.photo_url} class="gallery-image"/>
                                                <div class="overlay">
                                                    <button className = "btn-danger" onClick = {this.deleteProject.bind(this, a.id)}><i className ="fa fa-trash-o" aria-hidden="true"></i></button>
                                                    <div class="text"><Link to ={ `/gallery/project/${a.id}`} class = "special-item">{a.name_en}</Link></div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }          
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