import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import profile from '../../../assets/images/profile.svg';
import calendar from '../../../assets/images/calendar.png';
import FileBrowser from "./fileBrowser";
import ErrorState from "./errorState";
import { SET_SELECTED_LICENCE, UPDATE_LICENCE } from '../../../../constants/actionTypes';
import './modal1.css';
import $ from 'jquery';

const mapStateToProps = state => {
    return {
        nurseLicence: state.staffSignUp.nurseLicence,
        selectedLicence: state.staffSignUp.selectedLicence
    }
};

const mapDispatchToProps = dispatch => ({
  setSelectedLicence: (data) => dispatch({ type: SET_SELECTED_LICENCE, data}),
  updateLicence: (data) => dispatch({type: UPDATE_LICENCE, data})
});

class Modal1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: false,
            expDate: false,
            lname: '',
            lnum: '',
            imgUrl: '',
            error: {
                lname: 'none',
                lnum: 'none',
                expDate: 'none',
                lfile: 'none'
            },
            delFile: false
        }
    }

    componentWillReceiveProps = (newProps) => { 
        if(newProps.selectedLicence.state !== false){
            var state = newProps.selectedLicence.state;
            var licence = newProps.nurseLicence[state].licences[0];
            this.setState({
                expDate: licence.expDate, 
                lname: licence.name, 
                lnum: licence.number, 
                file: licence.image,
                imgUrl: licence.imgUrl
            });
        }
    }

    updateLicence = () => {
        var state = {
            image: this.state.file,
            imgUrl: this.state.imgUrl,
            name: this.state.lname,
            number: this.state.lnum,
            expDate: this.state.expDate,
            num:this.props.selectedLicence.num ,
            state: this.props.selectedLicence.state
        }        
        var nurseLicence = this.props.nurseLicence;
        nurseLicence[this.props.selectedLicence.state].licences[this.props.selectedLicence.num] = {...state};
        this.props.updateLicence(nurseLicence);
    }

    handleSave = () => {
        var state = this.state;

        var lname = state.error.lname === 'block' || state.lname === "" ? "block" : "none";   
        var lnum = state.error.lnum === 'block' || state.lnum === "" ? "block" : "none"; 
        var expDate = state.error.expDate === 'block' || state.expDate === false ? "block" : "none";
        var lfile = state.error.lfile === 'block' || state.file === false ? "block" : "none"; 
        var temp = {
            lname: lname,
            lnum: lnum,
            expDate: expDate,
            lfile: lfile,
        }    
        this.setState({error: {...temp}}); 
        this.setState({delFile: false});     

        if(lname === 'none' && lnum === 'none' && expDate === 'none' && lfile === 'none'){
            if(this.props.selectedLicence.num===false)
                this.props.setLicence(state);
            else 
                this.updateLicence();
            this.modalClose();
        }       
    };

    setFile = (file) => {
        this.setState({file: file});
    }

    showFileErr = () => {
        var err = this.state.error;
        err.lfile = "block";
        this.setState({error: err});
    }
    hideFileErr = () => {
        var err = this.state.error;
        err.lfile = "none";
        this.setState({error: err});
    }

    setImgUrl = (url) => {
        this.setState({imgUrl: url})
    }

    modalClose = () => {
        var state = {
            file: false,
            expDate: false,
            lname: '',
            lnum: '',
            imgUrl: '',
            error: {
                lname: 'none',
                lnum: 'none',
                expDate: 'none',
                lfile: 'none'
            },
            delFile: false
        }
        this.setState(state);
        this.props.setSelectedLicence({num: false, state: false});
        $("#modal1").hide();
    }

    setDelFile = (del) => {
        this.setState({delFile: del});
        if(del && this.state.error.lfile==='block')
            this.hideFileErr();
    }

    setLicenceName = (e) => {
        if(e.target.value.length < 51){
            this.setState({lname: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.lname = 'none';
                this.setState({error: error});
            }
        }
    }

    setLicenceNum = (e) => {
        if(e.target.value.length < 51){
            this.setState({lnum: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.lnum = 'none';
                this.setState({error: error});
            }
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

   render() {
    return (        
        <div id="modal1" className="w3-modal" style={{display: 'none'}} >
            <div className="w3-modal-content ssu2_modal1" style={{maxHeight: 600, overflowY: 'auto'}}>
                <div className="w3-container">
                    <div className="ssu2_modal1_text1">
                        Add License
                    </div>
                    <hr style={{margin: '30px 0px 0px'}}/>
                    <div className="ssu2_modal1_input">
                        <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                            <div className="input_left_icon">
                                <img width="22px" height="17px" alt="img"src={profile}/>
                            </div>
                            <input className="ssu2_modal3_select" placeholder="License Name" type="text" value={this.state.lname}
                              onChange={this.setLicenceName}
                              onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                        </div>
                        <ErrorState show={this.state.error.lname} name="License Name" />
                    </div>
                    <div className="ssu2_modal1_input">
                        <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '18px'}}>
                            <div className="input_left_icon">
                                <img width="22px" height="17px" alt="img"src={profile}/>
                            </div>
                            <input className="ssu2_modal3_select" placeholder="License Number" type="text" value={this.state.lnum}
                              onChange={this.setLicenceNum}
                              onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                        </div>
                        <ErrorState show={this.state.error.lnum} name="License Number is required." />
                    </div>
                    <div className="ssu2_modal1_input" style={{marginTop: '18px'}}>
                        <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                            <div className="input_left_icon"  onClick={()=>$(".ssu2_modal3_date").focus()}>
                                <img width="22px" height="17px" alt="img"src={calendar}/>
                            </div>
                            <DatePicker
                                className="ssu2_modal3_date"
                                placeholderText={'Expiration Date'}
                                selected={this.state.expDate}
                                onChange={(date) => this.setExpDate(date)}
                            />
                        </div>
                        <ErrorState show={this.state.error.expDate} name="Date Received is required." />
                    </div>
                    <div className="ssu2_modal1_text2">
                        Please upload your license
                    </div>
                    <FileBrowser setFile={this.setFile}  validateImage={true} showFileErr={this.showFileErr} title="LICENSE" 
                      hideFileErr={this.hideFileErr} setImgUrl={this.setImgUrl} file={this.state.file} setDelFile={this.setDelFile}/>
                    <ErrorState show={this.state.error.lfile} name="The PNG, JPEG, JPG file is required." />
                    <hr style={{margin: '60px 0px 0px'}}/>
                    <div className="row ssu_bottom">
                        <button className="ssu2_modal1_button1" onClick={this.handleSave}> SAVE </button>
                        <button className="ssu2_modal1_button2" onClick={this.modalClose}> CANCEL </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal1);
