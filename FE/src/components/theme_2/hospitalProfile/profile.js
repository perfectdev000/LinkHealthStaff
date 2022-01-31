import React from 'react';
import { connect } from 'react-redux';
import Avatar from './components/avatar';
import Contact from './components/contact';
import Institution from './components/institution';
import Address from './components/address';
import Locations from './components/locations';

const mapStateToProps = state => {
  return {
  }};

const mapDispatchToProps = dispatch => ({
});

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentWillReceiveProps = (newProps) => {
    }

    componentWillMount = async () => {
      this.props.setCurPos('profile');
    }
   
   render() {
    return (
        <div>
            <Avatar history={this.props.history}/>
            <Contact />
            <Institution />
            <Address />
            <Locations />
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
