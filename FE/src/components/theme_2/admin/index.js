import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { SET_SP_PROFILE, SET_AUTH    } from '../../../constants/actionTypes';
import { callApi, setSession } from '../../../action';
import Header from '../components/adminHeader';
import Navigation from '../components/adminNav';
import Dashboard from './dashboard';
import ManageAdmin from './manageAdmin';
import ManageStaff from './manageStaff';
import ManageStaffEdit from './components/manageStaffEdit';
import ManageHospital from './manageHospital';
import ManageHospitalEdit from './components/manageHospitalEdit';
import './admin.css';

const mapStateToProps = state => {
  return { 
    administrators: state.administrators,
    staffs: state.staffs,
    hospitals: state.hospitals
  }};

const mapDispatchToProps = dispatch => ({
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class StaffProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            curPos: ''
        }
    }

    componentWillMount = async () => { 
        // var token = localStorage.getItem('token');
        // const _id = localStorage.getItem('_id');
        // token = "staff_kackey_" + token;
        // var res = await callApi("GET", "/v1/LHS/staff/getById/" + _id, token);
        // console.log(res.data);
        // this.props.setStaffProfile(res.data);
        var data = {            
            name: "Admin", 
            type: 'admin',
            title: 'Dashboard'
        }
        this.props.setAuth(data);
    }
    
    setCurPos = (pos) => {
        this.setState({curPos: pos});
    }
    
   render() {
    return (
        <div className="theme2">
            <Navigation curPos={this.state.curPos}/>
            <div className="theme2_container">
                <Header />
                <div className="theme2_main_container">            
                    <Switch>
                        <Route path="/main/admin/manageHospitalEdit" render={(props) => <ManageHospitalEdit {...props} setCurPos={this.setCurPos} />}/>
                        <Route path="/main/admin/manageHospital" render={(props) => <ManageHospital {...props} setCurPos={this.setCurPos} />}/>
                        <Route path="/main/admin/manageStaffEdit" render={(props) => <ManageStaffEdit {...props} setCurPos={this.setCurPos} />}/>
                        <Route path="/main/admin/manageStaff" render={(props) => <ManageStaff {...props} setCurPos={this.setCurPos} />}/>
                        <Route path="/main/admin/manageAdmin" render={(props) => <ManageAdmin {...props} setCurPos={this.setCurPos} />}/>
                        <Route path="/main/admin"  render={(props) => <Dashboard {...props} setCurPos={this.setCurPos} />}/> 
                    </Switch>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffProfile);
