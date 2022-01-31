import React from 'react';

class Confirm extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            display: 'none'
        }
    }

    componentWillMount = () => {
        this.setState({display: this.props.display});
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({display: newProps.display});
    }

   render() {
    return (        
        <div className="w3-modal" style={{display: this.state.display}} >
            <div className="w3-modal-content ssu2_modal1" style={{maxHeight: 600, overflowY: 'auto'}}>
                <div className="w3-container">
                    <div className="ssu2_modal1_text1">
                        <h2>{this.props.title}</h2>
                    </div>
                    <hr className="t2_sp_hr" style={{margin: '30px 0px 0px'}}/>
                    <h4 style={{textAlign: 'center', marginTop: 30}}>{this.props.content}</h4>
                    <hr className="t2_sp_hr" style={{margin: '40px 0px 0px'}}/>
                    <div className="row ssu_bottom">
                        <button className="ssu2_modal1_button1" onClick={this.props.agreeFn?this.props.agreeFn:()=>console.log('agreeFn')}> DELETE </button>
                        <button className="ssu2_modal1_button2" onClick={this.props.disagreeFn?this.props.disagreeFn:()=>console.log('disagreeFn')}> CANCEL </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Confirm;
