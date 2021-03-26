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
            data: {},
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
            console.log(r)
           this.state.data = r.data
            this.setState({})
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
        formData.append("gallery_id", this.props.match.params.id)
        formData.append("lang_id", this.props.langData.langId)
        for(let i of Object.keys(this.state.inp.photo_url)){
            formData.append("photo_url", this.state.inp.photo_url[i])
        }
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
                    {/* <h1 className="project-title-par">
                        The company “Sdesign” operates in the sphere of outdoor advertising making (decorating the facades, making light boxes), interior design of commercial objects (installation of the advertising wall carriers: acrylic glass, foam boards, interior light boxes
                    </h1> */}
                </div>
                {/* <div className="project-main">
                    <div className="column-big">
                        <div className="big-area">
                            <img src="/images/upload.png" />
                        </div>
                    </div>
                    <div className="column-small">
                        <div className="small-area">
                            <img src="/images/upload.png" />
                        </div>
                    </div>
                    <div className="column-small">
                        <div className="small-area">
                            <img src="/images/upload.png" />
                        </div>
                    </div>
                    <div className="column-big">
                        <div className="big-area">
                            <img src="/images/upload.png" />
                        </div>
                    </div>
                </div> */}
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


export default connect(mapstatetoprops, mapDispatchToProps) (ProjectName)