import React from 'react';
import { connect } from 'react-redux';
import edit_note from '../../../assets/images/edit_note.svg';
import ErrorState from '../../../theme_1/staffSignUp/components/errorState';
import home from '../../../assets/images/home.svg';
import place from '../../../assets/images/place.svg';
import { callApi, setSession } from '../../../../action';
import { SET_HP_PROFILE } from '../../../../constants/actionTypes';

const mapStateToProps = state => {
  return {
    corporateAddress: state.hospitalProfile.corporateAddress
  }};

const mapDispatchToProps = dispatch => ({
    setHospitalProfile: (data) => dispatch({type: SET_HP_PROFILE, data})
});

class CorporateAddress extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            city: '',
            state: '',
            street: '',
            zipCode: '',
            /** for the modal window */            
            mcity: '',
            mstate: '',
            mstreet: '',
            mzipCode: '',
            addModalShow: 'none',
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
        this.setState({
            city: props.corporateAddress[0].city,
            state: props.corporateAddress[0].state,
            street: props.corporateAddress[0].street,
            zipCode: props.corporateAddress[0].zipCode
        });
    }

    editAddress = () => {
        this.setState({            
            mcity: this.state.city,
            mstate: this.state.state,
            mstreet: this.state.street,
            mzipCode: this.state.zipCode,
            addModalShow: 'block',
            error: {
                street: 'block',
                zipCode: 'block'
            },
            showZipErr: false,
            showStreetErr: false
        });
    }

    /***** FOR THE ADD & EDIT MODAL *****/

    setStreet = (e) => {
        this.setState({mstreet: e.target.value, showStreetErr: true}, () => this.setLocError());        
    }

    setZipCode = (e) => {
        this.setState({mzipCode: e.target.value, showZipErr: true}, () => this.setLocError());        
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
        var zip = this.state.mzipCode;
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
        this.setState({ error: error, mcity: city, mstate: state});
        return error;
    }

    handleSave = async () => {
        var error = await this.setLocError();
        if(error.street === 'none' && error.zipCode === 'none'){
            this.setState({
                city: this.state.mcity,
                state: this.state.mstate,
                street: this.state.mstreet,
                zipCode: this.state.mzipCode
            }, () => this.updateDB());                                 
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
            error: {
                street: 'block',
                zipCode: 'block'
            },
            showZipErr: false,
            showStreetErr: false
        });
    }

    updateDB = async () => {
        var temp = this.props.corporateAddress;
        temp[0] = {
            zipCode: this.state.zipCode,
            street: this.state.street,
            state: this.state.state,
            city: this.state.city
        }
        var data = {
            corporateAddress: temp
        };
        if(this.props.admin)
            var token =  "admin_kackey_" + localStorage.getItem('token');
        else
            token =  "hospital_kackey_" + localStorage.getItem('token');
        var type = localStorage.getItem('type');
        var _id = localStorage.getItem('_id');
        var res = await callApi("POST", "/v1/LHS/hospital/update/" + _id, token, data);
        setSession( res.token, res.data._id, type);
        this.props.setHospitalProfile(res.data);
    }
   
   render() {
    return (
        <div className="t2_sp_work">
            <div className="t2_sp_work_title">
                Corporate Office Address
                <img alt="icon.svg" src={edit_note} width="18px" style={{marginTop: 4, float: 'right', cursor: 'pointer'}} onClick={this.editAddress}/>                
            </div>
            <div className="row t2_sp_work_container">
                <div className="col-md-6 col-sm-12">
                    <h6 style={{fontSize:14}}> Zip Code </h6>
                    <h5 className="t2_detail_textbox" title={this.state.zipCode}>{this.state.zipCode} </h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-md-6 col-sm-12">                    
                    <h6 style={{fontSize:14}}> Street address </h6>
                    <h5 className="t2_detail_textbox" title={this.state.street}>{this.state.street}</h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-md-6 col-12">                                      
                    <h6 style={{fontSize:14}}> City </h6>
                    <h5 className="t2_detail_textbox" title={this.state.city}> {this.state.city} </h5>
                </div>
                <div className="col-md-6 col-sm-12">                    
                    <h6 style={{fontSize:14}}> State </h6>
                    <h5 className="t2_detail_textbox" title={this.state.state}>{this.state.state}</h5>
                </div>
            </div>
            <div className="w3-modal" style={{display: this.state.addModalShow}} >
                <div className="w3-modal-content ssu2_modal1" style={{maxHeight: 600, overflowY: 'auto'}}>
                    <div className="w3-container">
                        <div className="ssu2_modal1_text1">Edit Corporate Office Address</div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className=" ssu2_modal1_input " style={{marginTop: 40}}>
                            <div className=" ssu2_modal1_input  ssu2_modal3_selectBox " style={{marginBottom: '10px'}}>
                                <div className=" input_left_icon "><img height="15px" src={place} width="18px" alt="location" /></div>
                                <input className="ssu2_modal3_select" type="text" placeholder="Zip code" value={this.state.mzipCode} name="zipCode" onChange={this.setZipCode}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                            </div>
                            <ErrorState show={this.state.showZipErr?this.state.error.zipCode:'none'} name="Valid zip code is required." />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal3_selectBox">
                                <div className="input_left_icon"><img width="18px" height="15px" alt="img"src={home} /></div>
                                <input className="ssu2_modal3_select" placeholder="Street Address" type="text" value={this.state.mstreet} name="street" onChange={this.setStreet}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSave()}}/>
                            </div>
                            <ErrorState show={this.state.showStreetErr?this.state.error.street:'none'} name="Street address is required." />
                        </div>
                        <div className="row ssu2_modal1_input">
                            <div className="col-md-6" style={{padding: 0}} onClick={this.needToSetZip}>
                                <div className="ssu2_modal3_selectBox" style={{backgroundColor: '#F8F8F8'}}>
                                    <div className="input_left_icon"><img width="18px" height="15px" alt="img" src={place} /></div>
                                    <input className="ssu2_modal3_select" placeholder="City" disabled={true} type="text" value={this.state.mcity}/>
                                </div>
                            </div>
                            <div className="col-md-6" style={{padding: 0}} onClick={this.needToSetZip}>
                                <div className="ssu2_modal3_selectBox hsu1_input2" style={{backgroundColor: '#F8F8F8'}}>
                                    <div className="input_left_icon"><img alt="img"src={place}  width="18px" height="15px" style={{marginTop: '-3px'}}/></div>
                                    <input className="ssu2_modal3_select" placeholder="State" disabled={true} type="text" value={this.state.mstate}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CorporateAddress);
