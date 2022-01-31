import React from 'react';
import { connect } from 'react-redux';
import edit_note from '../../assets/images/edit_note.svg';
import user from '../../assets/images/user.svg';
import email from '../../assets/images/email.svg';
import phone from '../../assets/images/phone.svg';
import jobTitle from '../../assets/images/jobTitle.svg';
import ErrorState from '../../theme_1/staffSignUp/components/errorState';
import { SET_SP_PROFILE, SET_AUTH } from '../../../constants/actionTypes';
import { callApi, setSession } from '../../../action';

const mapStateToProps = state => {
  return {
    _id: state.staffProfile._id,
      email: state.staffProfile.email,
      name: state.staffProfile.name,
      phone: state.staffProfile.phone,
      jobTitle: state.staffProfile.jobTitle
  }};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class ContactDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            name: '',
            phone: '',
            jobTitle: '',
            modalShow: 'none',    
            memail: '',
            fname: '',
            mphone: '',
            mjobTitle: '',   
            error: {
                fname: 'none',
                email: 'none',
                phone: 'none',
                jobTitle: 'none'
            },            
            emailErr: 'This email is already used.',
        }
    }
    componentWillReceiveProps = (newProps) => {
        this.initState(newProps);
    }

    componentWillMount = async () => {
        this.props.setCurPos('contactDetails');
        this.initState(this.props);
    }

    initState = (props) => {
        this.setState({
            email: props.email,
            name: props.name,
            phone: props.phone,
            jobTitle: props.jobTitle
        })
    }

    componentDidMount = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    edit = () => {
        this.setState({            
            fname: this.state.name,
            memail: this.state.email,
            mphone: this.state.phone,
            mjobTitle: this.state.jobTitle,
            modalShow: 'block',
            error: {
                fname: 'none',
                email: 'none',
                phone: 'none',
                jobTitle: 'none'
            }
        });
    }

    setName = (e) => {
        if(e.target.value.length < 51){
            this.setState({fname: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.fname= 'none';
                this.setState({error: error});
            }
        }
    }

    preventNumberInput = (e) => {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (((keyCode > 47 && keyCode) < 58 || (keyCode > 95 && keyCode < 107)) && keyCode !== 8 && keyCode !== 9 && keyCode !== 32){
            e.preventDefault();
        }
    }

    setjobTitle = (e) => {        
        if(e.target.value.length < 51){
            this.setState({mjobTitle: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.jobTitle = 'none';
                this.setState({error: error});
            }
        }
    }

    setEmail = (e) => {
        this.setState({memail: e.target.value, emailErr: 'Valid email address is required.'});
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = re.test(String(e.target.value).toLowerCase());
        var error = this.state.error;
        if(e.target.value !== '' && valid){
            error.email = 'none';
            this.setState({error: error});
        } else {
            error.email = 'block';
            this.setState({error: error});
        }
    }

    setPhone = (e) => {
        if(e.target.value.length < 11){
            this.setState({mphone: e.target.value});
            var validate;
            if(e.target.value.match(/\d/g))
                if(e.target.value.match(/\d/g).length===10)
                    validate = true;
                else
                    validate = false;
            else
                validate = false;
                
            var error = this.state.error;
            if(e.target.value !== '' && validate){
                error.phone = 'none';
                this.setState({error: error});
            } else {
                error.phone = 'block';
                this.setState({error: error});
            }
        }
    }

    formatInput = (e) => {
        // Prevent characters that are not numbers ("e", ".", "+" & "-") âœ¨
        let checkIfNum;
        if (e.key !== undefined) {
          // Check if it's a "e", ".", "+" or "-"
          checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-" ;
        }
        else if (e.keyCode !== undefined) {
          // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
          checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
        }
        return checkIfNum && e.preventDefault();
    }

    updateDB = async () => {
        var data = {
                 name: this.state.fname,
                 email: this.state.memail,
                 phone: this.state.mphone,
                 jobTitle: this.state.mjobTitle
             }
        if(this.props.admin)
             var token =  "admin_kackey_" + localStorage.getItem('token');
         else
             token =  "staff_kackey_" + localStorage.getItem('token');
         var type = localStorage.getItem('type');
         var _id = this.props._id;
         var res = await callApi("POST", "/v1/LHS/staff/update/" + _id, token, data);
         setSession( res.token, res.data._id, type);
             
         this.props.setStaffProfile(res.data);
         this.modalClose();
         data = {            
             name: res.data.name, 
             type: 'staff', 
             avatar: res.data.avatar,
             badge: res.data.badge
         }
         this.props.setAuth(data);
    }

    emailRepeatCheck = async () => {
        if(this.state.email !== this.state.memail){
            var data = {
                email: this.state.memail
            }
            var res1 = await callApi("POST", "/v1/LHS/hospital/emailCheck", null, data);
            var res2 = await callApi("POST", "/v1/LHS/staff/emailCheck", null, data);
            if(res1.result === 'OK' && res2.result === 'OK'){
                this.updateDB();
            } else {
                this.setState({emailErr: 'This Email address is already in use.'});
                var err = this.state.error;
                err.email = "block";
                this.setState({error: err});
            }
        } else {
            this.updateDB();
        }
    }

    continueToNext = () => {
        var state = this.state;
        var fname = state.error.fname === 'block' || state.fname === '' ? 'block' : 'none';
        var email =  state.error.email === 'block' || state.memail === '' ? 'block' : 'none';
        var phone =  state.error.phone === 'block' || state.mphone === '' ? 'block' : 'none';
        var jobTitle =  state.error.jobTitle === 'block' || state.mjobTitle === '' ? 'block' : 'none';

        var error = {
            fname: fname,
            email: email,
            phone: phone,
            jobTitle: jobTitle
        };
        this.setState({error: {...error}}); 
        console.log(this.state);
        if(fname==='none' &&  email==='none' && phone==='none' && jobTitle==='none'){
            this.emailRepeatCheck();            
        }
    }
    
    modalClose = () => {
        this.setState({
            modalShow: 'none',
            error: {
                fname: 'none',
                email: 'none',
                phone: 'none',
                jobTitle: 'none'
            }
        });
    }
   
   render() {
       var temp1 = this.state.phone.slice(0,3);
       var temp2 = this.state.phone.slice(3,6);
       var temp3 = this.state.phone.slice(6,10);
    return (
        <div className="t2_sp_work">
            <div className="t2_sp_work_title">
                Contact Details
                <img alt="icon.svg" src={edit_note} width="20px" style={{marginTop: 4, float: 'right', cursor: 'pointer'}} onClick={this.edit}/>                
            </div>
            <div className="row t2_sp_work_container">
                <div className="col-md-6 col-sm-12">
                    <h6 style={{fontSize:14}}> Full Name </h6>
                    <h5 className="t2_detail_textbox" title={this.state.name}>{this.state.name} </h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-md-6 col-sm-12">                    
                    <h6 style={{fontSize:14}}> Job Title </h6>
                    <h5 className="t2_detail_textbox" title={this.state.jobTitle}>{this.state.jobTitle}</h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-md-6 col-sm-12">                    
                    <h6 style={{fontSize:14}}> Email Address </h6>
                    <h5 className="t2_detail_textbox">{this.state.email}</h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-md-6 col-sm-12">                                      
                    <h6 style={{fontSize:14}}> Phone Number </h6>
                    <h5 className="t2_detail_textbox"> { temp1 + '-' + temp2 + '-' + temp3 } </h5>
                    <hr style={{marginTop: 24}}/>
                </div>
            </div>
            <div className="w3-modal" style={{display: this.state.modalShow}} >
                <div className="w3-modal-content ssu2_modal1" style={{maxHeight: 600, overflowY: 'auto'}}>
                    <div className="w3-container">
                        <div className="ssu2_modal1_text1">Edit Contact Details</div>
                        <hr style={{margin: '30px 0px 0px'}}/>                      
                        <div className="ssu2_modal1_input" style={{marginTop: 30}}>
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img" src={user} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Full Name" type="text" value={this.state.fname} onChange={this.setName} onKeyDown={this.preventNumberInput}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.fname} name={"Full Name is required."} />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img alt="img" width="18px" height="15px" src={jobTitle} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Job Title" type="text" value={this.state.mjobTitle} onChange={this.setjobTitle}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.jobTitle} name="Job Title is required. "/>
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img"src={email} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Company Email Address" type="text" value={this.state.memail} onChange={this.setEmail}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.email} name={this.state.emailErr} />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img"src={phone} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Phone Number" type="number" min="1" max="9999999999" onKeyDown={ this.formatInput } value={this.state.mphone} onChange={this.setPhone}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.phone} name="10 digits phone number is required." />
                        </div>
                        <hr style={{margin: '60px 0px 0px'}}/>
                        <div className="row ssu_bottom">
                            <button className="ssu2_modal1_button1" onClick={this.continueToNext}> SAVE </button>
                            <button className="ssu2_modal1_button2" onClick={this.modalClose}> CANCEL </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
