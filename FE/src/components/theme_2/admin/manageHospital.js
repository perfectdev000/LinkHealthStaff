import React from 'react';
import { connect } from 'react-redux';
import Confirm from '../../modals/confirm';
import filter from '../../assets/images/filter.svg';
import downarrow from '../../assets/images/downarrow.svg';
import uparrow from '../../assets/images/uparrow.png';
import search from '../../assets/images/search.svg';
import Pagination from './pagination';
import edit from '../../assets/images/edit_note.svg';
import del from '../../assets/images/delete.svg';
import { SET_HP_PROFILE, SET_AUTH } from '../../../constants/actionTypes';
import { callApi, setSession } from '../../../action';
import { history } from '../../../store';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => ({
    setAuth: (data) => dispatch({ type: SET_AUTH, data }),
    setHospitalProfile: (data) => dispatch({type: SET_HP_PROFILE, data}),
});

class ManageHospital extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hospitals: [],           
            name: '',
            email: '',
            sortByName: 1,
            curPage: 1,
            total: 10,
            totalPage: 1,
            showConfirm: 'none',
            confirmTitle: '',
            selectedId: ''
        }
    }

    componentWillMount = () => {
        this.props.setCurPos('manageHospital');
        this.getStaffByQuery();
        this.props.setAuth({
            type: this.props.auth.type,
            name: this.props.auth.name,
            title: 'Manage Hospital'
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

    setCurPage = (num) => {
        this.setState({curPage: num}, this.getStaffByQuery);
    }

    setSortByName = () => {
        this.setState({sortByName: (-1) * this.state.sortByName}, this.getStaffByQuery);
    }

    getStaffByQuery = async () => {        
        var data = {
            name: this.state.name,
            email: this.state.email,
            sortByName: this.state.sortByName,
            curPage: this.state.curPage
        }
        var token = localStorage.getItem('token');
        token = "admin_kackey_" + token;
        var res = await callApi('POST', '/v1/LHS/hospital/getByQuery', token, data);
        setSession( res.token, res.data._id, 'admin');
        console.log(res);
        if(res.data.total % 5){
            var totalPage = (res.data.total - res.data.total % 5) / 5 + 1;
        } else {
            totalPage = res.data.total / 5;
        }
        this.setState({hospitals: [...res.data.hospitals], total: res.data.total, totalPage: totalPage});
    }

    editOneRow = async (_id) => {
        var token = localStorage.getItem('token');
        token = "admin_kackey_" + token;
        var res = await callApi("GET", "/v1/LHS/hospital/getById/" + _id, token);
        console.log(res.data);
        this.props.setHospitalProfile(res.data);
        setSession( res.token, res.data._id, 'admin');
        history.push('/main/admin/manageHospitalEdit');
    }

    confirmDelete = (_id, email) => {
        this.setState({showConfirm: 'block', confirmTitle: email, selectedId: _id});
    }

    deleteOneRow = () => {
        this.setState({showConfirm: 'none'});
        alert('delete one row : ' + this.state.selectedId);
    }

    render() {
        return (
            <div className="theme2_body" style={{backgroundColor: 'rgba(0,0,0,0)'}}>  
                <div className="t2_sp_work" style={{marginTop: 0}}>
                    <div className="row">
                        <div className="admin_mngAdmin_nameFilter">
                            <span className="admin_mngAdmin_nameFilter_span1">
                                Name <img src={this.state.sortByName === 1?downarrow:uparrow} width="8px" style={{float: 'right', marginRight: '20px', marginTop: '8px'}} alt="downArrow.svg" onClick={this.setSortByName}/>
                            </span>
                            <span style={{marginLeft: 20}}>
                                <img style={{width: 14, marginTop: -3}} alt="search.svg" src={search}/>
                                <input className="admin_mngAdmin_nameFilter_input" placeholder="Search" type="text" value={this.state.search} onChange={this.search}/>
                            </span>
                        </div>                        
                        <button className="admin_mngAdmin_roleFilter">
                            <span style={{float: 'left', marginLeft: 10}}>Sorting</span>
                            <span style={{float: 'right', width: '8px', marginTop: -2}}><img src={downarrow} width="100%"/></span>
                        </button>                      
                        <button className="admin_mngAdmin_roleFilter admin_mngStaff_filter">
                            <span style={{width: 13, float: 'left', marginTop: -2}}><img src={filter} width="100%"/></span>
                            <span style={{float: 'left', marginLeft: 10}}>Filter</span>
                            <span style={{float: 'right', width: '8px', marginTop: -2}}><img src={downarrow} width="100%"/></span>
                        </button> 
                    </div>
                    <div className="row" style={{overflowX: 'auto', marginTop: '32px', display: this.state.hospitals.length?"block":"none"}}>
                        <table className="admin_table" style={{width: '99%', minWidth: '800px', marginBottom: '20px', textAlign: 'left'}}>
                            <thead>
                                <tr className="nurseHead">
                                    <th className="t2_sp_licence_th" style={{paddingLeft: '30px'}}> Name </th>
                                    <th className="t2_sp_licence_th"> Email Address </th>
                                    <th className="t2_sp_licence_th"> Active Contract </th>
                                    <th className="t2_sp_licence_th" style={{width: '80px'}}> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{height: 20}}/>
                            {
                                this.state.hospitals.map((item) => {

                                    return  <React.Fragment key={item._id}>
                                                <tr className="admin_mngStaff_row">
                                                    <td className="admin_mngStaff_td" style={{paddingLeft: '30px'}}> {item.name} </td>
                                                    <td className="admin_mngStaff_td"> {item.email} </td>
                                                    <td className="admin_mngStaff_td"><span className="w3-tag w3-blue w3-round"> {item.activeContracts} </span></td>
                                                    <td className="admin_mngStaff_td"> 
                                                        <span style={{ marginRight: '20px'}} onClick={()=>this.editOneRow(item._id)}><img width="16px" height="16px" alt="img" src={edit} style={{cursor: 'pointer'}}/></span>
                                                        <span onClick={()=>this.confirmDelete(item._id, item.email)}><img width="16px" height="16px" alt="img"src={del} style={{cursor: 'pointer'}}/></span> 
                                                    </td>
                                                </tr>
                                                <tr style={{height: 24}}></tr>
                                            </React.Fragment>
                                })
                            }                              
                            </tbody>                         
                        </table>
                        <Confirm display={this.state.showConfirm} title={'Delete "' + this.state.confirmTitle + '"'}
                        content={'Are you sure you want to delete "' + this.state.confirmTitle + '"'} agreeFn={this.deleteOneRow}
                        disagreeFn={()=>this.setState({showConfirm: 'none'})}/>
                    </div>
                    <Pagination curPage={this.state.curPage} totalPage={this.state.totalPage} setCurPage={this.setCurPage}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageHospital);
