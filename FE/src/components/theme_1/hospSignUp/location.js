import React from 'react';
import { connect } from 'react-redux';
import home from '../../assets/images/home.svg';
import place from '../../assets/images/place.svg';
import ErrorState from "../staffSignUp/components/errorState";
import './hospSignUp.css';
import { SET_HOSP_LOCATIONS } from '../../../constants/actionTypes';
import { callApi } from '../../../action';

const mapStateToProps = state => {
  return {
      location: state.hospSignUp.location
  }};

const mapDispatchToProps = dispatch => ({
    setLocations: (data) => dispatch({ type: SET_HOSP_LOCATIONS, data})
});

class Loaction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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

    componentWillMount = async () => {
        var zipCode = this.props.zipCode;
        var street = this.props.street;
        this.initState(street, zipCode);
        if(zipCode !== "") 
            this.setState({showZipErr: true}); 
        if(street !== "") 
            this.setState({showStreetErr: true});   
    }

    componentWillReceiveProps = (newProps) => {
        var zipCode = newProps.zipCode;
        var street = newProps.street;
        this.initState(street, zipCode);
        if(newProps.showErr === true){
            this.setState({
                showZipErr: true,
                showStreetErr: true
            })
        }
    }

    initState = async (street, zipCode) => {        
        var state = '', city = '';
        var zipError = 'block';
        // this.props.setLocError(true);
        var zip = zipCode + '';
        if(zip.length === 5){
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

                zipError = 'none';
                // this.props.setLocError(false);
            }
        }
        
        var error = this.state.error;
        error.zipCode = zipError;
        if(street === ''){
            error.street = 'block';
            // this.props.setLocError(true);
        } else {
            error.street = 'none'
            // this.props.setLocError(false);
        }
        this.setState({
            street: street,
            state: state,
            city: city,
            zipCode: zipCode,
            error: error
        });
    }

    setStreet = (e) => {
        if(e.target.value.length < 201){
            var error = this.state.error;
            if(e.target.value === ''){
                error.street = 'block';
            } else {
                error.street = 'none';
            }
            this.setState({street: e.target.value, showStreetErr: true, error: error});        
        }
    }

    setStreetErr = () => {
        if(this.state.street === ""){
            this.props.setLocError(true);
        } else {
            this.props.setLocError(false);
        }
        this.setState({showStreetErr: true}); 
        var location = {
            zip_code: this.state.zipCode,
            city: this.state.city,
            state: this.state.state,
            street_address: this.state.street
        };        
        console.log(location);
        this.props.setLocations(location);
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
        else {
            error.street = 'none';
        }
        /** check if the zip code value is valid */
        var zip = this.state.zipCode;
        var city = '', state = '';
        if(zip.length !== 5) {
            error.zipCode = 'block';
            // this.props.setLocError(true);
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
                // this.props.setLocError(false);
            }
        }
        console.log(error);
        this.setState({ error: error, city: city, state: state});
        
        var location = {
            zip_code: this.state.zipCode,
            city: city,
            state: state,
            street_address: street
        };        
        console.log(location);
        this.props.setLocations(location);
    }

  render() {
    return (
        <div>
            <div className="ssu2_modal1_input" style={{marginTop: 40}}>
                <div className="ssu2_modal1_input  ssu2_modal3_selectBox" style={{marginBottom: '10px'}}>
                    <div className="input_left_icon">
                        <img width="18px" height="15px" alt="img"src={place} />
                    </div>
                    <input className="ssu2_modal3_select" placeholder="Zip code" type="text" value={this.state.zipCode} name="zipCode" onChange={this.setZipCode}
                        onKeyUp={(e)=>{if(e.key === 'Enter') this.props.continueToNext()}}/>
                </div>
                <ErrorState show={this.state.showZipErr?this.state.error.zipCode:'none'} name="Valid zip code is required." />
            </div>
            <div className="ssu2_modal1_input">
                <div className="ssu2_modal3_selectBox">
                    <div className="input_left_icon">
                        <img width="18px" height="15px" alt="img"src={home} />
                    </div>
                    <input className="ssu2_modal3_select" placeholder="Street Address" type="text" value={this.state.street} name="street" onBlur={this.setStreetErr} onChange={this.setStreet}
                        onKeyUp={(e)=>{if(e.key === 'Enter') this.props.continueToNext()}}/>
                </div>
                <ErrorState show={this.state.showStreetErr?this.state.error.street:'none'} name="Street address is required." />
            </div>
            <div className="row ssu2_modal1_input">
                <div className="col-md-6" style={{padding: 0}} onClick={this.needToSetZip}>
                    <div className="ssu2_modal3_selectBox">
                        <div className="input_left_icon">
                            <img width="18px" height="15px" alt="img" src={place} />
                        </div>
                        <input className="ssu2_modal3_select" placeholder="City" disabled={true} type="text" value={this.state.city}/>
                    </div>
                </div>
                <div className="col-md-6" style={{padding: 0}} onClick={this.needToSetZip}>
                    <div className="ssu2_modal3_selectBox hsu1_input2">
                        <div className="input_left_icon">
                            <img alt="img"src={place}  width="18px" height="15px" style={{marginTop: '-3px'}}/>
                        </div>
                        <input className="ssu2_modal3_select" placeholder="State" disabled={true} type="text" value={this.state.state}/>
                    </div>
                </div>
            </div>            
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loaction);
