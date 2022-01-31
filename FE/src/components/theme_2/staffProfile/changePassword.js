import React from 'react';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ErrorState from "../../theme_1/staffSignUp/components/errorState";
import key from '../../assets/images/key.svg';
import { history } from '../../../store';
import $ from 'jquery';
import { removeSession } from '../../../action';

class ChangePassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            psw: '',
            repsw: '',
            error: {
                psw: 'none',
                repsw: 'none'
            },
            pswErr: 'Password is required',
        }
    }

    componentWillMount = () => {
        this.props.setCurPos('changePassword');
    }
    
    componentDidMount = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    
    togglePsw = (id) => {        
        let val = $("#"+id);
        if (val.attr("type") === "password") {
            val.attr("type", "text");
            $("#c_" + id).hide();
            $("#o_" + id).show();
        } else {
            val.attr("type", "password");
            $("#o_" + id).hide();
            $("#c_" + id).show();
        }
    }

    setPassword = (e) => {
        this.setState({psw: e.target.value});
        var password = e.target.value;   
        var error = this.state.error;
        // Do not show anything when the length of password is zero.
        if (password.length === 0) {
            this.setState({pswErr: 'Password is required.'});
            error.psw = 'block';
            this.setState({error: error});
            return;
        } else {
            if (password.length < 6) {
                this.setState({pswErr: 'Password should have minimum 6 characters, 1 upper case,  1 lower case, 1 special character and 1 number.'});
                error.psw = 'block';
                this.setState({error: error});
            } else {
                // Create an array and push all possible values that you want in password
                var mached = [];
                mached.push("[$@$!%*#?&]"); // Special Charector
                mached.push("[A-Z]");      // Uppercase Alpabates
                mached.push("[0-9]");      // Numbers
                mached.push("[a-z]");     // Lowercase Alphabates

                // Check the conditions
                var ctr = 0;
                for (var i = 0; i < mached.length; i++) {
                    if (new RegExp(mached[i]).test(password)) {
                        ctr++;
                    }
                }
                // Display it
                switch (ctr) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        this.setState({pswErr: 'Password should have minimum 6 characters, 1 upper case,  1 lower case, 1 special character and 1 number.'});
                        error.psw = 'block';
                        this.setState({error: error});
                        break;
                    case 4:
                        error.psw = 'none';
                        this.setState({error: error});
                        break;
                    default:
                        return;
                }
            }            
            if(this.state.repsw !== ""){
                var val = this.state.repsw === e.target.value;
                error = this.state.error;
                if(val){
                    error.repsw = 'none';
                    this.setState({error: error});
                } else {
                    error.repsw = 'block';
                    this.setState({error: error});
                }
            }
        }
    }

    setConfirmPsw = (e) => {
        var validate = this.state.psw === e.target.value;
        this.setState({repsw: e.target.value});
        var error = this.state.error;
        if(e.target.value !== '' && validate){
            error.repsw = 'none';
            this.setState({error: error});
        } else if(e.target.value === "" && this.state.psw === "") {
            error.repsw = 'none';
            this.setState({error: error});
        } else {
            error.repsw = 'block';
            this.setState({error: error});
        }
    }

    savePassword = async () => {
        var psw = this.state.psw === '' ? 'block' : 'none';
        var repsw = this.state.repsw === '' ? 'block' : 'none';
        if(psw === '') {
            this.setState({pswErr: 'Password is required'});
        }
        var valid = this.state.psw === this.state.repsw;
        if(!valid && psw!=='')
            repsw = 'block';

        var error = {
            psw: psw,
            repsw: repsw
        };

        this.setState({error: {...error}}); 

        if(psw==='none' && repsw==='none' && valid){
            var res = await this.props.updateDB({
                password: this.state.psw
            });
            if(res === 'User Updated Successfully'){
                removeSession();
                this.setState({
                    psw: '',
                    repsw: ''
                });
                history.push('/logIn');
            } else {
                alert('Failed to Change Password.');
            }
        }
    }

   render() {
    return (
        <div className="t2_sp_work">
            <div className="t2_sp_work_title">
                Change Password               
            </div>
            <div  className="row t2_sp_work_container">
                <div  className="ssu2_modal1_input" style={{maxWidth: 600, marginTop: 80}}>
                    <div  className="ssu2_modal1_input ssu2_modal3_selectBox">
                        <div  className="input_left_icon">
                            <img width="18px" height="15px" alt="img"src={key} />
                        </div>
                        <input  className="ssu3_password" id="psw" placeholder="Password" type="password" value={this.state.psw} onChange={this.setPassword}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.savePassword()}}/>
                        <div  className="ssu3_eye" onMouseDown={()=>this.togglePsw('psw')} onMouseUp={()=>this.togglePsw('psw')}  
                            onTouchStart={()=>this.togglePsw('psw')}  onTouchEnd={()=>this.togglePsw('psw')} >
                            <VisibilityOffIcon style={{display: 'block'}} id="c_psw"/>
                            <VisibilityIcon style={{display: 'none'}}  id="o_psw" />
                        </div>
                    </div>
                    <ErrorState  name={this.state.pswErr} show={this.state.error.psw}/>
                </div>
                <div  className="ssu2_modal1_input" style={{maxWidth: 600, marginTop: 0}}>
                    <div  className="ssu2_modal1_input ssu2_modal3_selectBox">
                        <div  className="input_left_icon">
                            <img  height="15px" width="18px" alt="img"src={key} />
                        </div>
                        <input className="ssu3_password" id="rpsw" placeholder="Confirm password" type="password" value={this.state.repsw} onChange={this.setConfirmPsw}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.savePassword()}}/>
                        <div  className="ssu3_eye" onMouseDown={()=>this.togglePsw('rpsw')} onTouchStart={()=>this.togglePsw('rpsw')} onMouseUp={()=>this.togglePsw('rpsw')}
                             onTouchEnd={()=>this.togglePsw('rpsw')}>
                            <VisibilityOffIcon id="c_rpsw" style={{display: 'block'}}/>
                            <VisibilityIcon  id="o_rpsw" style={{display: 'none'}}/>
                        </div>
                    </div>
                    <ErrorState name="Doesn't match with the password."  show={this.state.error.repsw} />
                </div>
                <div style={{width: '100%'}}>
                    <div className="ssu_button" onClick={this.savePassword} style={{margin: '36px auto 84px', maxWidth: 180, minWidth: 150}}>SAVE</div>
                </div>
            </div>
        </div>
    );
  }
}

export default ChangePassword;
