import React from 'react';
import './t2_sp.css'; 

class SubHeader extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showDropDown1: 'none',
      showDropDown2: 'none',
      showDropDown3: 'none',
      navSelected: [false, false, false, false, false ]
    }
  }

  componentWillReceiveProps = (props) => {
    if(props.curPos === 'profile')
      this.setState({navSelected: [true, false, false, false, false]});
    else if(props.curPos === 'contactDetails')
      this.setState({navSelected: [false, true, false, false, false]});
    else if(props.curPos === 'resumeDetail')
      this.setState({navSelected: [false, false, true, false, false]});
    else if(props.curPos === 'accountDetails')
      this.setState({navSelected: [false, false, false, true, false]});
    else if(props.curPos === 'changePassword')
      this.setState({navSelected: [false, false, false, false, true]});
  }

  selectItem = (num) => {
    const staticLink = "/main/staff";
    const link = ["/", "/contactDetails", '/resumeDetail', "/accountDetails", "/changePassword" ]
    var selArr = this.state.navSelected;
    for(var i = 0; i < selArr.length; i++){
      if( i === num ){
        selArr[i] = true;
        console.log(staticLink + link[i]);
        this.props.history.push(staticLink + link[i]);
      } else {
        selArr[i] = false;
      }
      this.setState({navSelected: selArr});
    }
  }

  render() {
    return (
      <div>
        <div className="t2_subHeader">
          <button onClick={() => this.selectItem(0)} className={this.state.navSelected[0]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> My Profile </button>
          <button onClick={() => this.selectItem(1)} className={this.state.navSelected[1]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Contact Information </button>        
          <button onClick={() => this.selectItem(2)} className={this.state.navSelected[2]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Resume </button>
          <button onClick={() => this.selectItem(3)} className={this.state.navSelected[3]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Account Information </button>
          <button onClick={() => this.selectItem(4)} className={this.state.navSelected[4]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Change Password </button>
        </div>
        <div className="t2_subHeader_1">
          <button onClick={() => this.selectItem(0)} className={this.state.navSelected[0]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> My Profile </button>
          <button onClick={() => this.selectItem(1)} className={this.state.navSelected[1]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Contact Information </button>        
          <button onClick={() => this.selectItem(2)} className={this.state.navSelected[2]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Resume </button> 
          <button onClick={() => this.selectItem(3)} className={this.state.navSelected[3]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Account Information </button>       
          <button className="w3-button w3-xlarge w3-right tablet_btn" onClick={()=>this.setState({showDropDown1: 'block'})}>&#9776;</button>
          <div className="w3-sidebar w3-bar-block w3-card w3-animate-right t2_dropdown" style={{display:this.state.showDropDown1, width: '250px'}} id="rightMenu">
            <button onClick={()=>this.setState({showDropDown1: 'none'})} className="w3-bar-item w3-button w3-large" style={{textAlign: 'right'}}>{'X'}</button>
            <a onClick={() => this.selectItem(4)} className={this.state.navSelected[4]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>Change Password</a>
          </div>
        </div>        
        <div className="t2_subHeader_2">
          <button onClick={() => this.selectItem(0)} className={this.state.navSelected[0]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> My Profile </button>
          <button onClick={() => this.selectItem(1)} className={this.state.navSelected[1]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Contact Information </button>      
          <button className="w3-button w3-xlarge w3-right tablet_btn" onClick={()=>this.setState({showDropDown2: 'block'})}>&#9776;</button>
          <div className="w3-sidebar w3-bar-block w3-card w3-animate-right t2_dropdown" style={{display:this.state.showDropDown2, width: '250px'}} id="rightMenu">
            <button onClick={()=>this.setState({showDropDown2: 'none'})} className="w3-bar-item w3-button w3-large" style={{textAlign: 'right'}}>{'X'}</button>
            <a onClick={() => this.selectItem(2)} className={this.state.navSelected[2]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>Resume</a>
            <a onClick={() => this.selectItem(3)} className={this.state.navSelected[3]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>Account Information</a>
            <a onClick={() => this.selectItem(4)} className={this.state.navSelected[4]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>Change Password</a>
          </div>
        </div>        
        <div className="t2_subHeader_3">   
          <button className="w3-button w3-xlarge w3-right tablet_btn" onClick={()=>this.setState({showDropDown3: 'block'})}>&#9776;</button>
          <div className="w3-sidebar w3-bar-block w3-card w3-animate-right t2_dropdown" style={{display:this.state.showDropDown3, width: '250px'}} id="rightMenu">
            <button onClick={()=>this.setState({showDropDown3: 'none'})} className="w3-bar-item w3-button w3-large" style={{textAlign: 'right'}}>{'X'}</button>
            <a onClick={() => this.selectItem(0)} className={this.state.navSelected[0]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>My Profile</a>
            <a onClick={() => this.selectItem(1)} className={this.state.navSelected[1]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>Contact Information</a>
            <a onClick={() => this.selectItem(2)} className={this.state.navSelected[2]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>Resume</a>
            <a onClick={() => this.selectItem(3)} className={this.state.navSelected[3]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>Account Information</a>
            <a onClick={() => this.selectItem(6)} className={this.state.navSelected[4]?"w3-bar-item w3-button w3-large w3-blue":"w3-bar-item w3-button w3-large"}>Change Password</a>
          </div>
        </div>
    </div>
    );
  }
}

export default SubHeader;
