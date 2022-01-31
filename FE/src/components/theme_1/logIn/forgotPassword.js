import React from 'react';
import { connect } from 'react-redux';
import ErrorState from "../staffSignUp/components/errorState";
import logo from "../../assets/images/loginLogo.png";
import email from "../../assets/images/email.svg";
import './logIn.css';


const mapStateToProps = state => {
  return {
  }};

const mapDispatchToProps = dispatch => ({
});

class LogIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      error: 'none'
    }
  }
  
  setEmail = (e) => {
    this.setState({email: e.target.value, emailErr: 'Valid email address is required.'});
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(String(e.target.value).toLowerCase());
    if(e.target.value !== '' && valid){
      this.setState({error: 'none'});
    } else if(e.target.value === ''){
      this.setState({error: 'none'});
    } else {
      this.setState({error: 'block'});
    }
  }

  continueToNext = () => { 
      if( this.state.email === ''){
        this.setState({error: 'block'});
      } else if(this.state.error !== 'block'){
        alert('Password reset link sent to : ' + this.state.email + '.');
      }
  }

  render() {
    return (
      <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
        <div className="main_container" style={{padding: '40px 0px 120px', maxWidth:720}}>
          <div className="ssu_container" style={{paddingBottom: '60px'}}>
            <p style={{textAlign: 'center', marginTop: 70}}><img src={logo} alt="img" className="logInLogo"/></p>
            <div className="logIn_txt1"> Forgot Password? </div>
            <div className="logIn_txt2 forgotPassword_txt2"> 
              Enter the email address associated with your account,
              and we’ll email you a link to reset your password. 
            </div>
            <div className="logIn_body">
            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                <div className="input_left_icon">
                      <img width="18px" height="15px" alt="img"src={email} />
                  </div>
                  <input className="ssu2_modal3_select" placeholder="Email Address" type="text" value={this.state.email} onChange={this.setEmail}
                        onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                </div>
                <ErrorState show={this.state.error} name='Valid email address is required.' /> 
                <div className="logIn_button" onClick={this.continueToNext}> SEND RESET LINK </div>
                <div className="logIn_button signUp_button" onClick={()=>this.props.history.push('/logIn')}>LOGIN</div>
            </div>          
        </div>            
        </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
