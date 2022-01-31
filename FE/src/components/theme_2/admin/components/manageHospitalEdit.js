import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../../../store';
import ManageHospitalProfile from './manageHospitalProfile';

const mapStateToProps = state => {
  return { 
      hospital: state.hospitalProfile
  }};

const mapDispatchToProps = dispatch => ({
});

class ManageHospitalEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hospital: {},
            curPos: ''
        }
    }

    componentWillMount = () => {
        this.props.setCurPos('manageHospital');
        this.initState(this.props);     
    }

    componentWillReceiveProps = (props) => {
        this.initState(props);
    }

    initState = (props) => {
        this.setState({
            hospital: props.hospital,
            curPos: props.curPos
        })
    }

    toManageHospital = () => {
        history.push('/main/admin/manageHospital');
    }
   
   render() {
    return (
        <React.Fragment>
            <p> <span onClick={this.toManageHospital} style={{color: '#009CDE', fontSize: 16, cursor: 'pointer'}}>{'<'} Manage Hospital </span> &nbsp; / &nbsp; {this.state.hospital.name} </p>
            <div className="theme2_body"> 
                <div className="t2_sp_work" style={{marginTop: 0}}>  
                    <div className="row text-center">
                        <h1> Sub Header Nav Part </h1>
                    </div> 
                    <hr/>                        
                    <Switch>
                        <Route path="/main/admin/manageHospitalEdit/" render={(props) => <ManageHospitalProfile {...props}/>}/>
                    </Switch>
                </div>
            </div>
        </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageHospitalEdit);
