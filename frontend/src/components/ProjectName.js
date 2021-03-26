import React from "react";
import Header from "./Header";
import "../css/header.css"
import Footer from "./Footer";
import "../css/footer.css"
import "../App.css"
import "../css/projectName.css"
import { lang } from "../lang"
import {connect} from "react-redux"
import {changeData} from "../store/languages/action"
import GalleryService from "../services/GalleryService";

class ProjectName extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
            photos: [],
            info: {},
            data: {},
            project: [],
            photos: [],
            inp: {
                name_hy: "",
                name_en: "",
                title_hy: "",
                title_en: "",
                photo_url: "",
              },
        }
    }
    componentDidMount(){
        GalleryService.showProjectItem(this.props.match.params.id)
        .then((r) => {
           this.state.data = r.data
           let lang = this.state.data.name_hy || this.state.data.name_en
            this.setState({})
            GalleryService.showProject(lang).then(r => {
                this.state.info = r.data.data
               const n = JSON.parse(r.data.data.photo_url)
               this.state.photos = n
                this.setState({})
            })
        })
        
    }
    handelChangeLang = (id) =>{
        this.props.changeData(id)
    }
    change(e){
        if(e.target.getAttribute("data-id") == "photo_url"){
            this.state.inp[e.target.getAttribute("data-id")] = e.target.files
        }
        else{
            this.state.inp[e.target.getAttribute("data-id")] = e.target.value
        }
        this.setState({})
    }
    add(){
        let formData = new FormData()
        formData.append("name_hy", this.state.inp.name_hy)
        formData.append("title_hy", this.state.inp.title_hy)
        formData.append("name_en", this.state.inp.name_en)
        formData.append("title_en", this.state.inp.title_en)
        formData.append("lang_id", this.props.langData.langId)
        for(let i of Object.keys(this.state.inp.photo_url)){
            formData.append("photo_url", this.state.inp.photo_url[i])
        }
        if(this.props.langData.langId == 2){
            formData.append("nameOfGallery", this.state.data.name_en)
            GalleryService.addNewProject(formData).then((r) => console.log(r.data))
            return
        }
        formData.append("nameOfGallery", this.state.data.name_hy)
        GalleryService.addNewProject(formData).then((r) => console.log(r.data))
    }
    
    render(){
        return(
            <div className="project">
                <Header handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
                <h1>Add Project</h1>
                    <div>
                        {
                            this.props.langData.langId == 1 ?
                            <>
                                Project Name_hy:
                                <input type="text" data-id="name_hy" value={this.state.inp.name_hy} onChange={this.change.bind(this)} />
                                Project Title_hy:
                                <input type="text" data-id="title_hy" value={this.state.inp.title_hy} onChange={this.change.bind(this)} />
                            </>:
                            <>
                                Project Name_eng:
                                <input type="text" data-id="name_en" value={this.state.inp.name_en} onChange={this.change.bind(this)} />
                            
                                Project Title_en:
                                <input type="text" data-id="title_en" value={this.state.inp.title_en} onChange={this.change.bind(this)} />
                            </>
                            
                        }
                        Photos: <input type="file" multiple data-id = "photo_url" onChange={this.change.bind(this)}/>
                        <button onClick = {this.add.bind(this)}>Add</button>
                    </div>
                <div className="project-name">
                
                    <h1 className="project-title-head">{this.state.data.name_hy}</h1> 
                    {
                        this.props.langData.langId == 1 ?
                        <>
                                <h1 className="project-title-par">
                                    {this.state.info.title_hy}     
                                </h1>
                                <div className="project-main">
                                {
                                    this.state.photos.map((a, i) => (
                                        
                                            i %3 ===0 ? 
                                            <>
                                                <div key = {a} className="column-big">
                                                    <div className="big-area">
                                                        <img src={a} />
                                                    </div>
                                                </div>
                                            </>:
                                            <div key = {a} className="column-small">
                                                <div className="small-area">
                                                    <img src={a} />
                                                </div>
                                            </div>
                                        
                                    ))
                                }                              
                                </div>
                        </>:
                        <>
                                <h1 className="project-title-par">
                                    {this.state.info.title_en}     
                                </h1>
                                <div className="project-main">
                                {
                                    this.state.photos.map((a, i) => (
                                        
                                            i %3 ===0 ? 
                                            <>
                                                <div key = {a} className="column-big">
                                                    <div className="big-area">
                                                        <img src={a} />
                                                    </div>
                                                </div>
                                            </>:
                                            <div key = {a} className="column-small">
                                                <div className="small-area">
                                                    <img src={a} />
                                                </div>
                                            </div>
                                        
                                    ))
                                }                              
                                </div>
                        </>
                    }
                    
                </div>
               
                {/* <Footer /> */}
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


export default connect(mapstatetoprops, mapDispatchToProps) (ProjectName)