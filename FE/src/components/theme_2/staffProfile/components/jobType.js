import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import $ from 'jquery';
import { setSession, callApi } from '../../../../action';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';

const mapStateToProps = state => {
  return {
        _id: state.staffProfile._id,
      natureOfJob: state.staffProfile.natureOfJob,
      workSchedule: state.staffProfile.workSchedule,
      weekendAvailiblity: state.staffProfile.weekendAvailiblity,
      immediatelyStart: state.staffProfile.immediatelyStart,
      startWorkdate: state.staffProfile.startWorkdate
  }};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class JobType extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            natureOfJob: [],
            workSchedule: [],
            weekendAvailiblity: false,
            immediatelyStart: false,
            startWorkdate: new Date()
        }
    }
    componentWillReceiveProps = (newProps) => {
        this.initState(newProps);
    }

    componentWillMount() {
        this.initState(this.props);
    }

    initState = (props) => {
        console.log(props);
        this.setState({
            natureOfJob: [...props.natureOfJob],
            workSchedule: [...props.workSchedule],
            weekendAvailiblity: props.weekendAvailiblity,
            immediatelyStart: props.immediatelyStart,
            startWorkdate: !props.immediatelyStart ? new Date(props.startWorkdate) : false
        })
    }

    setNatureOfJob = (param) => {
        var natureOfJob = this.state.natureOfJob;
        var index = natureOfJob.indexOf(param);
        if( index > -1)
            natureOfJob.splice(index, 1);
        else 
            natureOfJob.push(param);
        this.setState({natureOfJob: natureOfJob});
        this.updateDB({natureOfJob: natureOfJob});
    }

    setWorkSchedule = (param) => {
        var workSchedule = this.state.workSchedule;
        var index = workSchedule.indexOf(param);
        if( index > -1)
            workSchedule.splice(index, 1);
        else 
            workSchedule.push(param);
        this.setState({workSchedule: workSchedule});  
        this.updateDB({workSchedule: workSchedule});      
    }

    setWeekendAvailability = () => {
        this.setState({weekendAvailiblity: !this.state.weekendAvailiblity});
        this.updateDB({weekendAvailiblity: !this.state.weekendAvailiblity});
    }

    setStartDate = (param) => {
        var data;
        if(param){
            data = {immediatelyStart: true, startWorkdate: new Date()};
            this.setState(data);
            this.updateDB(data);
        } else {
            data = {immediatelyStart: false};
            this.setState(data);
        }
    }

    setStartWorkDate = (date) => {
        this.setState({startWorkdate: date}); console.log(date)
        this.updateDB({startWorkdate: date, immediatelyStart: false});
    }

    updateDB = async (data) => {
        if(this.props.admin)
            var token =  "admin_kackey_" + localStorage.getItem('token');
        else
            token =  "staff_kackey_" + localStorage.getItem('token');
        var type = localStorage.getItem('type');
        var _id = this.props._id;
        var res = await callApi("POST", "/v1/LHS/staff/update/" + _id, token, data);
        setSession( res.token, res.data._id, type);
        this.props.setStaffProfile(res.data);
        data = {            
            name: res.data.name, 
            type: 'staff', 
            avatar: res.data.avatar,
            badge: res.data.badge
        }
        this.props.setAuth(data);
    }
   
   render() {
    return (
        <div className="t2_sp_work">
            <div className="t2_sp_work_title">
                Nature of Job             
            </div>
            <div className="row t2_sp_work_container">
                <button className={this.state.natureOfJob.indexOf("Permanent Position") > -1 ?"t2_sp_work_item t2_sp_item_selected":"t2_sp_work_item" }
                onClick={()=>this.setNatureOfJob("Permanent Position")}>Permanent Positions</button>
                <button className={this.state.natureOfJob.indexOf("Temporary Position") > -1 ?"t2_sp_work_item t2_sp_item_selected":"t2_sp_work_item" }
                onClick={()=>this.setNatureOfJob("Temporary Position")}>Temporary Positions</button>
            </div>
            <div className="t2_sp_work_title" style={{marginTop: 48}}>
                Work Schedule             
            </div>
            <div className="row t2_sp_work_container">
                <button className={this.state.workSchedule.indexOf("Full Time") > -1 ?"t2_sp_work_item t2_sp_item_selected":"t2_sp_work_item" }
                onClick={()=>this.setWorkSchedule("Full Time")} style={{lineHeight: '18px'}}>Full Time <br/> <b style={{fontSize: '12px', fontWeight: 'normal'}}>(8hrs or more per day)</b></button>
                <button className={this.state.workSchedule.indexOf("Part Time") > -1 ?"t2_sp_work_item t2_sp_item_selected":"t2_sp_work_item" }
                onClick={()=>this.setWorkSchedule("Part Time")} style={{lineHeight: '18px'}}>Part Time <br/> <b style={{fontSize: '12px', fontWeight: 'normal'}}>(7hrs or less per day)</b></button>
            </div>
            <div className="t2_sp_work_title" style={{marginTop: 48}}>
                Weekend Availability            
            </div>
            <div className="row t2_sp_work_container">
                <button className={this.state.weekendAvailiblity ?"t2_sp_work_item t2_sp_item_selected":"t2_sp_work_item" } style={{width: 100}}
                onClick={()=>this.setWeekendAvailability()}>Yes</button>
                <button className={!this.state.weekendAvailiblity ?"t2_sp_work_item t2_sp_item_selected":"t2_sp_work_item" } style={{width: 100}} style={{width: 100}}
                onClick={()=>this.setWeekendAvailability()}>No</button>
            </div>
            <div className="t2_sp_work_title" style={{marginTop: 48}}>
                Available to Start Work            
            </div>
            <div className="row t2_sp_work_container">
                <button className={this.state.immediatelyStart ?"t2_sp_work_item t2_sp_item_selected":"t2_sp_work_item" }
                onClick={()=>this.setStartDate("Immediately")}>Immediately</button>
                <div className={this.state.immediatelyStart?"ssu_datePickerBox ssu2_modal3_selectBox":"ssu_datePickerBox ssu2_modal3_selectBox t2_sp_item_selected"} style={{margin: '5px 0px 0px 0px', maxWidth: 300}}
                onClick={()=>this.setStartDate()}>
                    <DatePicker
                        className={this.state.immediatelyStart?"ssu_datePicker":"ssu_datePicker t2_sp_item_selected"}
                        placeholderText={'MM/DD/YYYY'}
                        selected={this.state.startWorkdate}
                        onChange={(date) => this.setStartWorkDate(date)}
                    />
                    <div className={this.state.immediatelyStart?"t2_sp_calendar":"t2_sp_calendar t2_sp_calendar_selected"} onClick={()=>$(".ssu_datePicker").focus()}>
                        <svg width="36" height="18" viewBox="0 0 61 30" xmlns="http://www.w3.org/2000/svg">
                            <path d="M60.2574 4.17908H55.8318C55.7431 4.17908 55.6581 4.21429 55.5955 4.27697C55.5328 4.33964 55.4976 4.42465 55.4976 4.51329C55.4976 4.57024 55.5155 4.62119 55.5403 4.66765V7.21392C55.5404 7.30724 55.5221 7.39966 55.4864 7.48589C55.4507 7.57212 55.3984 7.65047 55.3324 7.71646C55.2664 7.78244 55.1881 7.83476 55.1019 7.87043C55.0156 7.90609 54.9232 7.9244 54.8299 7.9243H53.4526C53.366 7.9243 53.2803 7.90724 53.2003 7.8741C53.1202 7.84097 53.0476 7.79239 52.9863 7.73116C52.9251 7.66993 52.8765 7.59723 52.8434 7.51723C52.8102 7.43722 52.7932 7.35147 52.7932 7.26488V4.70886C52.8374 4.65311 52.8621 4.58442 52.8636 4.51329C52.8637 4.46937 52.8551 4.42587 52.8384 4.38527C52.8216 4.34468 52.797 4.3078 52.766 4.27674C52.7349 4.24569 52.698 4.22108 52.6574 4.20432C52.6168 4.18756 52.5733 4.17898 52.5294 4.17908H43.6085C43.5198 4.17908 43.4348 4.21429 43.3721 4.27697C43.3095 4.33964 43.2743 4.42465 43.2743 4.51329C43.2743 4.56499 43.2885 4.6122 43.3095 4.65641V7.23191C43.3095 7.32293 43.2916 7.41307 43.2567 7.49716C43.2219 7.58126 43.1708 7.65767 43.1065 7.72203C43.0421 7.7864 42.9657 7.83745 42.8816 7.87229C42.7975 7.90712 42.7074 7.92505 42.6163 7.92505H41.3934C41.2078 7.92505 41.0298 7.85131 40.8985 7.72006C40.7673 7.5888 40.6935 7.41078 40.6935 7.22516V4.67514C40.7233 4.62631 40.7396 4.57046 40.7407 4.51329C40.7408 4.46937 40.7322 4.42587 40.7155 4.38527C40.6987 4.34468 40.6741 4.3078 40.6431 4.27674C40.612 4.24569 40.5751 4.22108 40.5345 4.20432C40.4939 4.18756 40.4504 4.17898 40.4065 4.17908H35.7433C35.5464 4.17928 35.3575 4.25755 35.2182 4.39675C35.0789 4.53595 35.0004 4.72472 35 4.92168V27.0528C35 27.4635 35.3335 27.7969 35.7433 27.7969H60.2574C60.4545 27.7965 60.6434 27.7179 60.7826 27.5784C60.9218 27.4389 61 27.2499 61 27.0528V4.92168C60.9996 4.72485 60.9212 4.5362 60.7821 4.39702C60.6429 4.25784 60.4542 4.17947 60.2574 4.17908ZM60.2574 27.1285H35.7433C35.7334 27.1285 35.7236 27.1265 35.7145 27.1227C35.7054 27.1189 35.6971 27.1133 35.6901 27.1063C35.6831 27.0992 35.6776 27.0909 35.6739 27.0817C35.6702 27.0725 35.6683 27.0627 35.6684 27.0528V10.3627H60.3316V27.0521C60.3318 27.062 60.33 27.0718 60.3264 27.081C60.3228 27.0902 60.3173 27.0986 60.3104 27.1058C60.3035 27.1129 60.2953 27.1185 60.2862 27.1224C60.2771 27.1263 60.2673 27.1284 60.2574 27.1285Z"/>
                            <path d="M42.0915 7.16298C42.2759 7.16298 42.4257 7.01311 42.4257 6.82877V2.33421C42.4257 2.29032 42.4171 2.24686 42.4003 2.20631C42.3835 2.16576 42.3589 2.12892 42.3279 2.09789C42.2968 2.06685 42.26 2.04224 42.2194 2.02544C42.1789 2.00864 42.1354 2 42.0915 2C42.0476 2 42.0042 2.00864 41.9636 2.02544C41.9231 2.04224 41.8862 2.06685 41.8552 2.09789C41.8242 2.12892 41.7996 2.16576 41.7828 2.20631C41.766 2.24686 41.7573 2.29032 41.7573 2.33421V6.82952C41.7573 7.01386 41.9072 7.16298 42.0915 7.16298Z"/>
                            <path d="M54.1965 7.16298C54.3809 7.16298 54.5307 7.01311 54.5307 6.82877V2.33421C54.5307 2.24557 54.4955 2.16056 54.4328 2.09789C54.3702 2.03521 54.2852 2 54.1965 2C54.1079 2 54.0229 2.03521 53.9602 2.09789C53.8975 2.16056 53.8623 2.24557 53.8623 2.33421V6.82952C53.8623 7.01386 54.0114 7.16298 54.1965 7.16298Z"/>
                            <path d="M40.3646 15.4185C41.3818 15.4185 42.2065 14.5939 42.2065 13.5766C42.2065 12.5594 41.3818 11.7347 40.3646 11.7347C39.3473 11.7347 38.5227 12.5594 38.5227 13.5766C38.5227 14.5939 39.3473 15.4185 40.3646 15.4185Z"/>
                            <path d="M45.6583 15.4185C46.6755 15.4185 47.5002 14.5939 47.5002 13.5766C47.5002 12.5594 46.6755 11.7347 45.6583 11.7347C44.641 11.7347 43.8164 12.5594 43.8164 13.5766C43.8164 14.5939 44.641 15.4185 45.6583 15.4185Z"/>
                            <path d="M50.9505 15.4185C51.9678 15.4185 52.7924 14.5939 52.7924 13.5766C52.7924 12.5594 51.9678 11.7347 50.9505 11.7347C49.9333 11.7347 49.1086 12.5594 49.1086 13.5766C49.1086 14.5939 49.9333 15.4185 50.9505 15.4185Z"/>
                            <path d="M40.3646 20.5478C41.3818 20.5478 42.2065 19.7231 42.2065 18.7059C42.2065 17.6887 41.3818 16.864 40.3646 16.864C39.3473 16.864 38.5227 17.6887 38.5227 18.7059C38.5227 19.7231 39.3473 20.5478 40.3646 20.5478Z"/>
                            <path d="M45.6583 20.5478C46.6755 20.5478 47.5002 19.7231 47.5002 18.7059C47.5002 17.6887 46.6755 16.864 45.6583 16.864C44.641 16.864 43.8164 17.6887 43.8164 18.7059C43.8164 19.7231 44.641 20.5478 45.6583 20.5478Z"/>
                            <path d="M50.9505 20.5478C51.9678 20.5478 52.7924 19.7231 52.7924 18.7059C52.7924 17.6887 51.9678 16.864 50.9505 16.864C49.9333 16.864 49.1086 17.6887 49.1086 18.7059C49.1086 19.7231 49.9333 20.5478 50.9505 20.5478Z"/>
                            <path d="M40.3646 25.6771C41.3818 25.6771 42.2065 24.8524 42.2065 23.8352C42.2065 22.8179 41.3818 21.9933 40.3646 21.9933C39.3473 21.9933 38.5227 22.8179 38.5227 23.8352C38.5227 24.8524 39.3473 25.6771 40.3646 25.6771Z"/>
                            <path d="M45.6583 25.6771C46.6755 25.6771 47.5002 24.8524 47.5002 23.8352C47.5002 22.8179 46.6755 21.9933 45.6583 21.9933C44.641 21.9933 43.8164 22.8179 43.8164 23.8352C43.8164 24.8524 44.641 25.6771 45.6583 25.6771Z"/>
                            <path d="M50.9505 25.6771C51.9678 25.6771 52.7924 24.8524 52.7924 23.8352C52.7924 22.8179 51.9678 21.9933 50.9505 21.9933C49.9333 21.9933 49.1086 22.8179 49.1086 23.8352C49.1086 24.8524 49.9333 25.6771 50.9505 25.6771Z"/>
                            <path d="M56.12 15.4185C57.1372 15.4185 57.9619 14.5939 57.9619 13.5766C57.9619 12.5594 57.1372 11.7347 56.12 11.7347C55.1027 11.7347 54.2781 12.5594 54.2781 13.5766C54.2781 14.5939 55.1027 15.4185 56.12 15.4185Z"/>
                            <path d="M56.12 20.5478C57.1372 20.5478 57.9619 19.7231 57.9619 18.7059C57.9619 17.6887 57.1372 16.864 56.12 16.864C55.1027 16.864 54.2781 17.6887 54.2781 18.7059C54.2781 19.7231 55.1027 20.5478 56.12 20.5478Z"/>
                            <path d="M56.12 25.6771C57.1372 25.6771 57.9619 24.8524 57.9619 23.8352C57.9619 22.8179 57.1372 21.9933 56.12 21.9933C55.1027 21.9933 54.2781 22.8179 54.2781 23.8352C54.2781 24.8524 55.1027 25.6771 56.12 25.6771Z"/>
                            <line x1="0.5" y1="2.18557e-08" x2="0.499999" y2="30"/>
                        </svg>
                    </div>
                </div>             
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobType);
