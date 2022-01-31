import React from 'react';
import { connect } from 'react-redux';
import leftarrow from '../../../assets/images/leftarrow.svg';
import downarrow from '../../../assets/images/downarrow.svg';
import edit from '../../../assets/images/edit_note.svg';
import del from '../../../assets/images/delete.svg';
import calendar from '../../../assets/images/calendar.png';
import DatePicker from "react-datepicker";
import ErrorState from "../../../theme_1/staffSignUp/components/errorState";
import FileBrowser from '../../../theme_1/staffSignUp/components/fileBrowser';
import profile from '../../../assets/images/profile.svg';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';
import Confirm from "../../../modals/confirm";
import $ from 'jquery';
import { callApi, setSession, removeSession } from '../../../../action';
const mapStateToProps = state => {
    return {
        _id: state.staffProfile._id,
        nursingLicence: state.staffProfile.nursingLicence
    }
};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class NurseLicense extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            downarrow: 'inline',
            leftarrow: 'none',
            licenses: {},
            stateName: '',
            //--- delete confirm modal
            selectedNum: '',
            showConfirm: 'none',
            confirmTitle: '',
            agreeFn: false,
            //--- add & update modal
            showEditModal: 'none',            
            file: false,
            expDate: false,
            lname: '',
            lnum: '',
            imgUrl: '',
            fname: '',
            error: {
                lname: 'none',
                lnum: 'none',
                expDate: 'none',
                lfile: 'none'
            },
            delFile: false,
            editRow: false,
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
        this.setState({
            licenses: {...props.item},
            stateName: props.item.state
        });   
    }

    toggleAccordion = () => {
       if(this.state.downarrow === 'none')
           this.setState({downarrow: 'inline', leftarrow: 'none'});
       else 
           this.setState({downarrow: 'none', leftarrow: 'inline'});
    }

    //---- delete state confirm alert

    confirmDeleteState = () => {
        this.setState({
            showConfirm: 'block', 
            confirmTitle: this.state.stateName,
            agreeFn: this.deleteState
        });     
    }

    deleteState = () => {
        var num = this.props.num;
        this.setState({showConfirm: 'none'});
        var nursingLicence = this.props.nursingLicence;
        nursingLicence.splice(num, 1);
        this.updateDB(nursingLicence);
    }

    //---- delete license confirm alert

    confirmDeleteLicence = (name) => {
        this.setState({
            showConfirm: 'block', 
            confirmTitle: name,
            agreeFn: this.deleteOneRow
        });     
    }

    deleteOneRow = () => {
        var num = this.props.num;
        this.setState({showConfirm: 'none'});
        var nursingLicence = this.props.nursingLicence;
        nursingLicence[this.props.num] = { state: this.state.licenses.state };
        this.updateDB(nursingLicence);
    }

    editOneRow = () => {
        $('#' + this.props.num + 'input').val(null);
        this.setState({showEditModal: 'block', editRow: true});
        var licence = this.state.licenses;
        var name = licence.image.split('/')[3];
        this.setState({
            expDate: new Date(licence.expirationDate), 
            lname: licence.name, 
            lnum: licence.number, 
            file: false,
            fname: name,
            imgUrl: '',
            error: {
                lname: 'none',
                lnum: 'none',
                expDate: 'none',
                lfile: 'none'
            },
            delFile: false,
            title: 'Edit'
        });
    }    

    addLicense = () => {
        $('#' + this.props.num + 'input').val(null);
        this.setState({showEditModal: 'block', editRow: false});
        this.setState({
            expDate: false, 
            lname: "", 
            lnum: "", 
            file: false,
            fname: "",
            imgUrl: '',
            error: {
                lname: 'none',
                lnum: 'none',
                expDate: 'none',
                lfile: 'none'
            },
            delFile: false,
            title: 'Add'
        });
    }

    //------ add & edit nursing licenses
    updateDB = async (nursingLicence) => {        
        var data = {nursingLicence: nursingLicence};
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

    handleSave = async () => {
        var state = this.state;

        var lname = state.lname === "" ? "block" : "none";   
        var lnum = state.lnum === "" ? "block" : "none"; 
        var expDate = state.expDate === false ? "block" : "none";
        var lfile = state.file === false && !this.state.fname ? "block" : "none"; 
        var temp = {
            lname: lname,
            lnum: lnum,
            expDate: expDate,
            lfile: lfile,
        }    
        this.setState({error: {...temp}}); 
        this.setState({delFile: false});     

        if(lname === 'none' && lnum === 'none' && expDate === 'none' && lfile === 'none'){
            this.modalClose();
            var newLicense = {
                image: this.state.licenses.image,
                name: this.state.lname,
                number: this.state.lnum,
                state: this.state.licenses.state,
                expirationDate: this.state.expDate,
                num: this.props.num
            };
            this.setState({licenses: newLicense});            
            var file = false;
            if(this.state.file){ 
                var res = await callApi('POST', '/v1/LHS/file/upload', null, {file: this.state.file}, true);
                file = res.upload.upload.link + "";
            }
            if(file) {
                newLicense = {
                    image: file,
                    name: this.state.lname,
                    number: this.state.lnum,
                    state: this.state.licenses.state,
                    expirationDate: this.state.expDate,
                    num: this.props.num
                };
                this.setState({licenses: newLicense});
            }
            var nursingLicence = this.props.nursingLicence;
            nursingLicence[this.props.num] = newLicense;
            this.updateDB(nursingLicence);
        }       
    };

    setFile = (file) => {
        this.setState({file: file, fname: false});
    }

    showFileErr = () => {
        var err = this.state.error;
        err.lfile = "block";
        this.setState({error: err});
    }
    hideFileErr = () => {
        var err = this.state.error;
        err.lfile = "none";
        this.setState({error: err});
    }

    setImgUrl = (url) => {
        this.setState({imgUrl: url})
    }

    modalClose = () => {
        var state = {
            showEditModal: 'none'
        }
        this.setState(state);
    }

    setDelFile = (del) => {
        this.setState({delFile: del, fname: false});
        if(del && this.state.error.lfile==='block')
            this.hideFileErr();
    }

    setLicenceName = (e) => {
        if(e.target.value.length < 51){
            this.setState({lname: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.lname = 'none';
                this.setState({error: error});
            }
        }
    }

    setLicenceNum = (e) => {
        if(e.target.value.length < 51){
            this.setState({lnum: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.lnum = 'none';
                this.setState({error: error});
            }
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

  render() {
    var date = new Date(this.state.licenses.expirationDate);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yy = date.getFullYear();
    dd = dd < 10 ? '0'+ dd : dd;
    mm = mm < 10 ? '0'+ mm : mm;
    var date_received = mm + '/' + dd + '/' + yy;
    return (
        <div className="t2_sp_nl_item">
            <div className="col-12 t2_sp_licence_accBtn" style={{fontSize: 18}} onClick={this.toggleAccordion}>
                <span>
                    <img alt="img" height="18px" src={leftarrow} style={{display: this.state.leftarrow, marginRight: '34px'}} />
                    <img alt="img" width="18px" src={downarrow} style={{display: this.state.downarrow, marginRight: '22px'}}/>
                </span> 
                {this.props.item.state}
                <span className="nur_state_del" title="remove state" onClick={(e)=>{e.stopPropagation(); this.confirmDeleteState()}}><img alt="img"src={del} width="15px" heigth="18px" style={{cursor: 'pointer', display: this.props.admin ? 'none' : 'inline'}}/></span>
            </div>
            <div className="col-12 nur_accBody" style={{display: this.state.downarrow}}>
                <hr className="t2_sp_hr"/>
                <div className="nur_text1">
                    <div className="row" style={{overflowX: 'auto', marginTop: '24px', display: this.state.licenses.name?"block":"none"}}>
                        <table style={{minWidth: '800px', marginBottom: '15px', textAlign: 'left'}}>
                            <thead>
                                <tr className="nurseHead">
                                    <th className="t2_sp_licence_th" style={{paddingLeft: '50px'}}> Image </th>
                                    <th className="t2_sp_licence_th"> Name </th>
                                    <th className="t2_sp_licence_th"> Number </th>
                                    <th className="t2_sp_licence_th"> Expiration Date</th>
                                    <th className="t2_sp_licence_th" style={{width: this.props.admin ? '80px' : '130px'}}> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr style={{height: 20}}/>
                            <tr className="t2_sp_licence_row">
                                <td style={{paddingLeft: '50px'}}><a href={this.state.licenses.image} download target="new"> <img alt="img" width="60" height="36" src={this.state.licenses.image}/></a></td>
                                <td className="t2_sp_licence_td"> {this.state.licenses.name} </td>
                                <td className="t2_sp_licence_td"> {this.state.licenses.number} </td>
                                <td className="t2_sp_licence_td"> {date_received} </td>
                                <td> 
                                    <span style={{marginRight: '20px'}} onClick={()=>this.editOneRow(this.state.licenses.name)}><img width="20px" height="20px" alt="img"src={edit} style={{cursor: 'pointer'}}/></span>
                                    <span onClick={()=>this.confirmDeleteLicence(this.state.licenses.name)}><img width="20px" height="18px" alt="img"src={del} style={{cursor: 'pointer', display: this.props.admin ? 'none' : 'inline' }}/></span> 
                                </td>
                            </tr> 
                            </tbody>                         
                        </table>
                    </div>
                    <div className="ssu2_addItem" onClick={this.addLicense}
                     style={{display: this.state.licenses.name?"none":"block"}}>
                        + Add License 
                    </div>                    
                </div>
            </div>
            <Confirm display={this.state.showConfirm}  title={'Delete "' + this.state.confirmTitle + '"'}
                content={'Are you sure you want to delete "' + this.state.confirmTitle + '"'} agreeFn={this.state.agreeFn} 
                disagreeFn={()=>this.setState({showConfirm: 'none'})}/>
            <div className="w3-modal" style={{display: this.state.showEditModal}} >
                <div className="w3-modal-content ssu2_modal1" style={{overflowY: 'auto', maxHeight: 600}}>
                    <div className="w3-container">
                        <div className="ssu2_modal1_text1">
                            {this.state.title} License
                        </div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                                <div className="input_left_icon">
                                    <img height="17px" width="22px" alt="img"src={profile}/>
                                </div>
                                <input className="ssu2_modal3_select" type="text" placeholder="License Name" value={this.state.lname} onChange={this.setLicenceName}
                                        onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                            </div>
                            <ErrorState show={this.state.error.lname} name="License Name is required." />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '18px'}}>
                                <div className="input_left_icon">
                                    <img width="22px" height="17px" alt="img"src={profile}/>
                                </div>
                                <input className="ssu2_modal3_select" placeholder="License Number" type="text" value={this.state.lnum}
                                onChange={this.setLicenceNum}
                                onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                            </div>
                            <ErrorState name="License Number is requried." show={this.state.error.lnum} />
                        </div>
                        <div className="ssu2_modal1_input" style={{marginTop: '18px'}}>
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon"  onClick={()=>$(".ssu2_modal3_date").focus()}>
                                    <img width="22px" height="17px" alt="img"src={calendar}/>
                                </div>
                                <DatePicker
                                    placeholderText={'Expiration Date'}
                                    className="ssu2_modal3_date"
                                    selected={this.state.expDate}
                                    onChange={(date) => this.setExpDate(date)}
                                />
                            </div>
                            <ErrorState name="Expiration Date is required." show={this.state.error.expDate} />
                        </div>
                        <div className="ssu2_modal1_text2">
                            Please upload your license
                        </div>
                        <FileBrowser prefix={this.props.num} validateImage={true} fname={this.state.fname} setFile={this.setFile} showFileErr={this.showFileErr} title="LICENSE" 
                        hideFileErr={this.hideFileErr} setImgUrl={this.setImgUrl} file={this.state.file} setDelFile={this.setDelFile}/>
                        <ErrorState show={this.state.error.lfile} name="The PNG, JPEG, JPG file is required." />
                        <hr style={{margin: '60px 0px 0px'}}/>
                        <div className="row ssu_bottom">
                            <button onClick={this.handleSave} className="ssu2_modal1_button1"> SAVE </button>
                            <button onClick={this.modalClose} className="ssu2_modal1_button2"> CANCEL </button>
                        </div>
                    </div>
                </div>
            </div>   
        </div>                        
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NurseLicense);
