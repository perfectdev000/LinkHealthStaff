import React from 'react';
import { connect } from 'react-redux';
import filter from '../../assets/images/filter.svg';
import downarrow from '../../assets/images/downarrow.svg';
import hospital from '../../assets/images/hospital_blue.svg';
import staff from '../../assets/images/staff_blue.svg';
import register from '../../assets/images/register.svg';
import DatePicker from "react-datepicker";
import { SET_AUTH } from '../../../constants/actionTypes';
import { callApi, setSession } from '../../../action';
import $ from 'jquery';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => ({
    setAuth: (data) => dispatch({ type: SET_AUTH, data }),
});

class AdminDashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitalNew: 0,
            hospitalTotal: 0,
            staffNew: 0,
            staffTotal: 0,
            today: '',
            date: '',
            filterDate: false
        }
    }

    componentWillMount = async () => {
        this.props.setCurPos('');
        this.props.setAuth({
            type: this.props.auth.type,
            name: this.props.auth.name,
            title: 'Dashboard'
        });
        var date = new Date();
        var d = date.getDate();
        var m= date.getMonth() + 1;
        var y = date.getFullYear();
        d = d < 10 ? '0'+ d : d;
        m = m < 10 ? '0'+ m : m;
        var dd = m + '/' + d + '/' + y;
        this.setState({today: dd, filterDate: date}, ()=>this.initState(this.props));        
    }

    componentWillReceiveProps = (newProps) => {        
        this.initState(newProps);
        this.countByQuery();
    }

    initState = (props) => {
        var date = new Date();
        var d = date.getDate();
        var m= date.getMonth() + 1;
        var y = date.getFullYear();
        d = d < 10 ? '0'+ d : d;
        m = m < 10 ? '0'+ m : m;
        date = m + '/' + d + '/' + y;
        this.setState({date: date});
    }

    componentDidMount = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    selectDate = (date) => {
        var today = new Date();
        var d = today.getDate();
        var m= today.getMonth() + 1;
        var y = today.getFullYear();
        d = d < 10 ? '0'+ d : d;
        m = m < 10 ? '0'+ m : m;
        var today = m + '/' + d + '/' + y;

        this.initState(this.props);
        d = date.getDate();
        m= date.getMonth() + 1;
        y = date.getFullYear();
        d = d < 10 ? '0'+ d : d;
        m = m < 10 ? '0'+ m : m;
        var dd = m + '/' + d + '/' + y;
        this.setState({today: today, date: dd, filterDate: date}, this.countByQuery);
    }

    countByQuery = async () => {
        var data = {
            date: this.state.filterDate
        };
        var token =  "admin_kackey_" + localStorage.getItem('token');
        var res = await callApi("POST", "/v1/LHS/staff/countByQuery/", token, data);
        this.setState({
            staffTotal: res.data.total,
            staffNew: res.data.new
        });
        setSession( res.token, res.data._id, 'admin');
        token =  "admin_kackey_" + localStorage.getItem('token');
        res = await callApi("POST", "/v1/LHS/hospital/countByQuery/", token, data);
        setSession( res.token, res.data._id, 'admin');
        this.setState({
            hospitalTotal: res.data.total,
            hospitalNew: res.data.new
        });
        setSession( res.token, res.data._id, 'admin');
        
    }

    render() {
        return (
            <div className="theme2_body">  
                <div className="t2_sp_work" style={{marginTop: 0}}>
                    <div className="row admin_dash_part1">
                        <div className="admin_datefilter_container">
                            <span className="admin_datefilter_img">
                                <img src={filter} alt="filter.svg" width="16px" />
                            </span>
                            <span onClick={()=>$(".admin_dash_datePicker").focus()}>{this.state.date === this.state.today ? "Today" : this.state.date}</span>
                            <span className="admin_datefilter_btn" onClick={()=>$(".admin_dash_datePicker").focus()}>
                                <img src={downarrow} title="downarrow.svg" width="10px"/>
                            </span>
                            <DatePicker
                                className="admin_dash_datePicker"
                                placeholderText={'MM/DD/YYYY'}
                                selected={this.state.filterDate}
                                onChange={(date) => this.selectDate(date)}
                            /> 
                        </div> 
                    </div>
                    <hr style={{marginTop: '32px'}}/>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <h5>Hospital</h5>
                            <div className="row admin_dash_item_container">
                                <button className="col-sm-6 col-12 admin_dash_item">
                                    <img src={hospital} alt="hospital.svg" className="admin_dash_item_img"/>
                                </button> 
                                <hr className="admin_dash_item_hr"/>
                                <button className="col-sm-6 col-12 admin_dash_item admin_dash_item_right">
                                    <h5>{this.state.hospitalNew}</h5>
                                    <p style={{fontSize: 12, color: "#333333", opacity: 0.7}}>New Registrations</p>
                                </button> 
                            </div>
                            <div className="row admin_dash_item_container">
                                <button className="col-sm-6 col-12 admin_dash_item">
                                    <img src={register} alt="hospital.svg" className="admin_dash_item_img"/>
                                </button> 
                                <hr className="admin_dash_item_hr"/>
                                <button className="col-sm-6 col-12 admin_dash_item admin_dash_item_right">
                                    <h5>{this.state.hospitalTotal}</h5>
                                    <p style={{fontSize: 12, color: "#333333", opacity: 0.7}}>Total Registrations</p>
                                </button> 
                            </div>
                        </div>
                        <div className="col-md-6 col-12">                        
                            <h5>Staff</h5>
                            <div className="row admin_dash_item_container">
                                <button className="col-sm-6 col-12 admin_dash_item">
                                    <img src={staff} alt="hospital.svg" className="admin_dash_item_img"/>
                                </button> 
                                <hr className="admin_dash_item_hr"/>
                                <button className="col-sm-6 col-12 admin_dash_item admin_dash_item_right">
                                    <h5>{this.state.staffNew}</h5>
                                    <p style={{fontSize: 12, color: "#333333", opacity: 0.7}}>New Registrations</p>
                                </button> 
                            </div>
                            <div className="row admin_dash_item_container">
                                <button className="col-sm-6 col-12 admin_dash_item">
                                    <img src={register} alt="hospital.svg" className="admin_dash_item_img"/>
                                </button> 
                                <hr className="admin_dash_item_hr"/>
                                <button className="col-sm-6 col-12 admin_dash_item admin_dash_item_right">
                                    <h5>{this.state.staffTotal}</h5>
                                    <p style={{fontSize: 12, color: "#333333", opacity: 0.7}}>Total Registrations</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashBoard);
