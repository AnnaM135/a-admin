import React from "react";
import "../css/header.css"
import { flags } from "./flag/data";
import classnames from "classnames";
import "../App.css"
import "../css/services.css"
import { Link} from "react-router-dom";





class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            showStore: false,
        }
    }
    componentDidMount() {
        this.setState({
            active: flags[0].id,
        })
    }
    handelClick = (event) => {
        this.setState((prevState) => ({
            showList: !prevState.showList,
        }))
    }

    handelClickFlag = (event) => {
      const {id} = event.target.dataset;
      if(this.props.langId !== id){
        this.props.handelChangeLang(id)
        this.setState({
            showList: false,
        })
      }
    }
    showMenu(){
        if(this.state.showStore === false){
            this.state.showStore = true;
        }
        else{
            this.state.showStore = false;
        }
        this.setState({})
    }

    render(){
        const cnUl = classnames({ "activePage": true, "not-active": this.state.showList, })
        const currentFlag = flags.find((flag) => flag.id === this.props.langId)
        if (!currentFlag) {
            return null
        }
        return(
            <div className = "header-fixed">
            <div className="services-header">
                <div className="services-logo">
                    <img src="/images/group.png" />
                </div>
                <div className="services-menu" onClick = {this.showMenu.bind(this)}>
                    <div className="menu-img dropdown">
                        <img src="/images/menu-img.png"/>
                        <div className="dropdown-content" style={{display:  this.state.showStore === true ? 'flex' : 'none' }}>
                        <nav className="header-nav">
                            <ul className="header-list">
                                <li className="header-items">
                                    <Link to = "/services" className="home-link"><a className="home-link">SERVICES</a></Link>
                                </li>
                                <li className="header-items">
                                    <Link to = "/home/gallery" className="home-link"><a className="home-link">GALLERY</a></Link>
                                </li>
                                <li className="header-items">
                                    <Link to = "/contact" className="home-link"><a className="home-link">CONTACTS</a></Link>
                                </li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                {/* <button onClick>{currentFlag.name}</button> */}
                        {
                            flags.map((flag) => {
                                return(
                                //  <div className="lang"> 
                                //     <p key = {flag.id}  className="lang-arm" className = {cnUl} onClick = {this.handelClick}>
                                //         <p data-id = {flag.id} onClick = {this.handelClickFlag}> 
                                //             {flag.name}
                                //         </p>
                                //     </p>
                                //  </div>  
                                <div className="lang"  key = {flag.id}   onClick = {this.handelClick}> 
                                    <p className="lang-arm" data-id = {flag.id} onClick = {this.handelClickFlag}> 
                                        {flag.name}
                                    </p>
                                </div> 
                                )
                            })
                        }                 
                </div>
            </div>
            </div>
        )
    }
}

export default Header