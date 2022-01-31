import React from 'react';
import { connect } from 'react-redux';
import filter from '../../assets/images/filter.svg';
import downarrow from '../../assets/images/downarrow.svg';
import search from '../../assets/images/search.svg';
import Pagination from './pagination';
import { SET_SP_PROFILE, SET_AUTH, SET_TEMP_FILE } from '../../../constants/actionTypes';
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

class ManageAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            today: '',
            date: '',
            filterDate: false,
            curPage: 1,
            total: 10
        }
    }

    componentWillMount = async () => {
        this.props.setCurPos('manageAdmin');
        this.props.setAuth({
            type: this.props.auth.type,
            name: this.props.auth.name,
            title: 'Manage Administrator'
        });
        this.initState(this.props);
    }

    componentWillReceiveProps = (newProps) => {
        this.initState(newProps);
    }

    initState = (props) => {
    }

    componentDidMount = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    selectDate = (date) => {
    }

    setCurPage = (num) => {
        this.setState({curPage: num});
    }

    render() {
        return (
            <div className="theme2_body" style={{backgroundColor: 'rgba(0,0,0,0)'}}>  
                <div className="t2_sp_work" style={{marginTop: 0}}>
                    <div className="row">
                        <div className="admin_mngAdmin_nameFilter">
                            <span className="admin_mngAdmin_nameFilter_span1">
                                Name <img src={downarrow} width="8px" style={{float: 'right', marginRight: '20px', marginTop: '8px'}} alt="downArrow.svg"/>
                            </span>
                            <span style={{marginLeft: 20}}>
                                <img style={{width: 14, marginTop: -3}} alt="search.svg" src={search}/>
                                <input className="admin_mngAdmin_nameFilter_input" placeholder="Search" type="text" value={this.state.search} onChange={this.search}/>
                            </span>
                        </div>                        
                        <button className="admin_mngAdmin_roleFilter">
                            <span style={{width: 13, float: 'left', marginTop: -2}}><img src={filter} width="100%"/></span>
                            <span style={{float: 'left', marginLeft: 10}}>Filter by role</span>
                            <span style={{float: 'right', width: '8px', marginTop: -2}}><img src={downarrow} width="100%"/></span>
                        </button>                               
                        <button className="admin_mngAdmin_roleFilter admin_mngAdmin_addAdmin">
                            + Add New Administrators
                        </button>
                    </div>
                    <Pagination curPage={this.state.curPage} total={this.state.total} setCurPage={this.setCurPage}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
