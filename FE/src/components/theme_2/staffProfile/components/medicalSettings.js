import React from 'react';
import { connect } from 'react-redux';
import "./components.css";
import edit_note from "../../../assets/images/edit_note.svg";
import ErrorState from '../../../theme_1/staffSignUp/components/errorState';
import { callApi, setSession } from '../../../../action';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';

const ToggleExpItem = (props) => {
    const toggleExp = (e) => {
        props.toggleExp(props.id);
    }

    var className = (props.selectedExp !== props.exp || props.showOtherExp === 'none') ? "ssu1_locItem ssu1_nearLocItem" :"ssu1_locItem";
    // className += props.exp==='outpatient services, please specify'?' ssu2_otherExp_item':'';
    if( props.exp === 'Other' && props.display === 'none')
        className ='ssu1_locItem ssu2_otherExp_item';
    else if (props.exp === 'Other')
        className ='ssu1_locItem ssu1_nearLocItem ssu2_otherExp_item';
    return (
        <button className={ className }
        onClick={toggleExp}>
            {props.exp}
        </button>
    );
}

const mapStateToProps = state => {
  return {
    _id: state.staffProfile._id,
      experiencedIn: state.staffProfile.experiencedIn
  }};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class MedicalSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            experiencedIn: "",
            _exps: [
                "Acute Care Hospitals",
                "Urgent Care Centers",
                "Rehabilitation Centers",
                "Nursing Homes",
                "Other Long-term Care Facilities",
                "Specialized Outpatient Services"
            ],
            newExperiencedIn: "",
            showModal: "none",
            error: 'none',
            showOtherExp: 'block'
        }
    }
    componentWillReceiveProps = (newProps) => {
        this.setState({experiencedIn: newProps.experiencedIn});
    }

    componentWillMount() {
        this.setState({experiencedIn: this.props.experiencedIn});
    }

    showModal = () => {
        this.setState({showModal: 'block', newExperiencedIn: this.state.experiencedIn});
    }

    toggleExp = (newExperiencedIn) => {
        if(this.state.newExperiencedIn === newExperiencedIn){
            this.setState({newExperiencedIn: ''});
        } else {
            this.setState({newExperiencedIn: newExperiencedIn});
            this.setState({error: 'none'});
        }
        this.setState({showOtherExp: 'block'});
    }

    showOtherExp = () => {
        var temp = this.state.showOtherExp === 'none' ? 'block' : 'none';
        this.setState({newExperiencedIn: ''});
        this.setState({showOtherExp: temp});
    }

    setOtherExp = (e) => {
        if(e.target.value.length < 51){
            this.setState({newExperiencedIn: e.target.value});
            if(e.target.value.length > 0)
                this.setState({error: 'none'});
        }
    }

    handleSave = () => {
        if(this.state.newExperiencedIn === '')
            this.setState({error: 'block'});
        else {
            this.updateDB({experiencedIn: this.state.newExperiencedIn});
            this.setState({experiencedIn: this.state.newExperiencedIn, newExperiencedIn: '', showModal: 'none'});            
        }
    }

    closeModal = () => {
        this.setState({showModal: 'none', newExperiencedIn: '', error: 'none'});
    }

    updateDB = async (data) => {
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
        <div className="t2_sp_work">
            <div className="t2_sp_work_title">
                Medical settings
                <img alt="icon.svg" src={edit_note} width="20px" style={{marginTop: 4, float: 'right', cursor: 'pointer'}} onClick={this.showModal}/>                
            </div>
            <div className="row t2_sp_work_container">
                <button className="t2_sp_work_item">{this.state.experiencedIn}</button>
            </div><div className="w3-modal " style={{display: this.state.showModal}}>
                <div className="w3-modal-content ssu2_modal1 ">
                    <div className="w3-container ">
                        <div className="ssu2_modal1_text1 ">
                            Edit Medical Settings
                        </div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className="row ssu1_locs">
                            {
                                this.state._exps.map((item) => {
                                    return <ToggleExpItem key={item} exp={item} id={item} toggleExp={this.toggleExp} display='block' selectedExp={this.state.newExperiencedIn}/>
                                })
                            }
                            <div className="ssu2_otherItem">
                                <ToggleExpItem exp="Specialized Outpatient Surgery Center" id="Specialized Outpatient Surgery Center" toggleExp={this.toggleExp} display='block' selectedExp={this.state.newExperiencedIn}/>
                                <ToggleExpItem exp="Other" toggleExp={this.showOtherExp} selectedExp={this.state.newExperiencedIn} display={this.state.showOtherExp}/>
                            </div>                    
                        </div>
                        <input type='text' value={this.state.newExperiencedIn} className='ssu2_otherExp' placeholder="Please specify"
                            style={{display: this.state.showOtherExp === 'none'?'block':'none'}} onChange={this.setOtherExp}
                            onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <ErrorState show={this.state.error} name="Please Enter Your Medical Settings." />  
                        </div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className="row ssu_bottom">
                            <button className="ssu2_modal1_button1" onClick={this.handleSave}> SAVE </button>
                            <button className="ssu2_modal1_button2" onClick={this.closeModal}> CANCEL </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalSettings);
