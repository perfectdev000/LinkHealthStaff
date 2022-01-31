import React from 'react';
import logo from '../assets/images/mini-logo.svg';

class Pending extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            display: 'none'
        }
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({display: newProps.display});
    }

   render() {
    return (        
        <div style={{display: this.state.display}}  className="w3-modal">
            <div className="w3-modal-content ssu2_modal1" style={{width: 300, height: 300, marginTop: 100, borderRadius: 20}}>
                <img src={logo} alt='logo.png' width="120px" style={{marginLeft: 50, marginTop: 10}}/>
                <h4 style={{marginTop: 30, textAlign: 'center'}}> {this.props.title}</h4>
                <h4 style={{ textAlign: 'center'}}> Please Wait ... </h4>
            </div>
        </div>
    );
  }
}

export default Pending;
