import React from 'react';
import { connect } from 'react-redux';
import SubHeader from '../staffSignUp/components/subHeader';
import img from '../../assets/images/3-3.png';
import { SET_PAGE_VISITED, INIT_STATE } from '../../../constants/actionTypes';
import { callApi } from '../../../action';
import ErrorState from '../staffSignUp/components/errorState';
import Pending from '../../modals/pending';

const mapStateToProps = state => {
  return {
    redo: state.hospSignUp.pageVisited,
    healthcare_contacts: state.hospSignUp.healthcare_contacts,
    locations: state.hospSignUp.location,
    healthcares: state.hospSignUp.healthcares
  }};

const mapDispatchToProps = dispatch => ({
    setPageVisited: (data) => dispatch({ type: SET_PAGE_VISITED, data }),
    initState: () => dispatch({ type: INIT_STATE })
});

class StaffSignUp_4 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redo: [],
            userName: 'William',
            agreement: false,
            error: false,
            showAlert: 'none',
            showPending: 'none',
            mm: '',
            yy: '',
            dd: '',
            month: '',
            date: '',
            locations: '',
            after_date: 'th'
        }
    }

    componentWillMount = async () => {
        if(!this.props.redo[1]){
            this.props.history.push('/hospSignUp_1');
        } else {
            window.scrollTo({top: 0, behavior: 'smooth'});
            var date = new Date();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            var dat = date.getDate();
            var after_date = 'th'
            if(dat === 1 || dat === 21 || dat === 31) {
                after_date = 'st';
            } else if (dat === 2 || dat === 22) {
                after_date = 'nd';
            }
            this.setState({after_date: after_date});
            var mm = date.getMonth() + 1;
            var month = months[mm - 1];
            var yy = date.getFullYear();
            var dd = dat < 10 ? '0'+ dat : dat;
            mm = mm < 10 ? '0'+ mm : mm;
            this.setState({yy: yy, dd: dd, mm: mm, month: month, date: dat}); 
            var locations = this.props.locations;
            var loc = locations.street_address + ' street, ' + locations.city + ', ' + locations.state + ', ' + locations.zip_code;
            this.setState({locations: loc});
            var name = this.props.healthcare_contacts.first_name;
            this.setState({userName: name});      
        }
    }

    setAgreement = (e) => {
        this.setState({agreement: e.target.checked, error: false, showAlert: 'none'});
    }

    finishSignUp = async () => {
        if(this.state.agreement){
            this.setState({showPending: 'block'});
            var props = this.props;
            var data = {
                name: props.healthcare_contacts.first_name + ' ' + props.healthcare_contacts.last_name,
                email: props.healthcare_contacts.company_email_address,
                hiringRole: props.healthcare_contacts.role_id,
                healthCareInstitution: {
                    name: props.healthcares.institution_name,
                    size: props.healthcares.institution_size,
                    website: props.healthcares.institution_website
                },
                corporateAddress: {
                    zipCode: props.locations.zip_code,
                    street: props.locations.street_address,
                    city: props.locations.city,
                    state: props.locations.state
                },
                password: props.healthcare_contacts.password,
                phone: props.healthcare_contacts.phone_number,
                avatar: '',
                badge: true
            };
            console.log(data);
            var res = await callApi("POST", "/v1/LHS/hospital/signup", null, data);
            console.log(res);
            this.setState({showPending: 'none'});
            this.props.initState();
            this.props.history.push("/logIn");
        } else
            this.setState({showAlert: 'block'});
    }

  render() {
    return (
        <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
            <div className="main_container" style={{padding: '30px 0px 90px'}}>
                <div className="ssu_container">
                    <SubHeader num="3" title="Agreement" redo={this.state.redo[2]} 
                        next={false} prev="/hospSignUp_2" 
                        history={this.props.history} img={img}/>
                    <div className="ssu4_body">
                        <div className="hsu1_txt1">
                            Congrats, {this.state.userName}, you're on the last step!
                        </div>
                        <div className="ssu4_text2">
                            Please go through to the agreement and provide your consent
                        </div>
                        <div className="hsu3_txt3">
                            Hospital Staffing Agreement
                        </div>
                        <hr style={{margin: '40px 0px 0px'}}/>
                        <div className="ssu4_text3">
                        This Agreement (the “Agreement”) entered into this {this.state.date + this.state.after_date} day of {this.state.month}, {this.state.yy} (“Effective Date – {this.state.mm}/{this.state.dd}/{this.state.yy}”),
                        by and between LINKHEALTHSTAFF LLC (“LHS”), a Nevada registered corporation with its corporate office
                        located Los Angeles, CA, and {this.props.healthcares.institution_name} (hereinafter referred to as “CLIENT”) located at {this.state.locations} WHEREAS, LHS operates an on-demand healthcare staffing platform that facilitates hiring of healthcare
                        personnel to provide services to CLIENT. WHEREAS, CLIENT operates a Hospital/Medical Facility and CLIENT
                        desires that LHS shall provide medical services based on CLIENT needs.  
                        </div> 
                        <div className="ssu4_text3">
                        NOW THEREFORE, in consideration of the mutual promises and covenants between LHS and CLIENT,
                        (jointly hereinafter referred to as “Party/Parties”), the Parties hereby agree:
                        </div> 
                        <div className="ssu4_text3">
                        1. TERM.<br/>
                        The term of this Agreement will commence on the date of the last signature and will continue for three (3) years
                        unless terminated prior thereto in accordance with the terms of this Agreement. If neither Party terminates
                        pursuant to the terms herein, this agreement shall be automatically renewed for increment of additional (1) year
                        periods and shall not require a writing by either party hereto in order to extend the term hereof.  
 
                        </div> 
                        <div className="ssu4_text3">
                        2. TERMINATION.<br/>
                        Either Party may terminate this Agreement at any time. Said termination will not affect the rights or
                        responsibilities subsequent to transactions occurring prior to the effective date of termination.  
                        </div> 
                        <div className="ssu4_text3">
                        3. PERSONNEL.<br/>
                        LINKHEALTHSTAFF shall provide CLIENT with healthcare staff that comply with all pertinent terms and
                        conditions of licensure and credentials including, but not limited to, the following list: <br/>
                        Proof of current licensure, registration and or certification (if applicable).  <br/>
                        Written verification of two references.  <br/>
                        Written verification of worker’s unrestricted credential (if applicable).  <br/>
                        Written verification of current cardiopulmonary resuscitation certification.  <br/>
                        Possess proof of an annual tuberculosis test or chest X-ray.   <br/>
                        Criminal Background Check and disclosure statement.  <br/>
                        </div>
                        <div className="ssu4_confirm" style={{marginTop: 100}}>
                            <div style={{width: '100%', maxWidth: '730px', margin: '0px auto'}}>
                                <input type="checkbox" className="w3-check ssu4_checkBox" onChange={this.setAgreement}/>
                                <b style={{fontWeight: 'normal', color: this.state.error?"red":null}}>I provide my consent to Hospital Staffing Agreement</b>
                            </div>
                            <ErrorState show={this.state.showAlert} name="Please provide your consent to Hospital Staffing Agreement." />
                        </div>                                         
                    </div>
                    <hr style={{margin: '30px 0px 0px'}}/>
                    <div className="ssu_bottom">
                        <div className="ssu_button" onClick={this.finishSignUp}>CONTINUE</div>
                    </div>
                </div>
            <Pending display={this.state.showPending} title="Creating your profile"/>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffSignUp_4);
