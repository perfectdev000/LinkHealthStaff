import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignUp from './logIn/signUp';
import StaffSignUp from './staffSignUp/staffSignUp';
import StaffSignUp_1 from './staffSignUp/staffSignUp_1';
import StaffSignUp_2 from './staffSignUp/staffSignUp_2';
import StaffSignUp_3 from './staffSignUp/staffSignUp_3';
import StaffSignUp_4 from './staffSignUp/staffSignUp_4';
import HospSignUp_1 from './hospSignUp/hospSignUp_1';
import HospSignUp_2 from './hospSignUp/hospSignUp_2';
import HospSignUp_3 from './hospSignUp/hospSignUp_3';
import LogIn from './logIn/logIn';
import ForgotPassword from './logIn/forgotPassword';
import AboutUs from './main/aboutUs';
import Hospital from './main/hospital';
import Staff from './main/staff';
import Landing from './landing';
import { store } from '../../store';
import { push } from 'react-router-redux';
import { SET_AUTH } from '../../constants/actionTypes';
import { callApi } from '../../action';

const mapStateToProps = state => {
  return {
    userName: state.auth.userName,
    userType: state.auth.userType
  }};

const mapDispatchToProps = dispatch => ({
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount = () => {
    const token = sessionStorage.getItem('status');
    if(token === 'logIn') {
      const userName = sessionStorage.getItem('userName');
      const userType = sessionStorage.getItem('userType');
      const data = {
        userName: userName,
        userType: userType
      }
      store.dispatch({type: SET_AUTH, data});
    }
  }

  componentDidMount = () => {    
    callApi('GET', '/v1/LHS/admin/init', null, {});
  }

  render() {
    return (
      <div>
        <Header userName={this.props.userName} history={this.props.history}/>
        <Switch>
          <Route path="/signUp" component={SignUp} />
          <Route path="/staffSignUp" component={StaffSignUp} />
          <Route path="/staffSignUp_1" component={StaffSignUp_1} />
          <Route path="/staffSignUp_2" component={StaffSignUp_2} />
          <Route path="/staffSignUp_3" component={StaffSignUp_3} />
          <Route path="/staffSignUp_4" component={StaffSignUp_4} />
          <Route path="/logIn" component={LogIn} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/hospSignUp_1" component={HospSignUp_1} />
          <Route path="/hospSignUp_2" component={HospSignUp_2} />
          <Route path="/hospSignUp_3" component={HospSignUp_3} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/hospital" component={Hospital} />
          <Route path="/staff" component={Staff} />
          <Route path="/" component={Landing} />
        </Switch>          
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
