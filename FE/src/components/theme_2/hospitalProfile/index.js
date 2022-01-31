import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SubHeader from './subHeader';
import Profile from './profile';
import ChangePassword from '../staffProfile/changePassword';
import { SET_AUTH, SET_HP_PROFILE } from '../../../constants/actionTypes';
import { callApi, setSession } from '../../../action';
import Header from '../components/header';
import Navigation from '../components/navigation';

const mapStateToProps = state => {
  return {
      hospitalProfile: state.hospitalProfile
  }};

const mapDispatchToProps = dispatch => ({
    setHospitalProfile: (data) => dispatch({type: SET_HP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class HospitalProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            curPos: 'profile'
        }
    }

    componentWillMount = async () => {
        var token = localStorage.getItem('token');
        const _id = localStorage.getItem('_id');
        token = "hospital_kackey_" + token;
        var res = await callApi("GET", "/v1/LHS/hospital/getById/" + _id, token);
        this.props.setHospitalProfile(res.data);
        var data = {            
            name: res.data.name, 
            type: 'hospital', 
            avatar: res.data.avatar,
            badge: res.data.badge
        }
        this.props.setAuth(data);
    }

    setCurPos = (pos) => {
        this.setState({curPos: pos});
    }

    updateDB = async (data) => {
        var token = "hospital_kackey_" + localStorage.getItem('token');
        var res = await callApi("POST", "/v1/LHS/hospital/update/" + this.props.hospitalProfile._id, token, data);
        setSession( res.token, res.data._id, 'hospital');
        this.props.setHospitalProfile(res.data);
        return res.Message;
    }
   
   render() {
    return (        
        <div className="theme2">
            <Navigation />
            <div className="theme2_container">
                <Header />
                <div className="theme2_main_container">
                    <div className="theme2_body">
                        <SubHeader history={this.props.history} curPos={this.state.curPos}/>                  
                        <Switch>
                            <Route path="/main/hospital/changePassword" render={(props) => <ChangePassword {...props} setCurPos={this.setCurPos} updateDB={this.updateDB} />}/>
                            <Route path="/main/hospital" render={(props) => <Profile {...props} setCurPos={this.setCurPos} />} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalProfile);
