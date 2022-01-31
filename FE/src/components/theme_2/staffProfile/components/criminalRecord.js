import React from 'react';
import { connect } from 'react-redux';
import criminal from '../../../assets/images/criminal.svg';
import greenSuccess from '../../../assets/images/greenSuccess.png';
import ErrorState from '../../../theme_1/staffSignUp/components/errorState';
import { setSession, callApi } from '../../../../action';
import { SET_SP_PROFILE, SET_AUTH } from '../../../../constants/actionTypes';
const mapStateToProps = state => {
    return {
        _id: state.staffProfile._id,
        socialSecurityNumber: state.staffProfile.socialSecurityNumber
    }
};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({type: SET_SP_PROFILE, data}),
    setAuth: (data) => dispatch({type: SET_AUTH, data})
});

class CriminalRecord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            oldCriminal: '',
            criminal: '',
            criminalErr: 'none',
            showSuccess: 'none'
        }
    }

    componentDidMount = () => {
        this.setState({criminal: this.props.socialSecurityNumber, oldCriminal: this.props.socialSecurityNumber });
    }

    componentWillReceiveProps = (props) => {
        this.setState({criminal: props.socialSecurityNumber, oldCriminal: props.socialSecurityNumber });
    }

    setCriminalRecord = (e) => {
        if(e.target.value.length < 10){
            this.setState({criminal: e.target.value});
            if(e.target.value.length)
                this.setState({criminalErr: 'none'});
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

    handleSubmit = async () => {
        if(this.state.criminal === ''){
            this.setState({criminalErr: 'block'});
        } else if (this.state.criminal !== this.state.oldCriminal) {                
            var data = {socialSecurityNumber: this.state.criminal};
            if(this.props.admin)
            var token =  "admin_kackey_" + localStorage.getItem('token');
            else
                token =  "staff_kackey_" + localStorage.getItem('token');
            var type = localStorage.getItem('type');
            var _id = this.props._id;
            var res = await callApi("POST", "/v1/LHS/staff/update/" + _id, token, data);
            setSession( res.token, res.data._id, type);
            this.props.setStaffProfile(res.data);
            this.setState({showSuccess: 'block'});
            var timer = setTimeout(() => {this.setState({showSuccess: 'none'}); clearTimeout(timer); }, 3000);
            data = {            
                name: res.data.name, 
                type: 'staff', 
                avatar: res.data.avatar,
                badge: res.data.badge
            }
            this.props.setAuth(data);
        }
    }

  render() {
    return (
            <div className="nur_text1" style={{marginTop: '48px'}}>
                <h4 style={{textAlign: 'left'}}>Criminal Record</h4>
                <div className="row t2_sp_avatar_container">
                    <p style={{textAlign: 'left'}}>Please provide your Social Security Number to allow us run a criminal record background check</p>
                    <div className="row" style={{marginTop: '15px'}}>
                        <div className="col-md-5 col-sl-12">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '8px'}}>
                                <div className="input_left_icon">
                                    <img width="22px" height="17px" alt="img"src={criminal}/>
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Social Security Number"  type="number" value={this.state.criminal}
                                onKeyDown={ this.formatInput } onChange={this.setCriminalRecord}  
                                onKeyUp={(e)=>{if(e.key === 'Enter') this.handleSubmit()}}/>
                            </div>
                            <ErrorState show={this.state.criminalErr} name="Please enter your Social Security Number." />
                        </div>
                        <div className="col-md-3 col-sl-12">
                            <button className="t2_sp_crimianlBtn" style={{marginTop: '8px'}} onClick={this.handleSubmit}>SAVE</button>
                        </div>
                    </div>
                    <div className="t2_green_success" style={{display: this.state.showSuccess, textAlign: 'left'}}>
                        <img src={greenSuccess} style={{float: 'left', marginRight: 20, width: 32 }} alt="greenSuccess.png" />
                        Social Security #{this.state.criminal} has been added successfully
                    </div>
                </div>                  
            </div>                     
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriminalRecord);
