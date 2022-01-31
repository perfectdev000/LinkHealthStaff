import React from 'react';
import { connect } from 'react-redux';
import calendar from '../../../assets/images/calendar.png';
import DatePicker from "react-datepicker";
import ErrorState from "../../../theme_1/staffSignUp/components/errorState";
import edit from '../../../assets/images/edit_note.svg';
import del from '../../../assets/images/delete.svg';
import Confirm from "../../../modals/confirm";
import $ from 'jquery';
import { callApi, setSession, removeSession } from '../../../../action';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';

const mapStateToProps = state => {
    return {
        _id: state.staffProfile._id,
        certifications: state.staffProfile.certifications
    }
};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class Certifications extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            certifications: [],
            //--- delete confirm modal
            selectedNum: '',
            showConfirm: 'none',
            confirmTitle: '',
            agreeFn: false,
            //--- delete confirm modal
            showEditModal: 'none',
            cert: '',
            name: '',
            auth: '',
            expDate: false,
            recDate: false,
            selectedCert: false,
            error: {
                cert: 'none',
                auth: 'none',
                expDate: 'none',
                recDate: 'none'
            },
            title: 'Add'
        }
    }

    componentWillMount = () => {
        this.initState(this.props);
    }

    componentWillReceiveProps = (newProps) => { 
        this.initState(newProps);
    }

    initState = (props) => {
        var certifications = props.certifications;
        for(var i = 0 ; i < certifications.length ; i++){
            certifications[i].num = i;
        }
        this.setState({certifications: certifications});
    }

     //---- delete confirm alert

     confirmDelete = (num) => {
        this.setState({
            selectedNum: num,
            showConfirm: 'block', 
            confirmTitle: this.state.certifications[num].name,
            agreeFn: this.deleteOneRow
        });
    }

    deleteOneRow = () => {
        var certs = this.state.certifications;
        certs.splice(this.state.selectedNum, 1);
        this.setState({certifications: [...certs], showConfirm: 'none'});
        this.updateDB(certs);
    }

    //---- add & edit modal show and hide

    editOneRow = (num) => {
        console.log(this.state.certifications[num].name);
        this.setState({
            selectedNum: num,            
            cert: this.state.certifications[num].name,
            auth: this.state.certifications[num].certifyingAuthority,
            expDate: new Date(this.state.certifications[num].expirationDate),
            recDate: new Date(this.state.certifications[num].receivedOn),
            selectedCert: num,
            showEditModal: 'block',
            title: 'Edit'
        });
    }

    showAddModal = () => {
        this.setState({
            cert: '',
            auth: '',
            recDate: false,
            expDate: false,
            selectedNum: false,
            error: {
                cert: 'none',
                auth: 'none',
                recDate: 'none',
                expDate: 'none'
            },
            showEditModal: 'block',
            title: 'Add'
        });
    }

    //--- add & edit modal fuctions

    setCert = (e) => {
        if(e.target.value.length < 51){
            this.setState({cert: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.cert = 'none';
                this.setState({error: error});
            }
        }
    }

    setAuth = (e) => {
        if(e.target.value.length < 51){
            this.setState({auth: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.auth = 'none';
                this.setState({error: error});
            }
        }
    }

    setRecDate = (date) => {
        this.setState({recDate: date});
        if(date !== ''){
            var error = this.state.error;
            error.recDate = 'none';
            this.setState({error: error});
        }
    }

    setExpDate = (date) => {
        this.setState({expDate: date});
        if(date !== ''){
            var error = this.state.error;
            error.expDate = 'none';
            this.setState({error: error});
        }
    }

    saveCert = () => {
        var cert = this.state.cert === '' ? 'block' : 'none';
        var auth = this.state.auth === '' ? 'block' : 'none';
        var recDate = this.state.recDate === false ? 'block' : 'none';
        var expDate = this.state.expDate === false ? 'block' : 'none';

        this.setState({
            error: {
                cert: cert,
                auth: auth,
                recDate: recDate,
                expDate: expDate
            }
        });

        if(cert === "none" && auth === "none" && recDate === "none" && expDate === "none"){
            var newCert = {
                name: this.state.cert, 
                certifyingAuthority: this.state.auth,
                receivedOn: this.state.recDate, 
                expirationDate: this.state.expDate
            };
            var certs = this.state.certifications;
            if(this.state.selectedNum === false){
                certs.push(newCert);
            } else {
                certs[this.state.selectedNum] = newCert;
            }
            this.closeModal();
            this.setState({certifications: [...certs]});
            this.updateDB(certs);
        }
    }

    closeModal = () => {
        this.setState({
            cert: '',
            auth: '',
            expDate: false,
            recDate: false,
            selectedCert: '',
            error: {
                cert: 'none',
                auth: 'none',
                expDate: 'none',
                recDate: 'none'
            },
            showEditModal: 'none'
        });
    }

    updateDB = async (certifications) => {
        var data = {certifications: certifications};
        if(this.props.admin)
            var token =  "admin_kackey_" + localStorage.getItem('token');
        else
            token =  "staff_kackey_" + localStorage.getItem('token');
        var type = localStorage.getItem('type');
        var _id = this.props._id;
        var res = await callApi("POST", "/v1/LHS/staff/update/" + _id, token, data);
        setSession( res.token, res.data._id, type);
        this.props.setStaffProfile(res.data);
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
        <div>
            <div className="nur_text1" style={{marginTop: '48px'}}>
                <h4 style={{textAlign: 'left'}}>Certifications<span className="t2_sp_cert_addBtn" onClick={this.showAddModal}> +Add {this.state.certifications.length ? "Another":""} Certification</span></h4>
                <hr className="t2_sp_hr"/>
                <div className="row" style={{overflowX: 'auto', marginTop: '32px', display: this.state.certifications.length?"block":"none"}}>
                    <table style={{minWidth: '800px', marginBottom: '20px', textAlign: 'left'}}>
                        <thead>
                            <tr className="nurseHead">
                                <th className="t2_sp_licence_th" style={{paddingLeft: '50px'}}> Certificaton </th>
                                <th className="t2_sp_licence_th"> Certifying Authority </th>
                                <th className="t2_sp_licence_th"> Date Received </th>
                                <th className="t2_sp_licence_th"> Expiration Date </th>
                                <th className="t2_sp_licence_th" style={{width: this.props.admin ? '80px' : '130px'}}> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{height: 20}}/>
                           {
                               this.state.certifications.map((item) => {

                                var receivedOn = new Date(item.receivedOn);
                                var d = receivedOn.getDate();
                                var m= receivedOn.getMonth() + 1;
                                var y = receivedOn.getFullYear();
                                d = d < 10 ? '0'+ d : d;
                                m = m < 10 ? '0'+ m : m;
                                receivedOn = m + '/' + d + '/' + y;

                                var expirationDate = new Date(item.expirationDate);
                                d = expirationDate.getDate();
                                m= expirationDate.getMonth() + 1;
                                y = expirationDate.getFullYear();
                                d = d < 10 ? '0'+ d : d;
                                m = m < 10 ? '0'+ m : m;
                                expirationDate = m + '/' + d + '/' + y; 

                                return <tr className="t2_sp_licence_row" key={item.num}>
                                            <td className="t2_sp_licence_td" style={{paddingLeft: '50px'}}> {item.name} </td>
                                            <td className="t2_sp_licence_td"> {item.certifyingAuthority} </td>
                                            <td className="t2_sp_licence_td"> {receivedOn} </td>
                                            <td className="t2_sp_licence_td"> {expirationDate} </td>
                                            <td> 
                                                <span style={{ marginRight: '20px'}} onClick={()=>this.editOneRow(item.num)}><img width="20px" height="20px" alt="img"src={edit} style={{cursor: 'pointer'}}/></span>
                                                <span onClick={()=>this.confirmDelete(item.num)}><img width="20px" height="18px" alt="img"src={del} style={{cursor: 'pointer', display: this.props.admin ? 'none' : 'inline'}}/></span> 
                                            </td>
                                        </tr>
                               })
                           }                              
                        </tbody>                         
                    </table>
                </div>                  
            </div>
            <div id="modal4" className="w3-modal" style={{display: this.state.showEditModal}}>
                <div className="w3-modal-content ssu2_modal1">
                    <div className="w3-container">
                        <div className="ssu2_modal1_text1">
                            {this.state.title} Certification
                        </div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className="ssu2_modal3_text2">What certifications do you have?</div>
                        <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                            <div className="input_left_icon">
                                <svg width="20" height="17" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30 8.18182L15 0L0 8.18182L15 16.3636L30 8.18182ZM5.45455 13.8818V19.3364L15 24.5455L24.5455 19.3364V13.8818L15 19.0909L5.45455 13.8818Z" fill="#333333"/>
                                </svg>
                            </div>
                            <input className="ssu2_modal3_select" placeholder="Certification" type="text" value={this.state.cert} onChange={this.setCert}
                              onKeyUp={(e)=>{if(e.key === 'Enter') this.saveCert()}}/>
                        </div>
                        <ErrorState show={this.state.error.cert} name="Select Certification is required." />
                        <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                            <div className="input_left_icon">
                                <svg width="20" height="17" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0L0 6.53333L3.73333 8.21333V11.3867C2.61333 11.76 1.86667 12.88 1.86667 14C1.86667 15.12 2.61333 16.24 3.73333 16.6133V16.8L2.05333 20.72C1.49333 22.4 1.86667 24.2667 4.66667 24.2667C7.46667 24.2667 7.84 22.4 7.28 20.72L5.6 16.8C6.72 16.24 7.46667 15.3067 7.46667 14C7.46667 12.6933 6.72 11.76 5.6 11.3867V9.14667L14 13.0667L28 6.53333L14 0ZM22.2133 12.1333L13.8133 15.8667L9.33333 13.8133V14C9.33333 15.3067 8.77333 16.4267 7.84 17.36L8.96 19.9733V20.16C9.14667 20.9067 9.33333 21.6533 9.14667 22.4C10.4533 22.96 11.9467 23.3333 13.8133 23.3333C19.9733 23.3333 22.2133 19.6 22.2133 17.7333V12.1333Z" fill="#333333"/>
                                </svg>
                            </div>
                            <input className="w3-select ssu2_modal3_select" placeholder="Certifying authority" type="text" 
                            value={this.state.auth} onChange={this.setAuth}
                            onKeyUp={(e)=>{if(e.key === 'Enter') this.saveCert()}}/>
                        </div>
                        <ErrorState show={this.state.error.auth} name="Certifying authority is required." />
                        <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                            <div className="input_left_icon"  onClick={()=>$("#recDate").focus()}>
                                <img width="18px" height="15px" alt="img"src={calendar}/>
                            </div>
                            <DatePicker
                                id="recDate"
                                className="ssu2_modal3_date"
                                placeholderText={'Date Received'}
                                selected={this.state.recDate}
                                onChange={(date) => this.setRecDate(date)}
                            />
                        </div>                    
                        <ErrorState show={this.state.error.recDate} name="Date received is required." />
                        <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                            <div className="input_left_icon" onClick={()=>$("#expDate").focus()}>
                                <img width="18px" height="15px" alt="img"src={calendar}/>
                            </div>
                            <DatePicker
                                id="expDate"
                                className="ssu2_modal3_date"
                                placeholderText={'Expiration Date'}
                                selected={this.state.expDate}
                                onChange={(date) => this.setExpDate(date)}
                            />
                        </div>                    
                        <ErrorState show={this.state.error.expDate} name="Expiration date is required." />
                        <hr style={{margin: '60px 0px 0px'}}/>
                        <div className="row ssu_bottom">
                            <button className="ssu2_modal1_button1" onClick={this.saveCert}> SAVE </button>
                            <button className="ssu2_modal1_button2" onClick={this.closeModal}> CANCEL </button>
                        </div>
                    </div>
                </div>
            </div>
            <Confirm display={this.state.showConfirm}  title={'Delete "' + this.state.confirmTitle + '"'}
                content={'Are you sure you want to delete "' + this.state.confirmTitle + '"'} agreeFn={this.state.agreeFn} 
                disagreeFn={()=>this.setState({showConfirm: 'none'})}/>              
        </div>                    
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Certifications);
