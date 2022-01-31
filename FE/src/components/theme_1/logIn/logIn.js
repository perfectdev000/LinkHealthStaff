import React from 'react';
import { connect } from 'react-redux';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import key from '../../assets/images/key.svg';
import email from "../../assets/images/email.svg";
import ErrorState from "../staffSignUp/components/errorState";
import logo from "../../assets/images/loginLogo.png";
import { callApi, setSession } from '../../../action';
import './logIn.css';
import { SET_CUR_POS, SET_AUTH, SET_HP_PROFILE } from '../../../constants/actionTypes';
import $ from 'jquery';


const mapStateToProps = state => {
  return {
    email: state.logIn.email,
  }
};

const mapDispatchToProps = dispatch => ({
  setCurPos: (data) => dispatch({ type: SET_CUR_POS, data }),
  setHospitalProfile: (data) => dispatch({ type: SET_HP_PROFILE, data }),
  setAuth: (data) => dispatch({ type: SET_AUTH, data })
});

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        email: 'none',
        password: 'none'
      },
      pswErr: 'Password is required.',
      emailErr: 'Email address is required.'
    }
  }

  componentWillMount = () => {
    this.props.setCurPos('logIn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setEmail = (e) => {
    this.setState({ email: e.target.value, emailErr: 'Valid email address is required.' });

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(String(e.target.value).toLowerCase());
    if (e.target.value !== '' && valid) {
      var error = this.state.error;
      error.email = 'none';
      this.setState({ error: error });
    } else if (e.target.value === '') {
      error = this.state.error;
      error.email = 'none';
      this.setState({ error: error });
    } else {
      error = this.state.error;
      error.email = 'block';
      this.setState({ error: error });
    }
  }

  setPassword = (e) => {
    this.setState({ password: e.target.value });
    var error = this.state.error;
    error.password = 'none';
    this.setState({ error: error });
  }

  togglePassword = (id) => {
    let input = $("#" + id);
    if (input.attr("type") === "password") {
      input.attr("type", "text");
      $("#c_" + id).hide();
      $("#o_" + id).show();
    } else {
      input.attr("type", "password");
      $("#o_" + id).hide();
      $("#c_" + id).show();
    }
  }

  logIn = async () => {
    var state = this.state;
    var emailError = state.error.email === 'block' || state.email === '' ? 'block' : 'none';
    var passwordError = state.error.password === 'block' || state.password === '' ? 'block' : 'none';

    var error = {
      email: emailError,
      password: passwordError
    };
    this.setState({ error: { ...error } });

    if (emailError === 'none' && passwordError === 'none') {
      var data = {
        email: this.state.email
      };
      var res1 = await callApi("POST", "/v1/LHS/hospital/emailCheck", null, data);
      var res2 = await callApi("POST", "/v1/LHS/staff/emailCheck", null, data);
      var res3 = await callApi("POST", "/v1/LHS/admin/emailCheck", null, data);

      data = {
        email: this.state.email,
        password: this.state.password
      }

      if (res1.result === 'OK' && res2.result === 'OK' && res3.result === "OK") {
        this.setState({
          emailErr: "This email hasn't got an account.",
          error: {
            email: 'block',
            password: 'none'
          }
        });
      } else if (res1.result === 'REPEAT' && res2.result === "OK") {
        res1 = await callApi("POST", "/v1/LHS/hospital/login", null, data);
        if (res1.Message !== "Password Error") {
          setSession(res1.token, res1.data._id, 'hospital');
          this.props.history.push('/main/hospital');
        } else {
          this.setState({
            pswErr: 'You used wrong password',
            error: {
              email: 'none',
              password: 'block'
            }
          });
        }
      } else if (res1.result === 'OK' && res2.result === 'REPEAT') {
        res1 = await callApi("POST", "/v1/LHS/staff/login", null, data);
        console.log(res1);
        if (res1.Message !== "Password Error") {
          setSession(res1.token, res1.data._id, 'staff');
          this.props.history.push('/main/staff');
        } else {
          this.setState({
            pswErr: 'You used wrong password',
            error: {
              email: 'none',
              password: 'block'
            }
          });
        }
      } else if (res3.result === 'REPEAT'){
        res1 = await callApi("POST", "/v1/LHS/admin/login", null, data);
        console.log(res1);
        if (res1.Message !== "Password Error") {
          var type =  res1.data.permissions[0] === 'superadmin' ? 'superadmin' : 'admin';
          setSession(res1.token, res1.data._id, type);
          this.props.history.push('/main/admin');
        } else {
          this.setState({
            pswErr: 'You used wrong password',
            error: {
              email: 'none',
              password: 'block'
            }
          });
        }
      }
    }
  }

  toSignUp = () => {
    this.props.history.push('/signUp');
    this.props.setCurPos('signUp');
  }

  render() {
    return (
      <div className="outer_container" style={{ backgroundColor: '#009CDE' }}>
        <div className="main_container" style={{ padding: '40px 0px 120px', maxWidth: 720 }}>
          <div className="ssu_container" style={{ paddingBottom: '60px' }}>
            <p style={{ textAlign: 'center', marginTop: 70 }}><img alt="img" src={logo} className="logInLogo" /></p>
            <div className="logIn_txt1"> Log in </div>
            <div className="logIn_txt2"> Welcome to LinkHealthStaff </div>
            <div className="logIn_body">
              <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                <div className="input_left_icon">
                  <img width="18px" height="15px" alt="img" src={email} />
                </div>
                <input className="ssu2_modal3_select" placeholder="Email Address" type="text" value={this.state.email} onChange={this.setEmail}
                  onKeyUp={(e) => { if (e.key === 'Enter') this.logIn() }} />
              </div>
              <ErrorState show={this.state.error.email} name={this.state.emailErr} />
              <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                <div className="input_left_icon">
                  <img width="18px" height="15px" alt="img" src={key} />
                </div>
                <input id="psw" className="ssu3_password" placeholder="Password" type="password" value={this.state.password} onChange={this.setPassword}
                  onKeyUp={(e) => { if (e.key === 'Enter') this.logIn() }} />
                <div className="ssu3_eye" onMouseDown={() => this.togglePassword('psw')} onMouseUp={() => this.togglePassword('psw')}
                  onTouchStart={() => this.togglePassword('psw')} onTouchEnd={() => this.togglePassword('psw')}>
                  <VisibilityOffIcon id="c_psw" style={{ display: 'block' }} />
                  <VisibilityIcon id="o_psw" style={{ display: 'none' }} />
                </div>
              </div>
              <ErrorState show={this.state.error.password} name={this.state.pswErr} />
              <p className="login_letterBtn" onClick={() => this.props.history.push('/forgotPassword')}> Forgot your password? </p>
              <div className="logIn_button" onClick={this.logIn}>LOGIN</div>
              <p className="login_txt3"> Don't have an account? </p>
              <div className="logIn_button signUp_button" onClick={this.toSignUp}>SIGN UP</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
