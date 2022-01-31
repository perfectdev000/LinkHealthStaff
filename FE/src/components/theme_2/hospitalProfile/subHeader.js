import React from 'react';
import './t2_hp.css';

class SubHeader extends React.Component {
  constructor(props){
    super(props);
    this.state={
      navSelected: [false, false]
    }
  }

  componentDidMount = () => {
    if(this.props.curPos === 'profile')
      this.setState({navSelected: [true, false]});
    else
      this.setState({navSelected: [false, true]});
  }

  componentWillReceiveProps = (newProps) => {
    if(newProps.curPos === 'profile')
      this.setState({navSelected: [true, false]});
    else
      this.setState({navSelected: [false, true]});
  }

  selectItem = (num) => {
    const staticLink = "/main/hospital";
    const link = ["/", "/changePassword" ];
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
        <div className="t2_hospHeader">
          <button onClick={() => this.selectItem(0)} className={this.state.navSelected[0]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> My Profile </button>
          <button onClick={() => this.selectItem(1)} className={this.state.navSelected[1]?"t2_subHeader_item t2_subHeader_item_clicked":"t2_subHeader_item"}> Change Password </button>
        </div>
    </div>
    );
  }
}

export default SubHeader;
