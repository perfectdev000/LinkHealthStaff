import React from 'react';
import { connect } from 'react-redux';
import calendar from '../../../assets/images/calendar.png';
import ErrorState from "../components/errorState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery';
import './modal3.css';
import { SET_CERT, SET_SELECTED_CERT } from '../../../../constants/actionTypes';


const mapStateToProps = state => {
    return {
        cert: state.staffSignUp.cert,
        selectedCert: state.staffSignUp.selectedCert
    }
};

const mapDispatchToProps = dispatch => ({
    setSelectedCert: (data) => dispatch({type: SET_SELECTED_CERT, data}),
    setCert: (data) => dispatch({type: SET_CERT, data})
});

class Modal4 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cert: '',
            certName: '',
            auth: '',
            expDate: false,
            recDate: false,
            selectedCert: false,
            error: {
                cert: 'none',
                auth: 'none',
                expDate: 'none',
                recDate: 'none'
            }
        }
    }

    componentWillMount = async () => {
        if(this.props.selectedCert!==false && this.props.selectedCert < this.props.cert.length){
            this.setState({
                cert: this.props.cert[this.props.selectedCert].cert,
                auth: this.props.cert[this.props.selectedCert].auth,
                recDate: this.props.cert[this.props.selectedCert].receivedOn,
                expDate: this.props.cert[this.props.selectedCert].expirationDate,
                selectedCert: this.props.selectedSert
            });
        } else {
            this.setState({
                cert: '',
                auth: '',
                expDate: false,
                recDate: false,
                selectedCert: this.props.selectedSert
            })
        }
    }
  
    componentWillReceiveProps = (newProps) => { 
        if(newProps.selectedCert !==false && newProps.selectedCert < newProps.cert.length){
            this.setState({
                cert: newProps.cert[newProps.selectedCert].cert,
                auth: newProps.cert[newProps.selectedCert].auth,
                recDate: newProps.cert[newProps.selectedCert].receivedOn,
                expDate: newProps.cert[newProps.selectedCert].expirationDate,
                selectedCert: newProps.selectedCert
            });
        } else {
            this.setState({
                cert: '',
                certName: '',
                auth: '',
                expDate: false,
                recDate: false,
                selectedCert: newProps.selectedCert
            });
        }
    }


    setCert = (e) => {
        if(e.target.value.length < 51){
            this.setState({cert: e.target.value, certName: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.cert = 'none';
                this.setState({error: error});
            }
        }
    }

    setAuth = (e) => {
        if(e.target.value.length < 51){
            this.setState({auth: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.auth = 'none';
                this.setState({error: error});
            }
        }
    }

    setRecDate = (date) => {
        this.setState({recDate: date});
        if(date !== ''){
            var error = this.state.error;
            error.recDate = 'none';
            this.setState({error: error});
        }
    }

    setExpDate = (date) => {
        this.setState({expDate: date});
        if(date !== ''){
            var error = this.state.error;
            error.expDate = 'none';
            this.setState({error: error});
        }
    }

    saveCert = () => {
        var cert = this.state.error.cert === 'block' || this.state.cert === '' ? 'block' : 'none';
        var auth = this.state.error.auth === 'block' || this.state.auth === '' ? 'block' : 'none';
        var recDate = this.state.error.recDate === 'block' || this.state.recDate === false ? 'block' : 'none';
        var expDate = this.state.error.expDate === 'block' || this.state.expDate === false ? 'block' : 'none';

        this.setState({
            error: {
                cert: cert,
                auth: auth,
                recDate: recDate,
                expDate: expDate
            }
        });

        if(cert === "none" && auth === "none" && recDate === "none" && expDate === "none"){        
            var certification = this.props.cert;
            var temp = {
                cert: this.state.cert,
                certName: this.state.cert,
                auth: this.state.auth,
                receivedOn: this.state.recDate,
                expirationDate: this.state.expDate,
                num: this.state.selectedCert
            };
            if(!this.props.cert.length || this.state.selectedCert < this.props.cert.length){
                certification[this.state.selectedCert] = {...temp};
            } else {
                certification.push(temp);
            }
            this.props.setCert(certification);
            this.closeModal();
        }
    }

    closeModal = () => {
        $('#modal4').hide();
        this.props.setSelectedCert(false);
        this.setState({
            cert: '',
            certName: '',
            auth: '',
            expDate: false,
            recDate: false,
            selectedCert: this.props.selectedSert,
            error: {
                cert: 'none',
                auth: 'none',
                expDate: 'none',
                recDate: 'none'
            }
        });
    }

  render() {
    return (        
        <div id="modal4" className="w3-modal" style={{display: 'none'}} onScroll={(e)=>e.stopPropagation()}>
            <div className="w3-modal-content ssu2_modal1">
                <div className="w3-container">
                    <div className="ssu2_modal1_text1">
                        Add Certification
                    </div>
                    <hr style={{margin: '30px 0px 0px'}}/>
                    <div className="ssu2_modal3_text2">What certifications do you have?</div>
                    <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                        <div className="input_left_icon">
                            <svg width="20" height="17" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 8.18182L15 0L0 8.18182L15 16.3636L30 8.18182ZM5.45455 13.8818V19.3364L15 24.5455L24.5455 19.3364V13.8818L15 19.0909L5.45455 13.8818Z" fill="#333333"/>
                            </svg>
                        </div>
                        <input className="ssu2_modal3_select" placeholder="Certification" type="text" value={this.state.cert} onChange={this.setCert}
                              onKeyUp={(e)=>{if(e.key === 'Enter') this.saveCert()}}/>
                    </div>
                    <ErrorState show={this.state.error.cert} name="Certification is required." />
                    <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                        <div className="input_left_icon">
                            <svg width="20" height="17" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 0L0 6.53333L3.73333 8.21333V11.3867C2.61333 11.76 1.86667 12.88 1.86667 14C1.86667 15.12 2.61333 16.24 3.73333 16.6133V16.8L2.05333 20.72C1.49333 22.4 1.86667 24.2667 4.66667 24.2667C7.46667 24.2667 7.84 22.4 7.28 20.72L5.6 16.8C6.72 16.24 7.46667 15.3067 7.46667 14C7.46667 12.6933 6.72 11.76 5.6 11.3867V9.14667L14 13.0667L28 6.53333L14 0ZM22.2133 12.1333L13.8133 15.8667L9.33333 13.8133V14C9.33333 15.3067 8.77333 16.4267 7.84 17.36L8.96 19.9733V20.16C9.14667 20.9067 9.33333 21.6533 9.14667 22.4C10.4533 22.96 11.9467 23.3333 13.8133 23.3333C19.9733 23.3333 22.2133 19.6 22.2133 17.7333V12.1333Z" fill="#333333"/>
                            </svg>
                        </div>
                        <input className="w3-select ssu2_modal3_select" placeholder="Certifying Authority" type="text" 
                          value={this.state.auth} onChange={this.setAuth}
                          onKeyUp={(e)=>{if(e.key === 'Enter') this.saveCert()}}/>
                    </div>
                    <ErrorState show={this.state.error.auth} name="Certifying Authority is required." />
                    <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                        <div className="input_left_icon"  onClick={()=>$("#recDate").focus()}>
                            <img width="18px" height="15px" alt="img"src={calendar}/>
                        </div>
                        <DatePicker
                            id="recDate"
                            className="ssu2_modal3_date"
                            placeholderText={'Date Received'}
                            selected={this.state.recDate}
                            onChange={(date) => this.setRecDate(date)}
                        />
                    </div>                    
                    <ErrorState show={this.state.error.recDate} name="Date received is required." />
                    <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                        <div className="input_left_icon" onClick={()=>$("#expDate").focus()}>
                            <img width="18px" height="15px" alt="img"src={calendar}/>
                        </div>
                        <DatePicker
                            id="expDate"
                            className="ssu2_modal3_date"
                            placeholderText={'Expiration Date'}
                            selected={this.state.expDate}
                            onChange={(date) => this.setExpDate(date)}
                        />
                    </div>                    
                    <ErrorState show={this.state.error.expDate} name="Expiration date is required." />
                    <hr style={{margin: '60px 0px 0px'}}/>
                    <div className="row ssu_bottom">
                        <button className="ssu2_modal1_button1" onClick={this.saveCert}> SAVE </button>
                        <button className="ssu2_modal1_button2" onClick={this.closeModal}> CANCEL </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal4);
