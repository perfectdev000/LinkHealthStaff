import React from 'react';
import { connect } from 'react-redux';
import ContactDetails from '../../staffProfile/contactDetails';
import JobType from '../../staffProfile/components/jobType';
import Location from '../../staffProfile/components/location';
import NurseLicense from '../../staffProfile/components/nurseLicense';
import { stateOfUs } from '../../../../constants/otherConstans';
import Insurance  from '../../staffProfile/components/insurance';
import DrugTest from '../../staffProfile/components/drugTest';
import CriminalRecord from '../../staffProfile/components/criminalRecord';
import Education from '../../staffProfile/components/education';
import Certifications from '../../staffProfile/components/certifications';
import MedicalSettings from '../../staffProfile/components/medicalSettings';
import place from '../../../assets/images/place.svg';
import { callApi, setSession } from '../../../../action';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';
import { history } from '../../../../store';

const mapStateToProps = state => {
  return {
    _id: state.staffProfile._id,
    nursingLicence: state.staffProfile.nursingLicence
  }};

const mapDispatchToProps = dispatch => ({
  setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
  setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class ManageStaffProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          nursingLicence: [],
          stateOfUs: [],
          selectedStates: [],
          stateVal: '',
          showInput: false
        }
    }
    componentWillReceiveProps = (newProps) => {
      this.initState(newProps);
    }

    componentWillMount = async () => {
      if(this.props._id === '')
        history.push('/main/admin/manageStaff');
      var temp = [];
      for(var i = 0; i < stateOfUs.length; i++){
          var temp1 = {
              name: stateOfUs[i],
              num: i
          };
          temp.push(temp1);
      }
      this.setState({stateOfUs: [...temp]},
      () =>  this.initState(this.props));
    }

    componentDidMount = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }

    initState = (props) => {
      console.log(this.state.stateOfUs);
      var nursingLicence = props.nursingLicence;
      for(var i  = 0 ; i < nursingLicence.length ; i++)
        nursingLicence[i].num = i;
      this.setState({nursingLicence: [...nursingLicence]});
      var temp = [];
      for(i = 0 ; i < this.state.stateOfUs.length ; i++){
        for(var j = 0 ; j < props.nursingLicence.length ; j++){
          if(this.state.stateOfUs[i].name === props.nursingLicence[j].state)
            temp.push(i);
        }
      }
      this.setState({selectedStates: [...temp]}, ()=>console.log(this.state.selectedStates));
    }

    addState = (e) => {
      var state = e.target.value;

      var num;
      var states = this.state.stateOfUs;
      for( var i = 0; i < states.length; i++){
          if(states[i].name === state){
              num = i;
          }
      }

      this.setState({stateVal: '', showInput: false});
      var arr = this.state.selectedStates;
      arr.push(num);
      this.setState({selectedStates: arr});
      
      var nursingLicence = this.state.nursingLicence;
      nursingLicence.push({
        image: '',
        expirationDate: new Date(),
        state: state,
        name: '',
        number: '',
        num: nursingLicence.length
      }); console.log(nursingLicence);
      this.updateDB(nursingLicence);
  }

  updateDB = async (nursingLicence) => {        
    var data = {nursingLicence: nursingLicence};
    var token =  "admin_kackey_" + localStorage.getItem('token');
    var _id = this.props._id;
    var res = await callApi("POST", "/v1/LHS/staff/update/" + _id, token, data);
    setSession( res.token, res.data._id, 'admin');
    this.props.setStaffProfile(res.data);
}
   
   render() {
    return (
        <div>
          <ContactDetails setCurPos={()=>console.log('')} admin={true}/>
          <JobType admin={true}/>
          <Location admin={true}/>
          
          <h4 className="t2_sp_title1">Nursing License</h4>
          {
              this.state.nursingLicence.map( (item) => {
                  return <NurseLicense key={item._id} num={item.num} item={item} admin={true}/>
              })
          }
          <div className="ssu2_addItem" onClick={this.addLicense} style={{display: this.state.showInput?'none':'block'}}
          onClick={()=>this.setState({showInput: true})}>
              + Add {this.state.nursingLicence.length ? "Another" : ""} Location 
          </div> 
          <div className="ssu2_modal1_input" style={{maxWidth: 'none', width: '100%', display: this.state.showInput?'block':'none'}}>
              <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{maxWidth: 'none!important'}}>
                  <div className="input_left_icon">
                      <img alt="img"src={place} width="16px" height="20px" style={{marginTop: '-3px'}}/>
                  </div>
                  <select className="ssu2_modal3_select" name="option" onChange={this.addState} value={this.state.stateVal}>
                      <option value="" disabled selected hidden> Select a state</option>
                      {
                          this.state.stateOfUs.map((state) => {
                              return <option key={state._id} disabled={this.state.selectedStates.indexOf(state.num) !== -1 ? true : false} value={state._id}> {state.name} </option>
                          })
                      }
                  </select>
              </div>
          </div>          
          <Insurance admin={true}/>
          <DrugTest admin={true}/>
          <CriminalRecord admin={true}/>
          <Education admin={true}/>          
          <Certifications admin={true}/>
          <MedicalSettings admin={true}/>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaffProfile);
