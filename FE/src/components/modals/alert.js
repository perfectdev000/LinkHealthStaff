import React from 'react';

class Alert extends React.Component { 
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
        <div style={{display: this.state.display}}  className="w3-modal">
            <div style={{maxHeight: 600, overflowY: 'auto'}} className="w3-modal-content ssu2_modal1">
                <div className="w3-container">
                    <div className="ssu2_modal1_text1">
                        <h2>{this.props.title}</h2>
                    </div>
                    <hr style={{margin: '30px 0px 0px'}} className="t2_sp_hr"/>
                    <h4 style={{ marginTop: 30,textAlign: 'center'}}>{this.props.content}</h4>
                    <hr className="t2_sp_hr" style={{margin: '40px 0px 0px'}}/>
                    <div className="row ssu_bottom">
                        <div className="ssu_button" onClick={this.props.agreeFn}> OK </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Alert;
