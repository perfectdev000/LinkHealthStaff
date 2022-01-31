import React from 'react';
import { connect } from 'react-redux';
import edit from '../../../assets/images/edit_note.svg';
import del from '../../../assets/images/delete.svg';
import keyhole from '../../../assets/images/keyhole.svg';
import ErrorState from "../../../theme_1/staffSignUp/components/errorState";
import Confirm from "../../../modals/confirm";
import { setSession, callApi } from '../../../../action';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';
const mapStateToProps = state => {
    return {
        _id: state.staffProfile._id,
        liablityInsurance: state.staffProfile.liablityInsurance
    }
};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class Insurance extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            insurance: {},
            //--- add & edit modal
            provider: '',
            number: '',
            showEditModal: 'none',
            error: {
                provider: 'none',
                number: 'none',
            },
            //--- delete confirm modal
            showConfirm: 'none',
            confirmTitle: '',
            agreeFn: false,
            title: 'Add'
        }
    }

    componentWillMount = () => {
        this.setState({insurance: {...this.props.liablityInsurance}});
    }

    componentWillReceiveProps = (newProps) => { 
        this.setState({insurance: {...newProps.liablityInsurance}});
    }

    updateDB = async (insurance) => {
        var data = {liablityInsurance: insurance};
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

    //---- delete confirm alert

    confirmDelete = () => {
        this.setState({
            showConfirm: 'block', 
            confirmTitle: this.state.insurance.insuranceProvider,
            agreeFn: this.deleteOneRow
        });
    }

    deleteOneRow = () => {
        this.setState({showConfirm: 'none', insurance: {}});
        this.updateDB({});
    }

    //---- add & edit modal show and hide

    editOneRow = () => {
        this.setState({
            provider: this.state.insurance.insuranceProvider,
            number: this.state.insurance.policyNumber,
            title: 'Edit',
            showEditModal: 'block'
        });
    }

    showAddModal = () => {
        this.setState({
            showEditModal: 'block', 
            provider: '',
            number: '',
            title: 'Add',
        });
    }

    closeModal = () => {
        this.setState({showEditModal: 'none'});
    }

    //--- add & edit modal fuctions

    setProvider = (e) => {
        if(e.target.value.length < 51){
            this.setState({provider: e.target.value});
            if (e.target.value !== ''){
                var err = this.state.error;
                err.provider = 'none';
                this.setState({error: err});
            }
        }
    }

    setNumber = (e) => {
        if(e.target.value.length < 51){
            this.setState({number: e.target.value});
            if(e.target.value !== ''){
                var err = this.state.error;
                err.number = 'none';
                this.setState({error: err});
            }
        }
    }

    setInsurance = () => {
        var provider = this.state.provider === '' ? 'block' : 'none';
        var number = this.state.number === '' ? 'block' : 'none';
        this.setState({error: {provider: provider, number: number}});

        if(provider === 'none' && number === 'none'){
            var newInsurance = {
                insuranceProvider: this.state.provider,
                policyNumber: this.state.number
            }
            this.setState({showEditModal: 'none', insurance: newInsurance});
            this.updateDB(newInsurance);
        }
    }

  render() {
    return (
        <div>
            <div className="nur_text1" style={{marginTop: '60px'}}>
                <h4 style={{textAlign: 'left'}}>Liability Insurance</h4>
                <hr className="t2_sp_hr"/>
                <div className="row" style={{overflowX: 'auto', marginTop: '32px', display: this.state.insurance.insuranceProvider?"block":"none"}}>
                    <table style={{minWidth: '800px', marginBottom: '20px', textAlign: 'left'}}>
                        <thead>
                            <tr className="nurseHead">
                                <th style={{paddingLeft: '50px'}} className="t2_sp_licence_th"> Insurance provider </th>
                                <th className="t2_sp_licence_th" > Policy number </th>
                                <th style={{width: this.props.admin ? '80px' : '130px'}} className="t2_sp_licence_th"> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr style={{height: 20}}/>
                        <tr className="t2_sp_licence_row">
                            <td style={{paddingLeft: '50px'}} className="t2_sp_licence_td"> {this.state.insurance.insuranceProvider} </td>
                            <td className="t2_sp_licence_td"> {this.state.insurance.policyNumber} </td>
                            <td> 
                                <span style={{ marginRight: '20px'}} onClick={this.editOneRow}>
                                    <img width="20px" height="20px" alt="img"src={edit} style={{cursor: 'pointer'}}/>
                                </span>
                                <span onClick={this.confirmDelete}><img width="20px" height="18px" alt="img"src={del}  style={{cursor: 'pointer', display: this.props.admin ? 'none' : 'inline'}}/></span> 
                            </td>
                        </tr> 
                        </tbody>                         
                    </table>
                </div>
                <div className="ssu2_addItem" onClick={this.showAddModal}
                    style={{display: this.state.insurance.insuranceProvider?"none":"block"}}>
                    + Add Insurance 
                </div>                                 
            </div> 
            <div className="w3-modal " style={{display: this.state.showEditModal}}>
                <div className="w3-modal-content ssu2_modal1 ">
                    <div className="w3-container ">
                        <div className="ssu2_modal1_text1 ">
                            {this.state.title} Liability Insurance
                        </div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className="ssu2_modal1_input" style={{marginTop: '30px'}}>
                            <div className="ssu2_modal1_input">
                                <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                    <div className="input_left_icon">
                                        <img width="22px" height="23px" alt="img"src={keyhole} style={{marginTop: '-3px'}} />
                                    </div>
                                    <input className="ssu2_modal3_select" placeholder="Insurance provider" type="text" value={this.state.provider} onChange={this.setProvider}
                                        onKeyUp={(e)=>{if(e.key === 'Enter') this.setInsurance()}}/>
                                </div>
                                <ErrorState show={this.state.error.provider} name="Insurance provider is required." />
                            </div>
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input">
                                <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                    <div className="input_left_icon">
                                        <img width="22px" height="23px" alt="img"src={keyhole} style={{marginTop: '-3px'}} />
                                    </div>
                                    <input className="ssu2_modal3_select" placeholder="Policy number" type="text" value={this.state.number} onChange={this.setNumber}
                                        onKeyUp={(e)=>{if(e.key === 'Enter') this.setInsurance()}}/>
                                </div>
                                <ErrorState show={this.state.error.number} name="Policy number is required." />
                            </div>
                        </div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className="row ssu_bottom">
                            <button className="ssu2_modal1_button1" onClick={this.setInsurance}> SAVE </button>
                            <button className="ssu2_modal1_button2" onClick={this.closeModal}> CANCEL </button>
                        </div>
                    </div>
                </div>
            </div>
            <Confirm title={'Delete "' + this.state.confirmTitle + '"'} display={this.state.showConfirm}
                agreeFn={this.state.agreeFn} content={'Are you sure you want to delete "' + this.state.confirmTitle + '"'}
                disagreeFn={()=>this.setState({showConfirm: 'none'})}/>  
        </div>                   
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
