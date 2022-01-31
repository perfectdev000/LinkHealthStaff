import React from 'react';
import { connect } from 'react-redux';
import edit from '../../../assets/images/edit.svg'
import del from '../../../assets/images/delete.svg'
import Confirm from '../../../modals/confirm';
import ErrorState from '../../../theme_1/staffSignUp/components/errorState';
import home from '../../../assets/images/home.svg';
import place from '../../../assets/images/place.svg';
import { callApi, setSession } from '../../../../action';
import { SET_HP_PROFILE } from '../../../../constants/actionTypes';

const mapStateToProps = state => {
    return {
        corporateAddress: state.hospitalProfile.corporateAddress,
        _id: state.hospitalProfile._id
    }
};

const mapDispatchToProps = dispatch => ({    
    setHospitalProfile: (data) => dispatch({type: SET_HP_PROFILE, data})
});

class Locations extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            corporateAddress: [],
            selectedNum: '',
            showConfirm: 'none',
            confirmTitle: '',
            /** for the modal window */
            addModalShow: 'none',
            street: '',
            city: '',
            state:'',
            zipCode: '',
            error: {
                street: 'block',
                zipCode: 'block'
            },
            showZipErr: false,
            showStreetErr: false
        }
    }
    componentWillMount = () => {
        this.initState(this.props);
    }

    componentWillReceiveProps = (newProps) => {
        this.initState(newProps);
    }

    initState = (props) => {
        var temp = [];
        for(var i = 1 ; i < props.corporateAddress.length ; i++){
            props.corporateAddress[i].num = i - 1;
            temp.push(props.corporateAddress[i]);
        }
        this.setState({corporateAddress: [...temp]});
    }

    updateDB = async () => {
        var temp = [this.props.corporateAddress[0]];
        temp = temp.concat(this.state.corporateAddress);
        var data = {
            corporateAddress: temp
        };
        if(this.props.admin)
            var token =  "admin_kackey_" + localStorage.getItem('token');
        else
            token =  "hospital_kackey_" + localStorage.getItem('token');
        var type = localStorage.getItem('type');
        var res = await callApi("POST", "/v1/LHS/hospital/update/" + this.props._id, token, data);
        setSession( res.token, res.data._id, type);
        this.props.setHospitalProfile(res.data);
    }

    /***** FOR THE DELETE MODAL *****/

    editOne = (num) => {
        var selected = this.state.corporateAddress[num];
        this.setState({
            addModalShow: 'block',
            street: selected.street,
            city: selected.city,
            state: selected.city,
            zipCode: selected.zipCode,
            error: {
                street: 'block',
                zipCode: 'block'
            },
            showZipErr: false,
            showStreetErr: false,
            selectedNum: num
        });
    }

    confirmDeleteOne = (num) => {
        this.setState({
            selectedNum: num, 
            showConfirm: 'block', 
            confirmTitle: this.state.corporateAddress[num].zipCode
        });        
    }

    deleteOne = () => {
        var num = this.state.selectedNum;
        var corporateAddress = this.state.corporateAddress;
        corporateAddress.splice(num, 1);
        this.updateDB();
        this.hideConfirm();
    }

    hideConfirm = () => {
        this.setState({showConfirm: 'none'});
    }

    /***** FOR THE ADD & EDIT MODAL *****/

    addNewLoc = () => {
        this.setState({
            addModalShow: 'block',
            selectedNum: ''
        })
    }

    setStreet = (e) => {
        if(e.target.value.length < 51)
            this.setState({street: e.target.value, showStreetErr: true}, () => this.setLocError());        
    }

    setZipCode = (e) => {
        this.setState({zipCode: e.target.value, showZipErr: true}, () => this.setLocError());        
    }

    needToSetZip = () => {
        this.setState({showZipErr: true});
    }

    setLocError = async () => {
        var error = this.state.error;

        /** check if the street value is valid */
        var street = this.state.street;
        if(street === ""){
            error.street = 'block';
        }
        else 
            error.street = 'none';
        /** check if the zip code value is valid */
        var zip = this.state.zipCode;
        var city = '', state = '';
        if(zip.length !== 5) {
            error.zipCode = 'block';
        } else {
            if(zip[0] === '0'){
                zip = zip.substring(1);
            }            
            if(zip[0] === '0'){
                zip = zip.substring(1);
            }
            var res = await callApi('POST', '/v1/LHS/other/getCityState', null, {zip: zip});            
            if(res.result === 'OK'){
                city = res.data.city;
                state = res.data.state;

                error.zipCode = 'none';
            }
        }
        this.setState({ error: error, city: city, state: state});
        return error;
    }

    handleSave = async () => {
        var error = await this.setLocError();
        if(error.street === 'none' && error.zipCode === 'none'){
            var corporateAddress = this.state.corporateAddress;
            if(this.state.selectedNum === ''){
                corporateAddress.push({
                    zipCode: this.state.zipCode,
                    city: this.state.city,
                    state: this.state.state,
                    street: this.state.street,
                    num: this.state.corporateAddress.length
                });
            } else { 
                corporateAddress[this.state.selectedNum] = {
                        zipCode: this.state.zipCode,
                        city: this.state.city,
                        state: this.state.state,
                        street: this.state.street
                    }
            }
            this.setState({corporateAddress: [...corporateAddress]}, ()=>this.updateDB());                       
            this.modalClose();
        } else {
            this.setState({
                showZipErr: true,
                showStreetErr: true
            })
        }
    }

    modalClose = () => {
        this.setState({
            addModalShow: 'none',
            street: '',
            city: '',
            state:'',
            zipCode: '',
            error: {
                street: 'block',
                zipCode: 'block'
            },
            showZipErr: false,
            showStreetErr: false,
            selectedNum: ''
        });
    }

  render() {
    return (
        <div className="t2_sp_work" style={{marginBottom: 30}}>
            <div className="t2_sp_work_title">Healthcare Institution Locations</div>
            <hr/>
            <div className="row" style={{margin: '32px 0px auto', overflowX: 'auto', display: this.state.corporateAddress.length?"block":'none'}}>
                <table style={{minWidth: '800px', marginBottom: '12px', padding: 0}}>
                    <thead>
                        <tr className="nurseHead">
                            <th className="locTh" style={{paddingLeft: '20px'}}>Zip Code</th>
                            <th className="locTh"> Street address </th>
                            <th className="locTh"> City </th>
                            <th className="locTh"> State </th>
                            <th className="locTh" style={{width: '80px'}}> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{height: 18}}/>
                        {
                            this.state.corporateAddress.map((item) => {
                                return  <tr key={item.num} className="locRow" style={{height: '60px'}}>
                                            <td className="locTd" style={{paddingLeft: '20px'}}> {item.zipCode} </td>
                                            <td className="locTd">{item.street} </td>
                                            <td className="locTd"> {item.city} </td>
                                            <td className="locTd"> {item.state} </td>
                                            <td> 
                                                <span style={{marginRight: '15px'}} onClick={() => this.editOne(item.num)}>
                                                    <img width="18px" height="15px" style={{cursor: 'pointer'}} alt="img"src={edit}/>
                                                </span>
                                                <span><img width="18px" height="15px" style={{cursor: 'pointer', display: this.props.admin ? 'none' : 'inline'}} alt="img"src={del} onClick={() => this.confirmDeleteOne(item.num)}/></span> 
                                            </td>
                                        </tr>
                            })
                        }                    
                    </tbody>
                </table>
            </div>
            <div className="ssu2_addItem" onClick={this.addNewLoc}>
                + Add {this.state.corporateAddress.length ? 'Another' : ''} Location
            </div> 
            <Confirm display={this.state.showConfirm} title={'Delete "' + this.state.confirmTitle + '"'}
            content={'Are you sure you want to delete "' + this.state.confirmTitle + '"'} agreeFn={this.deleteOne}
            disagreeFn={this.hideConfirm}/>
            <div className="w3-modal" style={{display: this.state.addModalShow}} >
                <div className="w3-modal-content ssu2_modal1" style={{maxHeight: 600, overflowY: 'auto'}}>
                    <div className="w3-container">
                        <div className="ssu2_modal1_text1">Add {this.state.corporateAddress.length ? 'Another' : ''} Location</div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className=" ssu2_modal1_input " style={{marginTop: 40}}>
                            <div className=" ssu2_modal1_input  ssu2_modal3_selectBox " style={{marginBottom: '10px'}}>
                                <div className=" input_left_icon "><img height="15px" src={place} width="18px" alt="location" /></div>
                                <input className="ssu2_modal3_select" type="text" placeholder="Zip code" value={this.state.zipCode} name="zipCode" onChange={this.setZipCode}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                            </div>
                            <ErrorState show={this.state.showZipErr?this.state.error.zipCode:'none'} name="Valid zip code is required." />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal3_selectBox">
                                <div className="input_left_icon"><img width="18px" height="15px" alt="img"src={home} /></div>
                                <input className="ssu2_modal3_select" placeholder="Street Address" type="text" value={this.state.street} name="street" onChange={this.setStreet}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                            </div>
                            <ErrorState show={this.state.showStreetErr?this.state.error.street:'none'} name="Street address is required." />
                        </div>
                        <div className="row ssu2_modal1_input">
                            <div className="col-md-6" style={{padding: 0}} onClick={this.needToSetZip}>
                                <div className="ssu2_modal3_selectBox">
                                    <div className="input_left_icon"><img width="18px" height="15px" alt="img" src={place} /></div>
                                    <input className="ssu2_modal3_select" placeholder="City" disabled={true} type="text" value={this.state.city}/>
                                </div>
                            </div>
                            <div className="col-md-6" style={{padding: 0}} onClick={this.needToSetZip}>
                                <div className="ssu2_modal3_selectBox hsu1_input2">
                                    <div className="input_left_icon"><img alt="img"src={place}  width="18px" height="15px" style={{marginTop: '-3px'}}/></div>
                                    <input className="ssu2_modal3_select" placeholder="State" disabled={true} type="text" value={this.state.state}/>
                                </div>
                            </div>
                        </div>
                        <hr style={{margin: '60px 0px 0px'}}/>
                        <div className="row ssu_bottom">
                            <button className="ssu2_modal1_button1" onClick={this.handleSave}> SAVE </button>
                            <button className="ssu2_modal1_button2" onClick={this.modalClose}> CANCEL </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>                  
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
