import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import ErrorState from "../staffSignUp/components/errorState";
import logo from "../../assets/images/loginLogo.png";
import email from "../../assets/images/email.svg";
import OR from "../../assets/images/login_OR.png";
import facebook from "../../assets/images/facebook.svg";
import google from "../../assets/images/google.svg";
import { callApi } from '../../../action';
import $ from 'jquery';
import './logIn.css';
import { SET_EMAIL } from '../../constants/actionTypes';


const mapStateToProps = state => {
  return {
      email: state.logIn.email
  }};

const mapDispatchToProps = dispatch => ({
  setSelectedEmail: (data) => dispatch({ type: SET_EMAIL, data})
});

class LogInOrSignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        error: 'none',
        errorContent: ''
    }
  }
  
  componentWillMount = () => {
    this.setState({email: this.props.email});
  }

  setEmail = (e) => {
    this.setState({email: e.target.value, errorContent: 'Valid email address is required.'});
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(String(e.target.value).toLowerCase());
    if(e.target.value !== '' && valid){
        this.setState({error: 'none'});
    } else if(e.target.value === '')
        this.setState({error: 'none'});
    else {
        this.setState({error: 'block'});
    }
}

  continueToNext = async () => {
      var data = {
            email: this.state.email
            }
      if( this.state.error === 'none' && this.state.email !== "" ){
        var resData = await callApi('/users/emailCheck', null, data);
        if(resData.result === 'REPEAT'){
            this.props.setSelectedEmail(this.state.email);
            this.props.history.push("/logIn");
        } else if (resData.result === 'OK'){
            this.setState({errorContent: "This Email hasn't got an account."});
            this.setState({error: 'block'});
        } 
      }    
  }

  continueWithGoogle = () => {
   console.log($('#googlebtn button').click());
  }

  handleGoogleLoginSuccess = async googleData => {
    console.log(googleData.tokenId);
    // const res = await fetch("/users/logInWithGoogle", {
    //     method: "POST",
    //     body: JSON.stringify({
    //     token: googleData.tokenId
    //   }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    // // const data = await res.json();
    // // alert(data);
    // alert(res);
    // console.log(res);

    var data = {
      tokenId: googleData.tokenId
    }
    var resData = await callApi("/users/logInWithGoogle", null, data);
    alert(resData.email);
  }

  handleGoogleLoginFailure = (error) => {
    console.log(error);
  }



  render() {
    return (
      <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
        <div className="main_container" style={{padding: '40px 0px 120px', maxWidth:720}}>
          <div className="ssu_container" style={{paddingBottom: '60px'}}>
            <p style={{textAlign: 'center', marginTop: 70}}><img src={logo} className="logInLogo"/></p>
            <div className="logIn_txt1"> Log in or sign up </div>
            <div className="logIn_txt2"> Welcome to LinkHealthStaff </div>
            <div className="logIn_body">
                <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                    <div className="input_left_icon">
                        <img width="18px" height="15px" alt="img"src={email} />
                    </div>
                    <input className="ssu2_modal3_select" placeholder="Email Address" type="text" value={this.state.email} onChange={this.setEmail}/>
                </div>
                <ErrorState show={this.state.error} name={this.state.errorContent} />  
                <div className="logIn_button" onClick={this.continueToNext}>CONTINUE</div>
                <p style={{margin: '45px 0px 0px'}}> <img src={OR} style={{width: '100%', height: 'auto'}}/></p> 
                <div className="link_button" onClick={this.continueWithFacebook}>
                    <span style={{marginRight: '12px'}}>
                        <img src={facebook} width="20px" height="20px" />
                    </span>
                    CONTINUE WITH FACEBOOK
                </div>    
                <div id="gSignIn" className="link_button" onClick={this.continueWithGoogle}>
                    <span style={{marginRight: '12px'}}>
                        <img src={google} width="20px" height="20px" />
                    </span>
                    CONTINUE WITH GOOGLE
                </div>
                <div id="googlebtn" style={{display: 'none'}}>
                  <GoogleLogin
                      clientId="624119919154-6l0tjd1tklbch853bibkl4rldhhedodq.apps.googleusercontent.com"
                      buttonText="Log in with Google"
                      onSuccess={this.handleGoogleLoginSuccess}
                      onFailure={this.handleGoogleLoginFailure}
                      cookiePolicy={'single_host_origin'}
                  />
                </div>   
            </div>            
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInOrSignUp);
