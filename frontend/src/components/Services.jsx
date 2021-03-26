import React from "react";
import "../css/services.css"
import "../App.css"
import Header from "./Header";
import "../css/header.css"
import Footer from "./Footer";
import "../css/footer.css"
import {Link} from "react-router-dom";
import { lang } from "../lang"
import {connect} from "react-redux"
import {changeData} from "../store/languages/action"
import AdminService from "../services/AdminService";
import swal from 'sweetalert';





class Services extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            servicesInfo: [],
            showStore: false,
            description: "",
           
                name: "",
                title: "",
            
            info: {
                name: "",
                title: "",
            },
            changeInp:{
                name: {
                    id: ""
                },
                title: {
                    id: ""
                }
            },
           showInfo_en: [],
           showInfo_hy: [],
            errors: {}
        }
    }
    componentDidMount(){
       AdminService.getServicesDesc().then(r =>{
        const arr = r.data
        arr.forEach(elem=>{
            if(elem.name === 'description'){
                if(this.props.langData.langId == 1){
                    this.state.description = elem.info_hy           
                   this.setState({})
                   return                 
                }
                this.state.description = elem.info_en
                this.setState({})               
            }
        })               
       })
       AdminService.showInfo().then((r) => {
        let english = []
        let armenian = []
        r.data.forEach(elem=> {
            if(elem.name_hy){
                armenian = [...armenian,{id: elem.id,name_hy:elem.name_hy,title_hy:elem.title_hy}]
                return
            }
            english = [...english,{id: elem.id,name_en:elem.name_en, title_en:elem.title_en}]
        })
        this.state.showInfo_en = english
        this.state.showInfo_hy = armenian
        this.setState({})
      })  

    }
    handelChangeLang = (id) =>{
        this.props.changeData(id)
        this.componentDidMount()
        
    }
    showEditInp(){
        if(this.state.showStore === false){
            this.state.showStore = true;
        }
        else{
            this.state.showStore = false;
        }
        this.setState({})

    }
    change(e){
        let k = e.target.getAttribute('data-id')
        this.state[k] = e.target.value
        this.setState({})
    }

    changeInfo(e){
        this.state.info[e.target.getAttribute("data-id")] = e.target.value;
        this.setState({})
    }

   
    editText(){
       AdminService.addServicesDesc(this.state.description, this.props.langData.langId, "description") 
       .then(r => {
           swal("Good job!", "You checked Your Service Info!", "success")
           window.location.reload()
       })
       .catch((err => console.log(err)))
    }
    
    deleteInfo(id){
        AdminService.deleteServicesInfo(id).then((r) =>{
            this.state.showInfo_hy.filter(x => {
                if(x.id == id){
                    id = r.data
                }
                this.componentDidMount()
            })
            this.state.showInfo_en.filter(x => {
                if(x.id == id){
                    id = r.data
                }
                this.componentDidMount()
            })
            this.setState({})
        })
    
    }


    addServiceInfo(){
        AdminService.addInfo(this.state.info, this.props.langData.langId)
        .then((r) => {
            console.log(r.data)
                swal("Good job!", "You clicked the button!", "success")
                this.state.info.name = ""
                this.state.info.title = ""
                this.componentDidMount()
                this.setState({})
            })
            .catch((err) => console.log(err))
    }

    render(){
        return(
            <div className="services">
                <Header handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
            <div className="services-title">    
                <button onClick = {this.showEditInp.bind(this)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Services Info</button>      
                <input data-id = 'description' style={{display:  this.state.showStore === true ? 'flex' : 'none' }} onChange= {this.change.bind(this)} value = {this.state.description} type="text" name="description" placeholder="Enter your text" />
                <button style={{display:  this.state.showStore === true ? 'flex' : 'none' }} onClick = {this.editText.bind(this)}>Edit</button>
                <h1 className="title-head">{lang[this.props.langData.langId].titleOne}</h1>
                <h1 className="title-par">{this.state.description}</h1>
            </div>
           
                <br/><br/><br/>
                <button>Add new Service</button>
                <div className = "editInp">
                    Name: <input className = "eInp" type="text" name="name" value = {this.state.info.name} data-id="name" onChange = {this.changeInfo.bind(this)}/>
                    Title: <input className = "eInp" type="text" name="title" value = {this.state.info.title} data-id="title" onChange = {this.changeInfo.bind(this)}/>
                    <button className = "submit" onClick = {this.addServiceInfo.bind(this)}>Add</button>
                </div>
         <div className="services-main">
            {
                this.props.langData.langId == 2 ? 
                <>
                    {this.state.showInfo_en.map(a=>(
                        <div key = {a.id} className="service-line">
                        <div className="s-card card">
                            <button className = "btn-danger" onClick = {this.deleteInfo.bind(this, a.id)}><i className ="fa fa-trash-o" aria-hidden="true"></i></button>
                            
                            <h1>{a.name_en}</h1>
                            <h1>{a.title_en}</h1>
                            <button className="btn-services"><Link to ={ `/services/outdoor/${a.id}`} className = "special-item">LEARN MORE</Link></button>
                        </div>
                    </div>
                    ))}
                </>:
                <>
                {this.state.showInfo_hy.map(a=>(
                        <div key = {a.id} className="service-line">
                        <div className="s-card card">
                            <button className = "btn-danger" onClick = {this.deleteInfo.bind(this, a.id)}><i className ="fa fa-trash-o" aria-hidden="true"></i></button>
                            
                            <h1>{a.name_hy}</h1>
                            <h1>{a.title_hy}</h1>
                            
                            <button className="btn-services"><Link to ={ `/services/outdoor/${a.id}`} className = "special-item">LEARN MORE</Link></button>
                        </div>
                    </div>
                    ))}
                </>
            }
            </div>
            <Footer />
        </div>
        )
    }
    
}
function mapstatetoprops(state){
    return{
        langData: state.langReducer,
        userData: state.profileReducer

    }
}
const mapDispatchToProps = {
     changeData,

}

export default connect(mapstatetoprops, mapDispatchToProps)(Services)


