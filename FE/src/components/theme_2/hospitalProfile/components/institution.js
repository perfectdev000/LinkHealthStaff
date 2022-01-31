import React from 'react';
import { connect } from 'react-redux';
import edit_note from '../../../assets/images/edit_note.svg';
import ErrorState from '../../../theme_1/staffSignUp/components/errorState';
import institution from '../../../assets/images/institute.svg';
import institutionSize from '../../../assets/images/instituteSize.svg';
import institutionWebsite from '../../../assets/images/inst_website.svg';
import { callApi, setSession } from '../../../../action';
import { SET_HP_PROFILE } from '../../../../constants/actionTypes';

const mapStateToProps = state => {
  return {
    healthCareInstitution: state.hospitalProfile.healthCareInstitution
  }};

const mapDispatchToProps = dispatch => ({
    setHospitalProfile: (data) => dispatch({type: SET_HP_PROFILE, data})
});

class Institution extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            size: '',
            website: '',
            modalShow: 'none',
            mname: '',
            msize: '',
            mwebsite: '',
            error: {
                name: 'none',
                size: 'none',
                website: 'none'
            },
            nameErr: "Healthcare institution name is required.",
        }
    }
    componentWillMount = async () => {
        this.initState(this.props);
    }
    componentWillReceiveProps = (newProps) => {
      this.initState(newProps);
    }

    initState = (props) => {
        this.setState({
            name: props.healthCareInstitution.name,
            size: props.healthCareInstitution.size,
            website: props.healthCareInstitution.website
        })
    }

    edit = () => {
        this.setState({            
            mname: this.state.name,
            msize: this.state.size,
            mwebsite: this.state.website,
            modalShow: 'block',
            error: {
                name: 'none',
                size: 'none',
                website: 'none'
            }
        });
    }

    setName = (e) => {
        if(e.target.value.length < 250) {
            this.setState({mname: e.target.value});
            var error = this.state.error;
            if(e.target.value !== ''){
                error.name = 'none';
                this.setState({error: error});
            } else {
                error.name = 'block';
                this.setState({error: error});
            }
        }
    }

    setsize = (e) => {
        if(e.target.value.length < 7){
            this.setState({msize: e.target.value});
            var error = this.state.error;
            error.size = 'none';
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
        this.setState({mwebsite: e.target.value});
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

    continueToNext = async () => {
        var state = this.state;
        var name =  state.error.name === 'block' || state.mname === '' ? 'block' : 'none';
        var size =  state.error.size === 'block' || state.msize === '' ? 'block' : 'none';
        var website =  state.error.website === 'block' || state.mwebsite === '' ? 'block' : 'none';
        
        var error = {
            name: name,
            size: size,
            website: website
        };
        this.setState({error: {...error}}); 

        if( name === 'none' && size === 'none' && website === 'none' ){
            this.modalClose();
            var data = {
               healthCareInstitution: {
                    name: this.state.mname,
                    size: this.state.msize,
                    website: this.state.mwebsite
                }
            }
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
    }
    
    modalClose = () => {
        this.setState({
            modalShow: 'none',
            error: {
                name: 'none',
                size: 'none',
                website: 'none'
            }
        });
    }
   
   render() {
    return (
        <div className="t2_sp_work">
            <div className="t2_sp_work_title">
                Healthcare Institution details
                <img alt="icon.svg" src={edit_note} width="18px" style={{marginTop: 4, float: 'right', cursor: 'pointer'}} onClick={this.edit}/>                
            </div>
            <div className="row t2_sp_work_container">
                <div className="col-md-6 col-sm-12">
                    <h6 style={{fontSize:14}}> Healthcare institution name </h6>
                    <h5 className="t2_detail_textbox" title={this.state.name}>{this.state.name} </h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-md-6 col-sm-12">                    
                    <h6 style={{fontSize:14}}> Healthcare institution size </h6>
                    <h5 className="t2_detail_textbox" title={this.state.size}>{this.state.size}</h5>
                    <hr style={{marginTop: 24}}/>
                </div>
                <div className="col-12">                                      
                    <h6 style={{fontSize:14}}> Healthcare institution website </h6>
                    <h5 className="t2_detail_textbox" title={this.state.website}> {this.state.website} </h5>
                </div>
            </div>
            <div className="w3-modal" style={{display: this.state.modalShow}} >
                <div className="w3-modal-content ssu2_modal1" style={{maxHeight: 600, overflowY: 'auto'}}>
                    <div className="w3-container">
                        <div className="ssu2_modal1_text1">Edit Healthcare Institution Details</div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img" src={institution} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Healthcare institution name" type="text" value={this.state.mname} name="mname" onChange={this.setName}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.name} name={this.state.nameErr}/>
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img alt="img" width="18px" height="15px" src={institutionSize} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Healthcare institution size" type="number" min="1" max="999999" value={this.state.msize} name="size" onKeyDown={ this.formatInput } onChange={this.setsize}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.size} name="Healthcare institution size is required. ( 1 ~ 999999 )" />
                        </div>
                        <div className="ssu2_modal1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img width="18px" height="15px" alt="img"src={institutionWebsite} />
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Healthcare institution website" type="text" value={this.state.mwebsite} name="mwebsite" onChange={this.setInsWebsite}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.website} name="Valid website address is required." />
                        </div>
                        <hr style={{margin: '60px 0px 0px'}}/>
                        <div className="row ssu_bottom">
                            <button className="ssu2_modal1_button1" onClick={this.continueToNext}> SAVE </button>
                            <button className="ssu2_modal1_button2" onClick={this.modalClose}> CANCEL </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Institution);
