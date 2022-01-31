import React from 'react';
import { connect } from 'react-redux';
import calendar from '../../../assets/images/calendar.png';
import DatePicker from "react-datepicker";
import edit from '../../../assets/images/edit_note.svg';
import del from '../../../assets/images/delete.svg';
import ErrorState from "../../../theme_1/staffSignUp/components/errorState";
import Confirm from "../../../modals/confirm";
import $ from 'jquery';
import { callApi, setSession, removeSession } from '../../../../action';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';

const mapStateToProps = state => {
    return {
        _id: state.staffProfile._id,
        education: state.staffProfile.education
    }
};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class education extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            education: {},
            //--- add & edit modal
            degree: '',
            college: '',
            date: false,
            error: {
                degree: 'none',
                college: 'none',
                date: 'none'
            },
            //--- delete confirm modal
            showConfirm: 'none',
            confirmTitle: '',
            agreeFn: false,
            title: 'Add'
        }
    }

    componentWillMount = () => {
        this.setState({education: {...this.props.education}});
        console.log(this.props.education);
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({education: {...newProps.education}});
    }

    
    //---- delete confirm alert

    confirmDelete = () => {
        this.setState({
            showConfirm: 'block', 
            confirmTitle: this.state.education.degree,
            agreeFn: this.deleteOneRow
        });
    }

    deleteOneRow = () => {
        this.setState({showConfirm: 'none', education: {}});
        this.updateDB({});
    }

    //---- add & edit modal show and hide

    editOneRow = () => {
        this.setState({
            degree: this.state.education.degree,
            college: this.state.education.college,
            date: new Date(this.state.education.receivedOn),
            showEditModal: 'block',
            title: 'Edit'
        });
    }

    showAddModal = () => {
        this.setState({
            degree: '',
            college: '',
            date: false,
            showEditModal: 'block',
            title: 'Add'
        });
    }

    closeModal = () => {
        this.setState({showEditModal: 'none'});
        this.setState({
            degree: '',
            college: '',
            date: false,
            error: {
                degree: 'none',
                degreeName: '',
                college: 'none',
                date: 'none'
            }
        });
    }

    //--- add & edit modal fuctions

    setDegree = (e) => {
        if(e.target.value.length < 51){
            this.setState({degree: e.target.value});
            if(e.target.value !== ''){
                var err = this.state.error;
                err.degree = 'none';
                this.setState({error: err});
            }
        }
    }

    setcollege = (e) => {
        if(e.target.value.length < 51){
            this.setState({college: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.college = 'none';
                this.setState({error: error});
            }
        }
    }

    setDate = (date) => {
        this.setState({date: date});
        if(date !== ''){
            var error = this.state.error;
            error.date = 'none';
            this.setState({error: error});
        }
    }

    updateEducation = () => {
        var degree = this.state.degree === '' ? 'block' : 'none';
        var college = this.state.college === '' ? 'block' : 'none';
        var date = this.state.date === false ? 'block' : 'none';
        this.setState({error: {degree: degree, college: college, date: date}});

        if(degree === 'none' && college === 'none' && date === "none"){
            this.setState({showEditModal: 'none'});
            var newEducation = {
                degree: this.state.degree,
                college: this.state.college,
                receivedOn: this.state.date
            };
            this.setState({education: newEducation});
            this.updateDB(newEducation);
        }
    }

    updateDB = async (education) => {
        var data = {education: education};
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
        var receivedOn = new Date(this.state.education.receivedOn);
        var d = receivedOn.getDate();
        var m= receivedOn.getMonth() + 1;
        var y = receivedOn.getFullYear();
        d = d < 10 ? '0'+ d : d;
        m = m < 10 ? '0'+ m : m;
        receivedOn = m + '/' + d + '/' + y;
        return (
            <div>
                <div className="nur_text1" style={{marginTop: '48px'}}>
                    <h4 style={{textAlign: 'left'}}>Highest education level</h4>
                    <hr className="t2_sp_hr"/>
                    <div className="row" style={{overflowX: 'auto', marginTop: '32px', display: this.state.education.degree?"block":"none"}}>
                        <table style={{minWidth: '800px', marginBottom: '20px', textAlign: 'left'}}>
                            <thead>
                                <tr className="nurseHead">
                                    <th className="t2_sp_licence_th" style={{paddingLeft: '50px'}}> Degree </th>
                                    <th className="t2_sp_licence_th"> College/University </th>
                                    <th className="t2_sp_licence_th"> Date Received </th>
                                    <th className="t2_sp_licence_th" style={{width: this.props.admin ? '80px' : '130px'}}> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr style={{height: 20}}/>
                            <tr className="t2_sp_licence_row">
                                <td className="t2_sp_licence_td" style={{paddingLeft: '50px'}}> {this.state.education.degree} </td>
                                <td className="t2_sp_licence_td"> {this.state.education.college} </td>
                                <td className="t2_sp_licence_td"> {receivedOn} </td>
                                <td> 
                                    <span style={{ marginRight: '20px'}} onClick={this.editOneRow}><img width="20px" height="20px" alt="img"src={edit} style={{cursor: 'pointer'}}/></span>
                                    <span onClick={this.confirmDelete}><img width="20px" height="18px" alt="img"src={del} style={{cursor: 'pointer', display: this.props.admin ? 'none' : 'inline'}}/></span> 
                                </td>
                            </tr> 
                            </tbody>                         
                        </table>
                    </div>
                    <div className="ssu2_addItem" onClick={this.showAddModal}
                        style={{display: this.state.education.degree?"none":"block"}}>
                        + Add Education level 
                    </div>                    
                </div>
                <div className="w3-modal" id="modal3" style={{display: this.state.showEditModal}}>
                    <div  className="w3-modal-content ssu2_modal1">
                        <div className="w3-container">
                            <div className="ssu2_modal1_text1">
                                {this.state.title} Degree
                            </div>
                            <hr style={{margin: '30px 0px 0px'}}/>
                            <div className="ssu2_modal3_text2">What’s your highest education level?</div>
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                                <div className="input_left_icon">
                                    <svg width="18" height="15" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M30 8.18182L15 0L0 8.18182L15 16.3636L30 8.18182ZM5.45455 13.8818V19.3364L15 24.5455L24.5455 19.3364V13.8818L15 19.0909L5.45455 13.8818Z" fill="#333333"/>
                                    </svg>
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Degree" type="text" value={this.state.degree} onChange={this.setDegree}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.updateEducation()}}/>
                            </div>
                            <ErrorState show={this.state.error.degree} name="Select degree is required." />
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                                <div className="input_left_icon">
                                    <svg width="18" height="15" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 0L0 6.53333L3.73333 8.21333V11.3867C2.61333 11.76 1.86667 12.88 1.86667 14C1.86667 15.12 2.61333 16.24 3.73333 16.6133V16.8L2.05333 20.72C1.49333 22.4 1.86667 24.2667 4.66667 24.2667C7.46667 24.2667 7.84 22.4 7.28 20.72L5.6 16.8C6.72 16.24 7.46667 15.3067 7.46667 14C7.46667 12.6933 6.72 11.76 5.6 11.3867V9.14667L14 13.0667L28 6.53333L14 0ZM22.2133 12.1333L13.8133 15.8667L9.33333 13.8133V14C9.33333 15.3067 8.77333 16.4267 7.84 17.36L8.96 19.9733V20.16C9.14667 20.9067 9.33333 21.6533 9.14667 22.4C10.4533 22.96 11.9467 23.3333 13.8133 23.3333C19.9733 23.3333 22.2133 19.6 22.2133 17.7333V12.1333Z" fill="#333333"/>
                                    </svg>
                                </div>
                                <input className="ssu2_modal3_select" placeholder="College/University" value={this.state.college} type="text" name="degree" onChange={this.setcollege}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.updateEducation()}}/>
                            </div>
                            <ErrorState show={this.state.error.college} name="College/University is required." />
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon"  onClick={()=>$(".ssu2_modal3_date").focus()}>
                                    <img alt="img" width="18px" height="15px" src={calendar}/>
                                </div>
                                <DatePicker
                                    className="ssu2_modal3_date"
                                    placeholderText={'Date Received'}
                                    selected={this.state.date}
                                    onChange={(date) => this.setDate(date)}
                                />
                            </div>
                            <ErrorState show={this.state.error.date} name="Date Received is required." />
                            <hr style={{margin: '60px 0px 0px'}}/>
                            <div className="row ssu_bottom">
                                <button className="ssu2_modal1_button1" onClick={this.updateEducation}> SAVE </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(education);
