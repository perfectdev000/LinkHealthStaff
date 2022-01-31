import React from 'react';
import { connect } from 'react-redux';
import calendar from '../../../assets/images/calendar.png';
import DatePicker from "react-datepicker";
import ErrorState from "../components/errorState";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery';
import './modal3.css';
import { SET_DEGREE } from '../../../../constants/actionTypes';


const mapStateToProps = state => {
    return {
        degree: state.staffSignUp.degree
    }
};

const mapDispatchToProps = dispatch => ({
    setDegree: (data) => dispatch({type: SET_DEGREE, data})
});

class Modal3 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            degree: '',
            degreeName: '',
            collage: '',
            date: false,
            error: {
                degree: 'none',
                collage: 'none',
                date: 'none'
            }
        }
    }

    componentWillMount = async () => {
        this.setState({
            degree: this.props.degree.degree,
            collage: this.props.degree.collage,
            date: this.props.degree.receivedOn
        });
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            degree: newProps.degree.degree,
            collage: newProps.degree.collage,
            date: newProps.degree.receivedOn
        });
    } 

    setDegree = (e) => {
        if(e.target.value.length < 51){
            this.setState({degree: e.target.value, degreeName: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.degree = 'none';
                this.setState({error: error});
            }
        }
    }

    setCollage = (e) => {
        if(e.target.value.length < 51) {
            this.setState({collage: e.target.value});
            if(e.target.value !== ''){
                var error = this.state.error;
                error.collage = 'none';
                this.setState({error: error});
            }
        }
    }

    setDate = (date) => {
        this.setState({date: date});
        if(date !== ''){
            var error = this.state.error;
            error.date = 'none';
            this.setState({error: error});
        }
    }

    saveEducationDegree = () => {
        var degree = this.state.error.degree === 'block' || this.state.degree === '' ? 'block' : 'none';
        var collage = this.state.error.collage === 'block' || this.state.collage === '' ? 'block' : 'none';
        var date = this.state.error.date === 'block' || this.state.date === false ? 'block' : 'none';
        this.setState({error: {degree: degree, collage: collage, date: date}});

        if(degree === 'none' && collage === 'none' && date === "none"){
            $('#modal3').hide();
            this.props.setDegree({degree: this.state.degree, degreeName: this.state.degree, collage: this.state.collage, receivedOn: this.state.date});
        }
    }

    closeModal = () => {
        $('#modal3').hide();
        this.setState({
            degree: this.props.degree.degree,
            collage: this.props.degree.collage,
            date: this.props.degree.date,
            error: {
                degree: 'none',
                degreeName: '',
                collage: 'none',
                date: 'none'
            }
        });
    }

  render() {
    return (        
        <div id="modal3" className="w3-modal" style={{display: 'none'}} onScroll={(e)=>e.stopPropagation()}>
            <div className="w3-modal-content ssu2_modal1">
                <div className="w3-container">
                    <div className="ssu2_modal1_text1">
                        Add Degree
                    </div>
                    <hr style={{margin: '30px 0px 0px'}}/>
                    <div className="ssu2_modal3_text2">What’s your highest education level?</div>
                    <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                        <div className="input_left_icon">
                            <svg width="18" height="15" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 8.18182L15 0L0 8.18182L15 16.3636L30 8.18182ZM5.45455 13.8818V19.3364L15 24.5455L24.5455 19.3364V13.8818L15 19.0909L5.45455 13.8818Z" fill="#333333"/>
                            </svg>
                        </div>
                        <input className="ssu2_modal3_select" placeholder="Degree" type="text" value={this.state.degree} onChange={this.setDegree}
                              onKeyUp={(e)=>{if(e.key === 'Enter') this.saveEducationDegree()}}/>
                    </div>
                    <ErrorState show={this.state.error.degree} name="Degree is required." />
                    <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '30px'}}>
                        <div className="input_left_icon">
                            <svg width="18" height="15" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 0L0 6.53333L3.73333 8.21333V11.3867C2.61333 11.76 1.86667 12.88 1.86667 14C1.86667 15.12 2.61333 16.24 3.73333 16.6133V16.8L2.05333 20.72C1.49333 22.4 1.86667 24.2667 4.66667 24.2667C7.46667 24.2667 7.84 22.4 7.28 20.72L5.6 16.8C6.72 16.24 7.46667 15.3067 7.46667 14C7.46667 12.6933 6.72 11.76 5.6 11.3867V9.14667L14 13.0667L28 6.53333L14 0ZM22.2133 12.1333L13.8133 15.8667L9.33333 13.8133V14C9.33333 15.3067 8.77333 16.4267 7.84 17.36L8.96 19.9733V20.16C9.14667 20.9067 9.33333 21.6533 9.14667 22.4C10.4533 22.96 11.9467 23.3333 13.8133 23.3333C19.9733 23.3333 22.2133 19.6 22.2133 17.7333V12.1333Z" fill="#333333"/>
                            </svg>
                        </div>
                        <input className="ssu2_modal3_select" placeholder="College/University" type="text" value={this.state.collage} name="collage" onChange={this.setCollage}
                              onKeyUp={(e)=>{if(e.key === 'Enter') this.saveEducationDegree()}}/>
                    </div>
                    <ErrorState show={this.state.error.collage} name="College/University is required." />
                    <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                        <div className="input_left_icon"  onClick={()=>$(".ssu2_modal3_date").focus()}>
                            <img alt="img" width="18px" height="15px" src={calendar}/>
                        </div>
                        <DatePicker
                            className="ssu2_modal3_date"
                            placeholderText={'Date Received'}
                            selected={this.state.date}
                            onChange={(date) => this.setDate(date)}
                        />
                    </div>
                    <ErrorState show={this.state.error.date} name="Date Received is required." />
                    <hr style={{margin: '60px 0px 0px'}}/>
                    <div className="row ssu_bottom">
                        <button className="ssu2_modal1_button1" onClick={this.saveEducationDegree}> SAVE </button>
                        <button className="ssu2_modal1_button2" onClick={this.closeModal}> CANCEL </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal3);
