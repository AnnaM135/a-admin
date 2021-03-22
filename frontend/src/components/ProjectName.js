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
                project_name: "",
                project_title: "",
                photo_url: "",
              },
        }
    }
    componentDidMount(){
        GalleryService.showProjectItem(this.props.match.params.id)
        .then((r) => {
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
    // add(id){
    //     let formData = new FormData()
    //     formData.append("project_name", this.state.inp.project_name)
    //     formData.append("project_title", this.state.inp.project_title)
    //     for(let i of Object.keys(this.state.inp.photo_url)){
    //         formData.append("photo_url", this.state.inp.photo_url[i])
    //     }
    //    // GalleryService.addNewProject(formData).then((r) => console.log(r))
    // }

    render(){
        return(
            <div className="project">
                <Header handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
                <h1>Add Project</h1>
                    <div>
                    Project Name:
                    <input type="text" data-id="project_name" value={this.state.inp.project_name} onChange={this.change.bind(this)} />
                    Project Title:
                    <input type="text" data-id="project_title" value={this.state.inp.project_title} onChange={this.change.bind(this)} />
                    Photos: <input type="file" multiple data-id = "photo_url" onChange={this.change.bind(this)}/>
                    <button onClick = {this.add.bind(this, this.state.inp.id)}>Add</button>
                    </div>
                <div className="project-name">
                
                    <h1 className="project-title-head">{this.state.data.project_name} {lang[this.props.langData.langId].titleOne}</h1> 
                    <h1 className="project-title-par">
                        The company “Sdesign” operates in the sphere of outdoor advertising making (decorating the facades, making light boxes), interior design of commercial objects (installation of the advertising wall carriers: acrylic glass, foam boards, interior light boxes
                    </h1>
                </div>
                <div className="project-main">
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


export default connect(mapstatetoprops, mapDispatchToProps) (ProjectName)