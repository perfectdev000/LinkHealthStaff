import React from 'react';
import { connect } from 'react-redux';

import './global.css';
import logo from '../assets/images/Logo.png';
import tablet_btn from '../assets/images/tablet_btn.svg';
import { SET_CUR_POS } from '../../constants/actionTypes';

const mapStateToProps = state => {
  return {
    curPos: state.auth.curPos
  }};

const mapDispatchToProps = dispatch => ({
  setCurPos: (data) => dispatch({type: SET_CUR_POS, data})
});

class Header extends React.Component {

  openRightMenu = () => {
    document.getElementById("rightMenu").style.display = "block";
  }

  closeRightMenu = () => {
    document.getElementById("rightMenu").style.display = "none";
  }

  navTo = (to) => {
    this.props.history.push("/" + to);
    this.props.setCurPos(to);
    document.getElementById("rightMenu").style.display = "none";
  }

  render() {
    return (
      <div>
        <div className="outer_container">
          <div className="main_container">
            <div className="header_container">
              <div onClick={()=>this.navTo("")} className="header_logo"><img alt="img"src={logo} width="220px"/></div>
              <div onClick={(e)=>this.navTo("logIn")}  className={this.props.curPos==="logIn"?"header_nav header_nav_clicked":"header_nav"} style={{marginRight: '10px'}}>LOGIN</div>
              <div onClick={()=>this.navTo("signUp")}  className={this.props.curPos==="signUp"?"header_nav header_nav_clicked":"header_nav"}>SIGN UP</div>
              <div onClick={()=>this.navTo("aboutUs")}  className={this.props.curPos==="aboutUs"?"header_nav header_nav_clicked":"header_nav"}>ABOUT US</div>
              <div onClick={()=>this.navTo("hospital")} className={this.props.curPos==="hospital"?"header_nav header_nav_clicked":"header_nav"}>HOSPITAL</div>
              <div onClick={()=>this.navTo("staff")} className={this.props.curPos==="staff"?"header_nav header_nav_clicked":"header_nav"}>STAFF</div>
              <div onClick={()=>this.navTo("")} className={this.props.curPos===""?"header_nav header_nav_clicked":"header_nav"}>HOME</div>
      
              <button className="w3-button w3-xxlarge w3-right tablet_btn" onClick={this.openRightMenu}><img src={tablet_btn} alt='tablet_btn'/></button>
              <div className="w3-sidebar w3-bar-block w3-card w3-animate-right" style={{display:'none', right:0, marginTop: '-25px'}} id="rightMenu">
                <button onClick={this.closeRightMenu} className="w3-bar-item w3-button w3-large" style={{textAlign: 'right', marginTop: '5px'}}>{'X'}</button>
                <a onClick={()=>this.navTo("")} className={this.props.curPos===""?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>HOME</a>
                <a onClick={()=>this.navTo("staff")} className={this.props.curPos==="staff"?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>STAFF</a>
                <a onClick={()=>this.navTo("hospital")} className={this.props.curPos==="hospital"?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>HOSPITAL</a>
                <a onClick={()=>this.navTo("aboutUs")} className={this.props.curPos==="aboutUs"?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>ABOUT US</a>
                <a onClick={()=>this.navTo("signUp")} className={this.props.curPos==="signUp"?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>SIGN UP</a>
                <a onClick={(e)=>this.navTo("logIn")} className={this.props.curPos==="logIn"?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>LOG IN</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
