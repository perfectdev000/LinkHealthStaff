import React from 'react';
import { connect } from 'react-redux';
import search from '../../assets/images/search.svg';
import avatar from '../../assets/images/admin.svg';
import { history } from '../../../store';
import { removeSession } from '../../../action';

const mapStateToProps = state => {
  return {
    auth: state.auth
  }};

const mapDispatchToProps = dispatch => ({
});

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          type: '',
          name: 'Olivia',
          title: 'Profile',
          avatar: '',
          badge: true,
          search: ''
        }
    }
    componentWillMount() {
      this.initState(this.props);
    }
    componentWillReceiveProps = (newProps) => {
      this.initState(newProps);
    }
    initState = (props) => {
      this.setState({
        type: props.auth.type,
        name: props.auth.name,
        title: props.auth.title
      })
    }

    search = (e) => {
      this.setState({search: e.target.value});
    }

    logOut = () => {
      removeSession();
      history.push('/login');
    }
   
   render() {
    return (
        <div className="theme2_header">
            {this.state.title}
            <div className="theme2_header_item">
              <div className="theme2_header_avatar_container">
                <div className="theme2_header_avatar_img">
                  <img width="100%" src={avatar} alt="avatar.png" style={{borderRadius: '50%'}} onClick={this.logOut}/>
                </div>
                <b className="theme2_header_avatar_name"> {this.state.name} </b>
              </div>
              {/* <div className="theme2_header_search_container">
                <img className="theme2_header_search_img" alt="search.svg" src={search}/>
                <input className="theme2_header_search" placeholder="Search" type="text" value={this.state.search} onChange={this.search}/>
              </div> */}
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
