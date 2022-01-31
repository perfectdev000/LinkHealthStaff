import React from 'react';
import { connect } from 'react-redux';
import institution from '../../assets/images/institute.svg';
import institutionSize from '../../assets/images/instituteSize.svg';
import institutionWebsite from '../../assets/images/inst_website.svg';
import ErrorState from "../staffSignUp/components/errorState";
import SubHeader from "../staffSignUp/components/subHeader";
import img from '../../assets/images/2-3.png';
import Location from './location';
import Alert from '../../modals/alert';
import './hospSignUp.css';
import { SET_PAGE_VISITED, SET_HOSP_DETAILS } from '../../../constants/actionTypes';

const mapStateToProps = state => {
  return {
      redo: state.hospSignUp.pageVisited,
      location: state.hospSignUp.location,
      hospDetails: state.hospSignUp.healthcares
  }};

const mapDispatchToProps = dispatch => ({
    setPageVisited: (data) => dispatch({ type: SET_PAGE_VISITED, data }),
    setHospdetails: (data) => dispatch({type: SET_HOSP_DETAILS, data})
});

class HospSignUp_2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            instName: '',
            instSize: '',
            instWebsite: '',
            aboutUs: '',
            street: '',
            city: '',
            error: {
                instName: 'none',
                instSize: 'none',
                instWebsite: 'none',
                aboutUs: 'none'
            },
            showAlert: 'none',
            alertContent: 'Please fill the location fields correctly.',
            nameErr: "Healthcare institution name is required.",
            showLocErr: false
        }
    }

    componentWillMount = async () => {
        if(!this.props.redo[0]){
            this.props.history.push('/hospSignUp_1');
        } else {
            window.scrollTo({top: 0, behavior: 'smooth'});
            this.setState({
                instName: this.props.hospDetails.institution_name,
                instSize: this.props.hospDetails.institution_size,
                instWebsite: this.props.hospDetails.institution_website
            });
        }
    }

    setVal = (e) => {
        if(e.target.value.length < 250) {
            this.setState({[e.target.name]: e.target.value});
            var error = this.state.error;
            if(e.target.value !== ''){
                error[e.target.name] = 'none';
                this.setState({error: error});
            } else {
                error[e.target.name] = 'block';
                this.setState({error: error});
            }
        }
    }

    setInstSize = (e) => {
        if(e.target.value.length < 7){
            this.setState({instSize: e.target.value});
            var error = this.state.error;
            error.instSize = 'none';
            this.setState({error: error});
        }
    }

    formatInput = (e) => {
        // Prevent characters that are not numbers ("e", ".", "+" & "-") âœ¨
        let checkIfNum;
        if (e.key !== undefined) {
          // Check if it's a "e", ".", "+" or "-"
          checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-" ;
        }
        else if (e.keyCode !== undefined) {
          // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
          checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
        }
        return checkIfNum && e.preventDefault();
      }

    setInsWebsite = (e) => {
        this.setState({instWebsite: e.target.value});
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        var valid = !!pattern.test(e.target.value);
        var error = this.state.error;
        if(e.target.value === '' || !valid){
            error[e.target.name] = 'block';
            this.setState({error: error});
        } else {
            error[e.target.name] = 'none';
            this.setState({error: error});
        }
    }

    setLocError = (val) => {
        this.setState({showLocErr: val});
    }

    continueToNext = () => {
        var state = this.state;
        var instName =  state.error.instName === 'block' || state.instName === '' ? 'block' : 'none';
        var instSize =  state.error.instSize === 'block' || state.instSize === '' ? 'block' : 'none';
        var instWebsite =  state.error.instWebsite === 'block' || state.instWebsite === '' ? 'block' : 'none';
        
        var error = {
            instName: instName,
            instSize: instSize,
            instWebsite: instWebsite
        };
        this.setState({error: {...error}}); 
        
        // var location = this.props.location;
        // var city = location.city;
        // var address = location.street_address;
        // var locError = (city === '' || address === '') ? true : false;

        if( instName === 'none' && instSize === 'none' && instWebsite === 'none' && !this.state.showLocErr){
            var redo = this.props.redo;
            redo[1] = true;
            this.props.setPageVisited(redo);
            console.log(this.state);
            console.log(this.props.location);
            
            this.props.setHospdetails ({                
                institution_name: this.state.instName,
                institution_size:  this.state.instSize,
                institution_website: this.state.instWebsite
            });
            
            this.props.history.push('/hospSignUp_3');
        }
    }

  render() {
    return (
        <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
            <div className="main_container" style={{padding: '30px 0px 120px'}}>
                <div className="ssu_container">
                    <SubHeader num="2" title="Healthcare Institution" redo={this.props.redo[1]} 
                        next="/hospSignUp_3" prev="hospSignUp_1"
                        history={this.props.history} img={img}/>
                    <div className="hsu2_txt1">
                        Please provide your Healthcare Institution details 
                    </div>
                    <div className="ssu3_body" style={{maxWidth: 800, marginTop: 60}}>                        
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img"src={institution} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Healthcare institution name" type="text" value={this.state.instName} name="instName" onChange={this.setVal}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.instName} name={this.state.nameErr}/>
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img alt="img" width="18px" height="15px" src={institutionSize} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Healthcare institution size" type="number" min="1" max="999999" value={this.state.instSize} name="instSize" onKeyDown={ this.formatInput } onChange={this.setInstSize}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.instSize} name="Healthcare institution size is required. ( 1 ~ 999999 )" />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img"src={institutionWebsite} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Healthcare institution website" type="text" value={this.state.instWebsite} name="instWebsite" onChange={this.setInsWebsite}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.instWebsite} name="Valid website address is required." />
                        </div>                                                
                        <div className="hsu1_txt2" style={{marginTop: 40}}> Corporate Office Address </div>
                        <Location showErr={this.state.showLocErr} street={this.props.location.street_address} continueToNext={this.continueToNext} zipCode={this.props.location.zip_code} 
                        setLocError={this.setLocError} />           
                    </div>
                    <hr style={{margin: '100px 0px 0px'}}/>
                    <div className="ssu_bottom">
                        <div className="ssu_button" onClick={this.continueToNext}>CONTINUE</div>
                    </div>
                </div>
            </div>
            <Alert display={this.state.showAlert} title={"ALERT"}
                content={this.state.alertContent} agreeFn={()=>this.setState({showAlert: 'none'})}/>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospSignUp_2);
