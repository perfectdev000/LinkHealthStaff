import React from 'react';
import { connect } from 'react-redux';
import NursingState from './components/nursingState';
import Insurance from './components/Insurance';
import Education from './components/education';
import Certification from './components/certification';
import Modal1 from './components/modal1';
import Modal2 from './components/modal2';
import Modal3 from './components/modal3';
import Modal4 from './components/modal4';
import SubHeader from './components/subHeader';
import ErrorState from "./components/errorState";
import img from '../../assets/images/3-5.png';
import place from '../../assets/images/place.svg';
import { stateOfUs } from '../../../constants/otherConstans';
import { SET_LICENCE, SET_SELECTED_CERT, SET_SELECTED_EXP, SET_PAGE_VISITED, SET_SELECTED_STATES, SET_EXPS } from '../../../constants/actionTypes';
import './staffSignUp_2.css';
import $ from 'jquery';

const ToggleExpItem = (props) => {
    const toggleExp = (e) => {
        props.toggleExp(props.id);
    }

    var className = (props.selectedExp !== props.exp || props.showOtherExp === 'none') ? "ssu1_locItem ssu1_nearLocItem" :"ssu1_locItem";
    // className += props.exp==='outpatient services, please specify'?' ssu2_otherExp_item':'';
    if( props.exp === 'Other' && props.display === 'none')
        className ='ssu1_locItem ssu2_otherExp_item';
    else if (props.exp === 'Other')
        className ='ssu1_locItem ssu1_nearLocItem ssu2_otherExp_item';
    return (
        <button className={ className }
        onClick={toggleExp}>
            {props.exp}
        </button>
    );
}

const mapStateToProps = state => {
    return {
        _mainExps: state.staffSignUp._mainExps,
        _restExps: state.staffSignUp._restExps,
        redo: state.staffSignUp.pageVisited,
        nurseLicence: state.staffSignUp.nurseLicence,
        insurance: state.staffSignUp.insurance.provider,
        degree: state.staffSignUp.degree.degree,
        cert: state.staffSignUp.cert,
        selectedCert: state.staffSignUp.selectedCert,
        selectedStates: state.staffSignUp.selectedStates,
        selectedExp: state.staffSignUp.selectedExp,
        showOtherExp: state.staffSignUp.showOtherExp,
        showExtend: state.staffSignUp.showExtend
    }
};

const mapDispatchToProps = dispatch => ({
    setSelectedStates: (data) => dispatch({type: SET_SELECTED_STATES, data}),
    setLicence: (data) => dispatch({ type: SET_LICENCE, data }),
    setSelectedCert: (data) => dispatch({ type: SET_SELECTED_CERT, data }),
    setSelectedExp: (data) => dispatch({ type: SET_SELECTED_EXP, data}),
    setPageVisited: (data) => dispatch({ type: SET_PAGE_VISITED, data}),
    setExps: (data) => dispatch({ type: SET_EXPS, data})
});

class StaffSignUp_2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redo: [],
            exp: '',
            _exps: [
                "Acute Care Hospitals",
                "Urgent Care Centers",
                "Rehabilitation Centers",
                "Nursing Homes",
                "Other Long-term Care Facilities",
                "Specialized Outpatient Services"
            ],
            nurseLicence: [],
            curState: false,
            newState: '',
            selectedStates: [],
            stateVal: '',
            insurance: false,
            degree: false,
            cert: [],
            stateOfUs: [],
            showOtherExp: 'block',
            error: 'none'
        }
    }

    componentWillMount = async () => {
        console.log(this.props.selectedExp);
        this.convertObjToArr(this.props.nurseLicence);
        this.setState({
            insurance: this.props.insurance,
            degree: this.props.degree,
            cert: this.props.cert,
            exp: this.props.selectedExp,
            redo: [...this.props.redo],
            selectedStates: this.props.selectedStates,
            showOtherExp: this.props.showOtherExp,
            showExtend: this.props.showExtend
        });
        window.scrollTo({top: 0, behavior: 'smooth'});
        var temp = [];
        for(var i = 0; i < stateOfUs.length; i++){
            var temp1 = {
                name: stateOfUs[i],
                num: i
            };
            temp.push(temp1);
        }
        this.setState({stateOfUs: [...temp]});
    }

    componentDidMount = () => {
        if(!this.props.redo[1]){
            this.props.history.push('/staffSignUp');
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.selectedExp);
        this.convertObjToArr(newProps.nurseLicence);
        this.setState({
            insurance: newProps.insurance,
            degree: newProps.degree,
            cert: newProps.cert,
            redo: [...newProps.redo],
            selectedStates: [...newProps.selectedStates],
            exp: newProps.selectedExp,
            showOtherExp: newProps.showOtherExp
        });
    }

    convertObjToArr = (obj) => {
        var arr = [];
        for (let state in obj) {
            obj[state].state = state;
            arr.push(obj[state]);
        }
        this.setState({nurseLicence: arr});
    }

    toggleExp = (exp) => {
        if(this.state.exp === exp){
            this.setState({exp: ''});
            this.props.setSelectedExp({exp: '', showOtherExp: 'block'});
        } else {
            this.setState({exp: exp});
            this.setState({error: 'none'});
            this.props.setSelectedExp({exp: exp, showOtherExp: 'block'});
        }
        this.setState({showOtherExp: 'block'});
    }

    showOtherExp = () => {
        var temp = this.state.showOtherExp === 'none' ? 'block' : 'none';
        this.setState({exp: ''});
        this.setState({showOtherExp: temp});
        this.props.setSelectedExp({exp: '', showOtherExp: temp});
    }

    setOtherExp = (e) => {
        if(e.target.value.length < 51){
            this.setState({exp: e.target.value});
            if(e.target.value.length > 0)
                this.setState({error: 'none'});
            this.props.setSelectedExp({exp: e.target.value, showOtherExp: 'none'});
        }
    }

    addState = (e) => {
        var state = e.target.value;

        var num;
        var states = this.state.stateOfUs;
        for( var i = 0; i < states.length; i++){
            if(states[i].name === state){
                num = i;
            }
        }
        
        var nurseLicence = this.props.nurseLicence;
        nurseLicence[state] = { 
            licences: []
        };
        this.props.setLicence(nurseLicence);
        this.setState({stateVal: ''});

        var arr = this.state.selectedStates;
        arr.push(num);
        this.props.setSelectedStates(arr);
    }

    setCurState = (state) => {
        this.setState({curState: state});
    }

    setLicence = (newLicence) => {
        var nurseLicence = this.props.nurseLicence;
        nurseLicence[this.state.curState].licences.push({
            image: newLicence.file,
            imgUrl: newLicence.imgUrl,
            name: newLicence.lname,
            number: newLicence.lnum,
            expDate: newLicence.expDate,
            state: this.state.curState,
            num: nurseLicence[this.state.curState].licences.length
        });
        this.props.setLicence(nurseLicence);
    }

    showModal4 = () => {
        this.props.setSelectedCert(this.props.cert.length);
        $('#modal4').show();
    }

    continueToNext = () => {
        if( this.state.exp === '') {
            this.setState({error: 'block'});
        } else {
            this.setState({error: 'none'});
            var redo = this.props.redo;
            redo[2] = true;
            this.props.setPageVisited(redo);

            this.props.history.push("/staffSignUp_3");
        }
    }

  render() {
    return (
        <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
            <div className="main_container" style={{padding: '30px 0px 90px'}}>
                <div className="ssu_container">
                    <SubHeader num="3" title="Credentials" redo={this.state.redo[2]} 
                        next="/staffSignUp_3" prev="/staffSignUp_1" 
                        history={this.props.history} img={img}/>
                    <div className="ssu1_body" >
                        <div className="ssu_txt1">
                            Where do you have an active nursing license?
                        </div>
                        {
                            this.state.nurseLicence.map( (item) => {
                                return <NursingState item={item} setCurState={this.setCurState} key={item.state} stateOfUs={this.state.stateOfUs}/>
                            })
                        }
                        <div className="ssu2_modal1_input" style={{maxWidth: '800px'}}>
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox" style={{marginTop: '50px',maxWidth: '800px'}}>
                                <div className="input_left_icon">
                                    <img alt="img"src={place} width="16px" height="20px" style={{marginTop: '-3px'}}/>
                                </div>
                                <select className="ssu2_modal3_select" name="option" onChange={this.addState} value={this.state.stateVal}>
                                    <option value="" disabled selected hidden> Select a state</option>
                                    {
                                        this.state.stateOfUs.map((state) => {
                                            return <option key={state.num} disabled={this.state.selectedStates.indexOf(state.num) !== -1 ? true : false} value={state._id}> {state.name} </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        
                        <div className="ssu2_text2">Do you have Liability Insurance?</div>
                        <Insurance />
                        <div className="ssu2_addItem" style={{display: this.state.insurance?"none":"block"}} 
                          onClick={()=>$('#modal2').show()}> + Add Liability Insurance </div>
                        <div className="ssu2_text3_4">What’s your highest education level?</div>
                        <Education/>
                        <div className="ssu2_addItem" style={{display: this.state.degree?"none":"block"}} 
                          onClick={()=>$('#modal3').show()}> + Add Degree </div>
                        <div className="ssu2_text3_4">What certifications do you have?</div>
                        <Certification />                               
                        <div className="ssu2_addItem" onClick={this.showModal4}>
                             + Add {this.state.cert.length ? 'Another' : ''} Certifications
                        </div> 
                        <div className="ssu2_text3_4">In which medical setting do you have experience in? </div>
                        <div className="row ssu1_locs">
                            {
                                this.state._exps.map((item) => {
                                    return <ToggleExpItem key={item} exp={item} id={item} toggleExp={this.toggleExp} display='block' selectedExp={this.state.exp}/>
                                })
                            }
                            <div className="ssu2_otherItem">
                                <ToggleExpItem exp="Specialized Outpatient Surgery Center" id="Specialized Outpatient Surgery Center" toggleExp={this.toggleExp} display='block' selectedExp={this.state.exp}/>
                                <ToggleExpItem exp="Other" toggleExp={this.showOtherExp} selectedExp={this.state.exp} display={this.state.showOtherExp}/>
                            </div>                    
                        </div>
                        <input type='text' value={this.state.exp} className='ssu2_otherExp' placeholder="Please specify"
                            style={{display: this.state.showOtherExp === 'none'?'block':'none'}} onChange={this.setOtherExp}
                            onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <ErrorState show={this.state.error} name="Please Enter Your Medical Settings." />  
                        </div>
                        <hr style={{margin: '30px 0px 0px'}}/>
                        <div className="ssu_bottom">
                            <div className="ssu_button" onClick={this.continueToNext}>CONTINUE</div>
                        </div>
                        <Modal1 setLicence={this.setLicence}/>
                        <Modal2/>
                        <Modal3/>
                        <Modal4/>
                    </div> 
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffSignUp_2);
