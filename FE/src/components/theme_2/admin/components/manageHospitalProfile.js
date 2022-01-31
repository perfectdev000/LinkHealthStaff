import React from 'react';
import { connect } from 'react-redux';
import Contact from '../../hospitalProfile/components/contact';
import Institution from '../../hospitalProfile/components/institution';
import Address from '../../hospitalProfile/components/address';
import Locations from '../../hospitalProfile/components/locations';
import { history } from '../../../../store';

const mapStateToProps = state => {
  return {
    _id: state.hospitalProfile._id,
  }};

const mapDispatchToProps = dispatch => ({
});

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentWillMount = () => {
        if(this.props._id === '')
            history.push('/main/admin/manageHospital');
        this.initState(this.props);
    }
    componentWillReceiveProps = (newProps) => {
        this.initState(this.props);
    }

    initState = () => {

    }
   
   render() {
    return (
        <div>
            <Contact admin={true}/>
            <Institution admin={true} />
            <Address admin={true} />
            <Locations admin={true} />
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
