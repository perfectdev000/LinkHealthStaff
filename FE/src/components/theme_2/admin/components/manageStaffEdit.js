import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../../../store';
import ManageStaffProfile from './manageStaffProfile';

const mapStateToProps = state => {
  return { 
      staff: state.staffProfile
  }};

const mapDispatchToProps = dispatch => ({
});

class ManageStaffEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            staff: {},
            curPos: ''
        }
    }

    componentWillMount = () => {
        this.props.setCurPos('manageStaff');
        this.initState(this.props);     
    }

    componentWillReceiveProps = (props) => {
        this.initState(props);
    }

    initState = (props) => {
        this.setState({
            staff: props.staff,
            curPos: props.curPos
        })
    }

    toManageStaff = () => {
        history.push('/main/admin/manageStaff');
    }
   
   render() {
    return (
        <React.Fragment>
            <p> <span onClick={this.toManageStaff} style={{color: '#009CDE', fontSize: 16, cursor: 'pointer'}}>{'<'} Manage Staff </span> &nbsp; / &nbsp; {this.state.staff.name} </p>
            <div className="theme2_body"> 
                <div className="t2_sp_work" style={{marginTop: 0}}>  
                    <div className="row text-center">
                        <h1> Sub Header Nav Part </h1>
                    </div> 
                    <hr/>                        
                    <Switch>
                        <Route path="/main/admin/manageStaffEdit/" render={(props) => <ManageStaffProfile {...props}/>}/>
                    </Switch>
                </div>
            </div>
        </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaffEdit);
