import React from 'react';
import { connect } from 'react-redux';
import SubHeader from './components/subHeader';
import img from '../../assets/images/1-5.png';
import DatePicker from "react-datepicker";
import ErrorState from "./components/errorState";
import "react-datepicker/dist/react-datepicker.css";
import './staffSignUp.css';
import calendar from '../../assets/images/calendar.png';
import { SET_JOB_TYPE, SET_PAGE_VISITED, SET_CUR_POS } from '../../../constants/actionTypes';
import $ from 'jquery';


const mapStateToProps = state => {
  return {
    redo: state.staffSignUp.pageVisited,
    jobType: state.staffSignUp.jobType
  }};

const mapDispatchToProps = dispatch => ({
    setJobType: (data) => dispatch({ type: SET_JOB_TYPE, data}),
    setPageVisited: (data) => dispatch({ type: SET_PAGE_VISITED, data}),
    setCurPos: (data) => dispatch({type: SET_CUR_POS, data})
});

class StaffSignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        redo: [],
        startDate: false,
        error: 'none',
        natureErr: 'none',
        scheduleErr: 'none',
        weekendErr: 'none',
        permanentPos: false,
        tempPos: false,
        fullTime: false,
        partTime: false,
        availableWeekEnd: false,
        dateSelected: false
    }
  }
  
  componentWillMount = async () => {
    this.setState({
      redo: [...this.props.redo],
      startDate: this.props.jobType.startDate,
      permanentPos: this.props.jobType.permanentPos,
      tempPos: this.props.jobType.tempPos,
      fullTime: this.props.jobType.fullTime,
      partTime: this.props.jobType.partTime,
      availableWeekEnd: this.props.jobType.availableWeekEnd,
      dateSelected: this.props.jobType.dateSelected
    });
    this.props.setCurPos('signUp');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  continueToNext = async () => {
    var natureErr = this.state.permanentPos === false && this.state.tempPos === false ? 'flex' : 'none';
    var scheduleErr = this.state.fullTime === false && this.state.partTime === false ? 'flex' : 'none';
    var weekendErr = this.state.availableWeekEnd === '' ? 'flex' : 'none';
    var error = this.state.dateSelected === false || this.state.startDate === ''? 'flex' : 'none';
    if(natureErr === 'flex' || scheduleErr === 'flex' || weekendErr === 'flex' || error === 'flex') {
      this.setState({
        natureErr: natureErr,
        scheduleErr: scheduleErr,
        weekendErr: weekendErr,
        error: error
      });
    } else {
      var redo = this.props.redo;
      redo[0] = true;
      this.props.setPageVisited(redo);
      this.props.setJobType({
        redo: this.state.redo,
        startDate: this.state.startDate,
        permanentPos: this.state.permanentPos,
        tempPos: this.state.tempPos,
        fullTime: this.state.fullTime,
        partTime: this.state.partTime,
        availableWeekEnd: this.state.availableWeekEnd,
        dateSelected: this.state.dateSelected
      });
      this.props.history.push('/staffSignUp_1');      
    }
  }

  render() {
    return (
      <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
        <div className="main_container" style={{padding: '40px 0px 120px'}}>
          <div className="ssu_container">
            <SubHeader num="1" title="Job Type" redo={this.state.redo[0]} 
              next="/staffSignUp_1" prev={false} 
              history={this.props.history} img={img}/>
            <div className="ssu_body" style={{maxWidth: '1100px'}}>
              <div className="ssu_txt1">
                What is the nature of job you are looking for?
              </div>
              <div className="ssu_selBox1">
                <button className={"ssu_sel1 " + (this.state.permanentPos? 'ssu_sel_selected': '')}
                  onClick={()=>this.setState({permanentPos: !this.state.permanentPos, natureErr: 'none'})}>Permanent Position</button>
                <button className={"ssu_sel1 " + (this.state.tempPos? 'ssu_sel_selected': '')}
                  onClick={()=>this.setState({tempPos: !this.state.tempPos, natureErr: 'none'})}>Temporary position</button>                
              </div>
              <div className='ssu_selBox1' style={{marginTop: 20, display: this.state.natureErr}}>
                  <ErrorState show='block' name="Please Select At Least One Option from the Nature of Job." />                  
              </div>
              <div className="ssu_txt2">
                What is your preferred work schedule?
              </div>
              <div className="ssu_selBox1">
                <button className={"ssu_sel1 " + (this.state.fullTime? 'ssu_sel_selected': '')}
                  onClick={()=>this.setState({fullTime: !this.state.fullTime, scheduleErr: 'none'})}>Full Time <br/> (8hrs or more per day)</button>
                <button className={"ssu_sel1 " + (this.state.partTime? 'ssu_sel_selected': '')}
                  onClick={()=>this.setState({partTime: !this.state.partTime, scheduleErr: 'none'})}>Part Time <br/> (7hrs or less per day)</button>
              </div>
              <div className='ssu_selBox1' style={{marginTop: 20, display: this.state.scheduleErr}}>
                  <ErrorState show='block' name="Please Select Your Preferred Work Schedule." />                  
              </div>
              <div className="ssu_txt2">
                Are you available on weekends?
              </div>
              <div className="ssu_selBox1">
                <button className={"ssu_sel1 " + (this.state.availableWeekEnd === true ? 'ssu_sel_selected': '')}
                  onClick={()=>this.setState({availableWeekEnd: true, weekendErr: 'none'})}>Yes</button>
                <button className={"ssu_sel1 " + (this.state.availableWeekEnd === false ? 'ssu_sel_selected': '')}
                  onClick={()=>this.setState({availableWeekEnd: false, weekendErr: 'none'})}>No</button>
              </div>
              <div className='ssu_selBox1' style={{marginTop: 20, display: this.state.weekendErr}}>
                  <ErrorState show='block' name="Please Select Your Availability on Weekends." />                  
              </div>
              <div className="ssu_txt2">
                When are you able to start?
              </div>
              <div className="ssu_selBox2">
                <div className={"ssu_sel2_1 " + (this.state.startDate === false && this.state.dateSelected === true? 'ssu_sel_selected': '')}
                  onClick={()=>this.setState({startDate: false, error: 'none', dateSelected: true})}>Immediately</div>
                <div className={"ssu_sel2_2 " + (this.state.startDate !== false && this.state.dateSelected === true ? 'ssu_sel_selected': '')}
                  onClick={()=>this.setState({startDate: '', dateSelected: true, error: 'none'})}>I have a specific date</div>
              </div>
              <div className="ssu_datePickerBox ssu2_modal3_selectBox" style={{display: this.state.startDate !== false && this.state.dateSelected === true ? "block" : "none"}}>
                  <DatePicker
                      className="ssu_datePicker"
                      placeholderText={'MM/DD/YYYY'}
                      selected={this.state.startDate}
                      onChange={(date) => this.setState({startDate: date, error: "none", dateSelected: true})}
                  />
                  <div style={{position: 'absolute', top: '11px', right: '21px', width: '18px', height: '15px', cursor: 'pointer'}} onClick={()=>$(".ssu_datePicker").focus()}>
                      <img alt="img"src={calendar} width="100%" height="auto"/>
                  </div>
              </div>              
              <div className="ssu_selBox1" style={{marginTop: '20px', display: this.state.error}}>
                <ErrorState show='block' name="Please Select Your Start Date." />
              </div>
            </div>
            <hr className="ssu_hr"/>
            <div className="ssu_bottom">
              <div className="ssu_button" onClick={this.continueToNext}>CONTINUE</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffSignUp);