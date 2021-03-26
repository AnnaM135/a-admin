import React from "react";
import "../App.css"
import Header from "./Header";
import "../css/header.css"
import Footer from "./Footer";
import "../css/footer.css"
import "../css/outdoor.css"
import { lang } from "../lang"
import {changeData} from "../store/languages/action"
import {connect} from "react-redux"
import AdminService from "../services/AdminService";



class Outdoor extends React.Component{
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
              images: ['slide6.jpg', 'slide2.jpg', 'slide5.jpg', 'slide4.jfif'],
			
			index: 0
        }
    }
    componentDidMount(){
        AdminService.showServicesItem(this.props.match.params.id)
        .then((r) => {
            console.log(r.data)
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
       AdminService.addNewService(formData).then((r) => console.log(r.data))
    }
    render(){
        return(
            <div class="outdoor">
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
                <div class="outdoor-name">
                    <h1 class="project-title-head">Outdoor advertising</h1>
                    <h1 class="project-title-par">
                        The company “Sdesign” operates in the sphere of outdoor advertising making (decorating the facades, making light boxes), interior design of commercial objects (installation of the advertising wall carriers: acrylic glass, foam boards, interior light boxes
                    </h1>
                </div>
                <div class="outdoor-main">
                    <div class="outdoor-slide">
                    <img src="/images/slide6.jpg" class="services-slide" />
                        {/* <div class="slide">
                        <img src="/images/slide6.jpg" class="services-slide" />

                        </div> */}
                    </div>
                    {/* <div class="slide-radio">
                        <input type="radio" />
                        <input type="radio" />
                        <input type="radio" />
                        <input type="radio" />
                    </div> */}
                        {/* <label class="custom-radio-btn">
  <input type="radio" name="sample" checked>
  <span class="checkmark"></span>
</label>
<label class="custom-radio-btn">
  <input type="radio" name="sample">
  <span class="checkmark"></span>
</label> */}
                </div>
                <div class="outdoor-main-two">
                    <h1 class="outdoor-title-head">Digital Printing</h1>
                    <h1 class="outdoor-title-head">Large Format printing</h1>
                    <h1 class="outdoor-title-head">CNC Engraveing</h1>
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


export default connect(mapstatetoprops, mapDispatchToProps)(Outdoor)