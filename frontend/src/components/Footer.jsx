import React from "react";
import "../css/footer.css"


class Footer extends React.Component{
  
    render(){
        return(
            <div className="services-footer">
            <div className="services-icon">
                <div className="service-line-two">		
                    <div className="s-icon icon-area">
                        <i className="fa fa-facebook" aria-hidden="true"></i>			
                    </div>
                    <div className="s-par icon-area">
                        S DESIGN STUDIO						
                    </div>
                </div>
                <div className="service-line-two">
                    <div className="s-icon icon-area">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="s-par icon-area">
                        011 700 992
                    </div>
                </div>
                <div className="service-line-two">
                    <div className="s-icon icon-area">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </div>
                    <div className="s-par icon-area">
                        ssdesignyerevangmail.com
                    </div>
                </div>
                <div className="service-line-two">
                    <div className="s-icon icon-area">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </div>
                    <div className="s-par icon-area">
                        GULBENKYAN 31.3
                    </div>
                </div>
                <div className="end">
                    <div className="hr"></div>
                    <div className="rights">© 2021 Sdesign. All Rights Reserved.</div>
                </div>

            </div>	
        </div>	
        )
    }
}

export default Footer