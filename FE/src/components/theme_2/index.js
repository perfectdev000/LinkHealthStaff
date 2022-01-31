import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StaffProfile from './staffProfile';
import HospitalProfile from './hospitalProfile';
import AdminDashboard from './admin';
import Others from './others';
import Redirect from './redirect';
import "../assets/w3.css";
import "./theme2.css";

class Main extends React.Component {
   render() {
    return (
            <Switch>
                <Route path="/main/staff/others" component={Others} />
                <Route path="/main/hospital/others" component={Others} />
                <Route path="/main/admin/" component={AdminDashboard} />
                <Route path="/main/staff" component={StaffProfile}/>
                <Route path="/main/hospital" component={HospitalProfile}/>                            
                <Route path="/main/" component={Redirect} />
            </Switch>
    );
  }
}

export default Main;
