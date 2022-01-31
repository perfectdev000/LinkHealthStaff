import React from 'react';
import { connect } from 'react-redux';
import search from '../../assets/images/search.svg';
import avatar from '../../assets/images/avatar.png';
import badge from '../../assets/images/badge.png';

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
        avatar: props.auth.avatar!==''?props.auth.avatar:avatar,
        // badge: props.badge
      })
    }

    search = (e) => {
      this.setState({search: e.target.value});
    }
   
   render() {
    return (
        <div className="theme2_header">
            {this.state.title}
            <div className="theme2_header_item">
              <div className="theme2_header_avatar_container">
                <div className="theme2_header_avatar_img">
                  <img width="100%" src={this.state.avatar} alt="avatar.png" style={{borderRadius: '50%'}}/>
                  {/* <img src={badge} alt="badge.png" className="theme2_header_badge" style={{display: this.state.badge?"block":"none"}}/> */}
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
