import React, { Component } from 'react'
import {connect} from 'react-redux'
import changeData from "../store/login/action"
import changeUserData from "../store/profile/action"
import "../css/login.css";
 import AuthService from '../services/AuthService'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             errors: {}
        }
    }
    
    save(){
        let user= this.props.userData
        AuthService.login(user).then((r) =>{
            if(!r.data.id) {
                this.state.errors = {}
                r.data.forEach((item) => {
                  this.state.errors[item.param] = item.msg
                })
                this.setState({})
              }
              else{
                this.state.errors = {}
                user.email = ""
                user.password = ""
                this.setState({})
                if(r.data.accessToken) {
                  localStorage.setItem("user", JSON.stringify(r.data))
                }
                this.props.changeUserData('changeData', r.data[0])
                    this.props.history.push("/home", r.data[0])
              }
        })
      
   
    }
  
    change(e){
        this.props.changeData(e.target.getAttribute('data-id'), e.target.value)
    }
    render() {
        return (
                <div className="login">
                        <div className="login-center">
                        <h1 style={{color: 'red', textAlign: 'center'}}>{this.props.location.state}</h1>

                            <h1>Login</h1>
                            {this.props.location.state ? (
                      <h3 className = "success">{this.props.location.state}</h3>
                    ) : null}
                            <h5>Please login to proceed</h5>
                            <hr />
                            <div className="login-form-group">
                                <div className="email-input">
                                    <label htmlFor="email">Email</label>
                                <input data-id = 'enterEmail' onChange= {this.change.bind(this)} value = {this.props.userData.email} type="email" name="email" placeholder="Enter your email" />
                                {this.state.errors.email ? ( <div className="errors">{this.state.errors.email}</div>) : null}
                                </div>
                                
                                <label htmlFor="password">Password</label>
                                <input data-id = 'enterPassword' onChange= {this.change.bind(this)} value = {this.props.userData.password} type="password" name="password" placeholder="Enter you password" />
                                {this.state.errors.password ? ( <div className="errors">{this.state.errors.password}</div> ) : null}
                                <button onClick={this.save.bind(this)} className="login-btn">Login</button>
                            </div>
                        </div>
                    </div>
                
        )
    }
}

function mapstatetoprops(state) {
    return{
        userData: state.loginReducer 
    }
}

function mapdispatchtoprops(){
    return {
        changeData,
        changeUserData
    }
}

export default connect(mapstatetoprops, mapdispatchtoprops())(Login)
