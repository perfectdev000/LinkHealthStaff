import React from 'react';
import { connect } from 'react-redux';
import ErrorState from '../../../theme_1/staffSignUp/components/errorState';
import place from '../../../assets/images/place.svg';
import { setSession, callApi } from '../../../../action';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';

const mapStateToProps = state => {
  return {
    _id: state.staffProfile._id,
      currentLocation: state.staffProfile.currentLocation,
      otherCities: state.staffProfile.otherCities
  }};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class JobType extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locations: [],
            error: false,
            errorTitle: 'Required 5 digits as a zip code.',
            showInput: false,
            newLoc: {
                name: '',
                state: '',
                zipCode: ''
            },
            newZip: ''
        }
    }
    componentWillReceiveProps = (newProps) => {
        this.initState(newProps);
    }

    componentWillMount() {
        this.initState(this.props);
    }

    initState = (props) => {
        if(props.currentLocation.zipCode){
            var locations = [props.currentLocation];
            locations = locations.concat(props.otherCities);
            for (let i = 0 ; i < locations.length ; i++) 
                locations[i].num = i;
            this.setState({locations: [...locations]});
        }
    }

    addNewLoc = () => {
        var locations = this.state.locations;
        locations.push(this.state.newLoc);
        for(var i = 0 ; i < locations.length; i++)
            locations[i].num = i;
        this.setState({
            locations: locations, 
            newLoc: {},
            showInput: false,
            error: false,
            newZip: ''
        }, ()=>this.updateDB());
    }

    removeOneLoc = (e, num) => {
        e.stopPropagation();
        var locations = this.state.locations;
        locations.splice(num, 1);
        for (var i = 0 ; i < locations.length ; i++) 
            locations[i].num = i;
        this.setState({
            locations: locations
        }, () => this.updateDB());
    }

    clearNewLoc = (e) => {
        e.stopPropagation();
        this.setState({ 
            newLoc: {},
            error: false,
            newZip: ''
        });
    }

    setOtherLocation = async (e) => {  
        var zip = e.target.value; 
        if(zip.length === 5){    
            this.setState({newZip: zip});
            if(zip[0] === '0'){
                zip = zip.substring(1);
            }
            if(zip[0] === '0'){
                zip = zip.substring(1);
            }
            var res = await callApi('POST', '/v1/LHS/other/getCityState', null, {zip: zip});           
            if(res.result === 'OK'){
                var city = res.data.city;
                var state = res.data.state;
                this.setState({error: false});
                var temp = {
                    name: city,
                    state: state,
                    zipCode: zip
                }; console.log(temp);
                this.setState({
                    newLoc: temp
                });
            } else {
                this.setState({
                    error: true,
                    errorTitle : "This isn't a zip code of the city in USA."
                });
            }
        } else if (e.target.value.length > 5) {
        } else {                
            this.setState({newZip: zip});
            this.setState({
                error: true,
                errorTitle : "Required 5 digits as a zip code."
            });
        }
    }

    updateDB = async () => {
        var locations = this.state.locations;
        var data;
        if(!locations.length){
            data = {
                currentLocation: {},
                otherCities: []
            }
        } else {
            var currentLocation = locations[0];
            var temp = [];
            for(var i = 1; i < locations.length; i++)
                temp.push(locations[i]);
            data = {
                currentLocation: currentLocation,
                otherCities: temp
            }
        }
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
                Available For Location           
            </div>
            <div className="row t2_sp_work_container">
                    {
                        this.state.locations.map((item)=>{
                            return (                                
                                <button className="t2_sp_work_item t2_sp_loc_selected" style={{cursor: 'default'}} key={item.num}>
                                    <span className="t2_sp_loc_img">
                                        <svg width="16" height="24" viewBox="0 3 28 35"  xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.80761 4.80761L4.10051 4.10051L4.80761 4.80761ZM23.1924 4.80761L23.8995 4.10051L23.1924 4.80761ZM24.5625 21.3125L25.3182 21.9674C25.3266 21.9577 25.3348 21.9479 25.3428 21.9379L24.5625 21.3125ZM14 33.5L13.2443 34.1549C13.4343 34.3741 13.71 34.5 14 34.5C14.29 34.5 14.5657 34.3741 14.7557 34.1549L14 33.5ZM3.4375 21.3125L2.65719 21.9379C2.66521 21.9479 2.67341 21.9577 2.68181 21.9674L3.4375 21.3125ZM14 0C10.287 0 6.72601 1.475 4.10051 4.10051L5.51472 5.51472C7.76516 3.26428 10.8174 2 14 2V0ZM23.8995 4.10051C21.274 1.475 17.713 0 14 0V2C17.1826 2 20.2348 3.26428 22.4853 5.51472L23.8995 4.10051ZM28 14C28 10.287 26.525 6.72601 23.8995 4.10051L22.4853 5.51472C24.7357 7.76516 26 10.8174 26 14H28ZM25.3428 21.9379C26.2927 20.7527 26.9683 19.59 27.3996 18.289C27.8293 16.9924 28 15.6079 28 14H26C26 15.4666 25.8441 16.6252 25.5011 17.6597C25.1597 18.6898 24.6166 19.646 23.7822 20.6871L25.3428 21.9379ZM14.7557 34.1549L25.3182 21.9674L23.8068 20.6576L13.2443 32.8451L14.7557 34.1549ZM2.68181 21.9674L13.2443 34.1549L14.7557 32.8451L4.19319 20.6576L2.68181 21.9674ZM0 14C0 15.6079 0.170675 16.9924 0.600445 18.289C1.03169 19.59 1.70731 20.7527 2.65719 21.9379L4.21781 20.6871C3.38344 19.646 2.84031 18.6898 2.49887 17.6597C2.15595 16.6252 2 15.4666 2 14H0ZM4.10051 4.10051C1.475 6.72601 0 10.287 0 14H2C2 10.8174 3.26428 7.76516 5.51472 5.51472L4.10051 4.10051ZM14 19.875C17.2447 19.875 19.875 17.2447 19.875 14H17.875C17.875 16.1401 16.1401 17.875 14 17.875V19.875ZM8.125 14C8.125 17.2447 10.7553 19.875 14 19.875V17.875C11.8599 17.875 10.125 16.1401 10.125 14H8.125ZM14 8.125C10.7553 8.125 8.125 10.7553 8.125 14H10.125C10.125 11.8599 11.8599 10.125 14 10.125V8.125ZM19.875 14C19.875 10.7553 17.2447 8.125 14 8.125V10.125C16.1401 10.125 17.875 11.8599 17.875 14H19.875Z"/>
                                        </svg>
                                    </span>
                                    {item.name + ', ' + item.state}
                                <span className="t2_sp_loc_btn" onClick={(e) => this.removeOneLoc(e, item.num)}> X </span></button>
                            )
                        })
                    }
                    <button className="t2_sp_work_item" style={{display: this.state.newLoc.zipCode ? 'block' : 'none', cursor: 'default'}}
                    onClick={this.addNewLoc}>
                        <span className="t2_sp_loc_img">
                            <svg width="16" height="24" viewBox="0 3 28 35"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.80761 4.80761L4.10051 4.10051L4.80761 4.80761ZM23.1924 4.80761L23.8995 4.10051L23.1924 4.80761ZM24.5625 21.3125L25.3182 21.9674C25.3266 21.9577 25.3348 21.9479 25.3428 21.9379L24.5625 21.3125ZM14 33.5L13.2443 34.1549C13.4343 34.3741 13.71 34.5 14 34.5C14.29 34.5 14.5657 34.3741 14.7557 34.1549L14 33.5ZM3.4375 21.3125L2.65719 21.9379C2.66521 21.9479 2.67341 21.9577 2.68181 21.9674L3.4375 21.3125ZM14 0C10.287 0 6.72601 1.475 4.10051 4.10051L5.51472 5.51472C7.76516 3.26428 10.8174 2 14 2V0ZM23.8995 4.10051C21.274 1.475 17.713 0 14 0V2C17.1826 2 20.2348 3.26428 22.4853 5.51472L23.8995 4.10051ZM28 14C28 10.287 26.525 6.72601 23.8995 4.10051L22.4853 5.51472C24.7357 7.76516 26 10.8174 26 14H28ZM25.3428 21.9379C26.2927 20.7527 26.9683 19.59 27.3996 18.289C27.8293 16.9924 28 15.6079 28 14H26C26 15.4666 25.8441 16.6252 25.5011 17.6597C25.1597 18.6898 24.6166 19.646 23.7822 20.6871L25.3428 21.9379ZM14.7557 34.1549L25.3182 21.9674L23.8068 20.6576L13.2443 32.8451L14.7557 34.1549ZM2.68181 21.9674L13.2443 34.1549L14.7557 32.8451L4.19319 20.6576L2.68181 21.9674ZM0 14C0 15.6079 0.170675 16.9924 0.600445 18.289C1.03169 19.59 1.70731 20.7527 2.65719 21.9379L4.21781 20.6871C3.38344 19.646 2.84031 18.6898 2.49887 17.6597C2.15595 16.6252 2 15.4666 2 14H0ZM4.10051 4.10051C1.475 6.72601 0 10.287 0 14H2C2 10.8174 3.26428 7.76516 5.51472 5.51472L4.10051 4.10051ZM14 19.875C17.2447 19.875 19.875 17.2447 19.875 14H17.875C17.875 16.1401 16.1401 17.875 14 17.875V19.875ZM8.125 14C8.125 17.2447 10.7553 19.875 14 19.875V17.875C11.8599 17.875 10.125 16.1401 10.125 14H8.125ZM14 8.125C10.7553 8.125 8.125 10.7553 8.125 14H10.125C10.125 11.8599 11.8599 10.125 14 10.125V8.125ZM19.875 14C19.875 10.7553 17.2447 8.125 14 8.125V10.125C16.1401 10.125 17.875 11.8599 17.875 14H19.875Z"/>
                            </svg>
                        </span>
                        {this.state.newLoc.name + ', ' + this.state.newLoc.state}
                    <span className="t2_sp_loc_btn" onClick={this.clearNewLoc}> X </span></button>
            </div>
            <div className="ssu2_addItem" onClick={this.addLicense} style={{display: this.state.showInput?'none':'block'}}
            onClick={()=>this.setState({showInput: true})}>
                + Add {this.state.locations.length ? "Another" : ""} Location 
            </div> 
            <div className="ssu1_input" style={{marginTop: 24, display: this.state.showInput?'block':'none', width: '100%'}}>
                <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                    <div className="input_left_icon">
                        <img alt="img" src={place} width="16px" height='20px' style={{marginTop: '-3px'}}/>
                    </div>
                    <input className="ssu2_modal3_select" placeholder="Zip Code" type="text" value={this.state.newZip} name="curLoc" onChange={this.setOtherLocation}/>
                </div>
                <ErrorState show={this.state.error?'block':'none'} name={this.state.errorTitle} />
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobType);
