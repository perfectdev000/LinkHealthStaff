import React from 'react';
import { connect } from 'react-redux';
import keyhole from '../../../assets/images/keyhole.svg';
import ErrorState from "../components/errorState";
import { SET_INSURANCE } from '../../../../constants/actionTypes';
import $ from 'jquery';


const mapStateToProps = state => {
    return {
        insurance: state.staffSignUp.insurance
    }
};

const mapDispatchToProps = dispatch => ({
    setInsurance: (data) => dispatch({type: SET_INSURANCE, data})
});

class Modal2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            provider: '',
            number: '',
            error: {
                provider: 'none',
                number: 'none'
            }
        }
    }

    componentWillMount = () => {
        this.setState({
            provider: this.props.insurance.provider,
            number: this.props.insurance.number
        })
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            provider: newProps.insurance.provider,
            number: newProps.insurance.number
        })
    }
    
    setProvider = (e) => {
        if(e.target.value.length < 51){
            this.setState({provider: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.provider = 'none';
                this.setState({error: error});
            }
        }
    }

    setNumber = (e) => {
        if(e.target.value.length < 51){
            this.setState({number: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.number = 'none';
                this.setState({error: error});
            }
        }
    }

    setInsurance = () => {
        var provider = this.state.error.provider === 'block' || this.state.provider === '' ? 'block' : 'none';
        var number = this.state.error.number === 'block' || this.state.number === '' ? 'block' : 'none';
        this.setState({error: {provider: provider, number: number}});

        if(provider === 'none' && number === 'none'){
            this.props.setInsurance({provider: this.state.provider, number: this.state.number});
            $('#modal2').hide();
        }
    }

    closeModal = () => {
        $('#modal2').hide();
        this.setState({
            provider: this.props.insurance.provider,
            number: this.props.insurance.number,
            error: {
                provider: 'none',
                number: 'none'
            }
        });
    }

  render() {
    return (        
        <div id="modal2" className="w3-modal" style={{display: 'none'}} onScroll={(e)=>e.stopPropagation()}>
            <div className="w3-modal-content ssu2_modal1">
                <div className="w3-container">
                    <div className="ssu2_modal1_text1">
                        Add Liability Insurance
                    </div>
                    <hr style={{margin: '30px 0px 0px'}}/>
                    <div className="ssu2_modal1_input" style={{marginTop: '30px'}}>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="22px" height="23px" alt="img"src={keyhole} style={{marginTop: '-3px'}} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Insurance Provider" type="text" value={this.state.provider} onChange={this.setProvider}
                              onKeyUp={(e)=>{if(e.key === 'Enter') this.setInsurance()}}/>
                            </div>
                            <ErrorState show={this.state.error.provider} name="Insurance Provider is required." />
                        </div>
                    </div>
                    <div className="ssu2_modal1_input">
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="22px" height="23px" alt="img"src={keyhole} style={{marginTop: '-3px'}} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Policy Number" type="text" value={this.state.number} onChange={this.setNumber}
                              onKeyUp={(e)=>{if(e.key === 'Enter') this.setInsurance()}}/>
                            </div>
                            <ErrorState show={this.state.error.number} name="Policy Number is required." />
                        </div>
                    </div>
                    <hr style={{margin: '30px 0px 0px'}}/>
                    <div className="row ssu_bottom">
                        <button className="ssu2_modal1_button1" onClick={this.setInsurance}> SAVE </button>
                        <button className="ssu2_modal1_button2" onClick={this.closeModal}> CANCEL </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal2);
