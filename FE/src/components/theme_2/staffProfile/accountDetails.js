import React from 'react';
import { connect } from 'react-redux';
import ErrorState from '../../theme_1/staffSignUp/components/errorState';
import edit_note from '../../assets/images/edit_note.svg';
import user from '../../assets/images/user.svg';
import { SET_SP_PROFILE, SET_AUTH } from '../../../constants/actionTypes';
import { callApi, setSession } from '../../../action';

const mapStateToProps = state => {
  return {
    _id: state.staffProfile._id,
      accountName: state.staffProfile.name,
      bankName: state.staffProfile.bankName,
      routingNumber: state.staffProfile.routingNumber,
      accountNumber: state.staffProfile.accountNumber
  }};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class AccountDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            accountName: '',
            bankName: '',
            routingNumber: '',
            accountNumber: '',
            modalShow: 'none',    
            maccountName: '',
            mbankName: '',
            mroutingNumber: '',
            maccountNumber: '',   
            error: {
                accountName: 'none',
                bankName: 'none',
                routingNumber: 'none',
                accountNumber: 'none'
            },          
        }
    }

    componentWillReceiveProps = (newProps) => {
        this.initState(newProps);
    }

    componentWillMount = () => {
        this.initState(this.props);
    }

    initState = (props) => {
        this.setState({            
            accountName: props.accountName,
            bankName: props.bankName,
            routingNumber: props.routingNumber,
            accountNumber: props.accountNumber
        })
    }
    
    componentDidMount = () => {
        this.props.setCurPos("accountDetails");
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    edit = () => {
        this.setState({            
            maccountName: this.state.accountName,
            mbankName: this.state.bankName,
            mroutingNumber: this.state.routingNumber,
            maccountNumber: this.state.accountNumber,
            modalShow: 'block',
            error: {
                accountName: 'none',
                bankName: 'none',
                routingNumber: 'none',
                accountNumber: 'none'
            }
        });
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

    setAccountName = (e) => {
        if(e.target.value.length < 51){
            var error = this.state.error;
            error.accountName = 'none';
            this.setState({maccountName: e.target.value, error: error});
        }
    }
    
    setBankName = (e) => {
        if(e.target.value.length < 51){
            var error = this.state.error;
            error.bankName = 'none';
            this.setState({mbankName: e.target.value, error: error});
        }
    }
    
    setRoutingNumber = (e) => {
        if(e.target.value.length < 10){
            var error = this.state.error;
            error.routingNumber = 'none';
            this.setState({mroutingNumber: e.target.value, error: error});
        }
    }
    
    setAccountNumber = (e) => {
        if(e.target.value.length < 13){
            var error = this.state.error;
            error.accountNumber = 'none';
            this.setState({maccountNumber: e.target.value, error: error});
        }
    }

    modalClose = () => {
        this.setState({
            modalShow: 'none',
            error: {
                accountName: 'none',
                bankName: 'none',
                routingNumber: 'none',
                accountNumber: 'none'
            }
        });
    }

    continueToNext = () => {
        var state = this.state;
        var maccountName = state.error.accountName === 'block' || state.maccountName === '' ? 'block' : 'none';
        var mbankName =  state.error.bankName === 'block' || state.mbankName === '' ? 'block' : 'none';
        var mroutingNumber =  state.error.routingNumber === 'block' || state.mroutingNumber === '' ? 'block' : 'none';
        var maccountNumber =  state.error.accountNumber === 'block' || state.maccountNumber === '' ? 'block' : 'none';

        var error = {
            accountName: maccountName,
            bankName: mbankName,
            routingNumber: mroutingNumber,
            accountNumber: maccountNumber
        }
        this.setState({error: {...error}}); 

        if(maccountName==='none' &&  mbankName==='none' && mroutingNumber==='none' && maccountNumber==='none'){
            this.updateDB();           
        }
    }

    updateDB = async () => {
        var data = {
                 name: this.state.maccountName,
                 bankName: this.state.mbankName,
                 routingNumber: this.state.mroutingNumber,
                 accountNumber: this.state.maccountNumber
             }
         var token =  "staff_kackey_" + localStorage.getItem('token');
         var _id = this.props._id;
         var res = await callApi("POST", "/v1/LHS/staff/update/" + _id, token, data);
         setSession( res.token, res.data._id, 'staff');
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
   
   render() {
    return (
        <div className="t2_sp_work">
            <div className="t2_sp_work_title">
                Account Details
                <img alt="icon.svg" src={edit_note} width="15px" style={{marginTop: 4, float: 'right', cursor: 'pointer'}} onClick={this.edit}/>                
            </div>
            <div className="row t2_sp_work_container">
                <div className="col-md-6 col-sm-12">
                    <h6 style={{fontSize:14}}> Bank Name </h6>
                    <h5 className="t2_detail_textbox" title={this.state.bankName}> {this.state.bankName} </h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-md-6 col-sm-12">                    
                    <h6 style={{fontSize:14}}> Account Name </h6>
                    <h5 className="t2_detail_textbox" title={this.state.accountName}> {this.state.accountName} </h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-md-6 col-sm-12">                                      
                    <h6 style={{fontSize:14}}> Routing Number </h6>
                    <h5 className="t2_detail_textbox"> {this.state.routingNumber} </h5>
                </div>
                <div className="col-md-6 col-sm-12">                                      
                    <h6 style={{fontSize:14}}> Account Number </h6>
                    <h5 className="t2_detail_textbox"> {this.state.accountNumber} </h5>
                </div>
            </div>
            <div className="w3-modal" style={{display: this.state.modalShow}} >
                <div className="w3-modal-content ssu2_modal1" style={{maxHeight: 600, overflowY: 'auto'}}>
                    <div className="w3-container">
                        <div className="ssu2_modal1_text1">Edit Account Details</div>
                        <hr style={{margin: '30px 0px 0px'}}/>                      
                        <div className="ssu2_modal1_input" style={{marginTop: 30}}>
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img" src={user} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Bank Name" type="text" value={this.state.mbankName} onChange={this.setBankName}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.bankName} name={"Bank Name is required."} />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img alt="img" width="18px" height="15px" src={user} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Account Name" type="text" value={this.state.maccountName} onChange={this.setAccountName} onKeyDown={this.preventNumberInput}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.accountName} name="Account Name is required. "/>
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img" src={user} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Routing Number" type="number"  onKeyDown={ this.formatInput } value={this.state.mroutingNumber} onChange={this.setRoutingNumber}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.routingNumber} name="Routing Number is required." />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img"src={user} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Account Number" type="number" onKeyDown={ this.formatInput } value={this.state.maccountNumber} onChange={this.setAccountNumber}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.accountNumber} name="Account Number" />
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
