import React from 'react';
import phone from '../../assets/images/part7_phone.png';
import icon from '../../assets/images/part7_icon.svg';
import app from '../../assets/images/part7_app.png';
import google from '../../assets/images/part7_google.png';
import ErrorState from '../staffSignUp/components/errorState';


class Part7 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNumber: '',
            error: 'none'
        }
    }

    numberInput = (e) => {
        // Prevent characters that are not numbers ("e", ".", "+" & "-") âœ¨
        let checkNum;
        if (e.key !== undefined) {
          // Check if it's a "e", ".", "+" or "-"
          checkNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-" ;
        }
        else if (e.keyCode !== undefined) {
          // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
          checkNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
        }
        return checkNum && e.preventDefault();
      }

    setPhoneNumber = (e) => {
        if(e.target.value.length < 11){
            this.setState ({
                phoneNumber: e.target.value,
                error: 'none'
            })
        }
    }

    getApp = () => {
        if(this.state.phoneNumber.length < 10){
            this.setState ({
                error: 'block'
            })
        } else {
            alert('Get the app. Phone number is ' + this.state.phoneNumber);
        }
    }

    render() {
        return (
            <div className="landing_outer_container">
                <div className="outer_container">
                    <div className="row main_container" style={{paddingTop: 'min(100px, 7.25vw)'}}>
                        <div className="col-md-8 col-sm-12">
                            <div className="part7_title">Thousands of Healthcare Professionals and Jobs in One App</div>
                            <div className="part7_txt_1">The LinkHealthStaff app is the quickest, easiest<br/>way to find healthcare professionals and jobs.</div>
                            <div className="part7_txt_1 part7_txt_2">Enter your phone number and we’ll send you a download link.</div>
                            <div className="part7_input_group">
                                <div className="part7_input_phone"><img src={icon} width="100%" alt="icon"/></div>
                                <input className="part7_input" placeholder="Phone Number" type="number" value={this.state.phoneNumber} onKeyDown={ this.numberInput } onChange={this.setPhoneNumber}/>
                                <button className="part7_btn" onClick={this.getApp}>GET THE APP</button>
                            </div>
                            
                                <ErrorState show={this.state.error} name="Please enter 10 digits phone number."/>
                            
                            <div className="part7_image">
                                <a href="https://www.apple.com/store" target="_blank" rel="noopener noreferrer" src={app} className="part7_img_btn">{""}</a>
                                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" src={google} className="part7_img_btn">{''}</a>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12"> <img src={phone} alt="phone" className="part7_phone"/></div>
                    </div>            
                </div>
            </div>
        );
    }
}

export default Part7;
