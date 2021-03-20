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





class Services extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            showStore: false,
            description: "",
        }
    }
    componentDidMount(){
       AdminService.getServicesDesc().then((r) =>{
           if(r.data.id){
               this.state.data = r.data
               this.setState({})
           }
           else{
               this.props.history.push("/login", "Please login")
           }
       })
    }
    handelChangeLang = (id) =>{
        this.props.changeData(id)
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
    editText(){
        console.log(this.state.description)
       AdminService.addServicesDesc(this.state.description) 
       .then(r => {
           console.log(r)
       })
       .catch((err => console.log(err)))
    }

    render(){
        return(
            <div className="services">
                <Header handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
            <div className="services-title">    
                <button onClick = {this.showEditInp.bind(this)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i>ok</button>      
                <input data-id = 'description' style={{display:  this.state.showStore === true ? 'flex' : 'none' }} onChange= {this.change.bind(this)} value = {this.state.description} type="text" name="description" placeholder="Enter your text" />
                <button style={{display:  this.state.showStore === true ? 'flex' : 'none' }} onClick = {this.editText.bind(this)}>Edit</button>
                <h1 className="title-head">{lang[this.props.langData.langId].titleOne}</h1>
                <h1 className="title-par">{lang[this.props.langData.langId].paragraph}</h1>
            </div>
            <div className="services-main">

                <div className="service-line">
                    <div className="main-one s-card">
                        <h1>Outdoor advertising</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button className="btn-services"><Link to = "/services/outdoor" className = "special-item">LEARN MORE</Link></button>
                    </div>
                    <div className="main-two s-card">
                        <h1>Digital Printing</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button className="btn-services"><a href="outdoor.html" className = "special-item">LEARN MORE</a></button>
                    </div>
                </div>
                    <div className="service-line">
                        <div className="main-three s-card">
                            <h1>Large Format printing</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <button className="btn-services"><a href="outdoor.html" className = "special-item">LEARN MORE</a></button>
                        </div>
                        <div className="main-four s-card">
                            <h1>CNC Engraveing</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <button className="btn-services"><a href="outdoor.html" className = "special-item">LEARN MORE</a></button>
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
        langData: state.langReducer,
        userData: state.profileReducer

    }
}
const mapDispatchToProps = {
     changeData,

}

export default connect(mapstatetoprops, mapDispatchToProps)(Services)
