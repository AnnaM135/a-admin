import React, { Component } from 'react'
import {connect} from 'react-redux'
import changeUserData from "../store/profile/action"
import { Link} from "react-router-dom";
import "../App.css"


class Home extends Component {
    // componentDidMount(){
    //     // console.log(this.props.data)
    //     if(Object.keys(this.props.data.user).length == 0){
    //         this.props.history.push('/login')
    //     }
    // }
    out(){
        this.props.changeUserData('logout')
        this.props.history.push('/login')
    }
    render() {
        return (
                    <div className="home_page">
                    <div className="wrapper">
                    <div className="bg-white">
                    <div className="home-logo white-area">					
                        <img src="/images/group.png" className="logo-img" />
                    </div>
                    <div className="home-menu white-area">
                         <nav className="home-nav">
                            <ul className="home-list">
                                <li className="home-items">
                                    <Link to = "/services" className="home-link"><a className="home-link">SERVICES</a></Link>
                                </li>
                                <li className="home-items">
                                    <Link to = "/home/gallery" className="home-link"><a className="home-link">GALLERY</a></Link>
                                </li>
                                <li className="home-items">
                                    <Link to = "/contact" className="home-link"><a className="home-link">CONTACTS</a></Link>
                                </li>
                                <li>
                                <button style={{marginLeft: '20px'}} onClick={this.out.bind(this)} className='btn-primary'>Logout</button>
                                </li>
                            </ul>
                        </nav>	
                        
                    </div>
                    
                    <div className="home-info white-area">
                        <div className="img-menu white-area">
                            <img src="/images/menu-img.png" className="menu-img" />
                        </div>
                         <div className="home-icons">
                            <div className="face-icon so">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </div>
                            <div className="phone-icon so">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                            </div>
                            <div className="email-icon so">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </div>
                            <div className="home-lang so">
                                <h2 className="lang-arm activeLang">ARM</h2>
                                <h2 className="lang-eng">ENG</h2>
                            </div>
                        </div> 
                        
                    </div>
                </div>
                <div className="bg-black">
                    <div className="media">
                        <div className="title">
                            <h1>Design <br /> Studio</h1>
                        </div>
                        <div className="home-btn">
                            <button className="btn-portfolio"><Link to = "/gallery" className="special-item">VIEW PORTFOLIO</Link></button>
                        </div>
                    </div>
                </div>
            </div>
       
        </div>
        )
    }
}

function mapstatetoprops(state) {
    return{
        data: state.profileReducer
    }
}

function mapdispatchtoprops(){
    return {
        changeUserData
    }
}
export default connect(mapstatetoprops, mapdispatchtoprops())(Home)
