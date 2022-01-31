import React from 'react';
import { connect } from 'react-redux';
import SubHeader from './components/subHeader';
import ErrorState from "./components/errorState";
import img from '../../assets/images/2-5.png';
import place from '../../assets/images/place.svg';
import './staffSignUp_1.css';
import { SET_LOCATIONS, SET_PAGE_VISITED } from '../../../constants/actionTypes';
import { callApi } from '../../../action';

const AddLocItem = (props) => {
    return (
        <button className={props.selected?"ssu1_locItem ":"ssu1_locItem ssu1_nearLocItem"} id={props.name}>
            <p style={{margin: 'auto auto'}} onClick={(e) =>{props.setCurLoc(props.name, props.state, props.zipCode)}}>
                {props.name + ', ' + props.state}
            </p>
        </button>
    );
}

const SuggestionItem = (props) => { return (
        <button className={props.selected?"ssu1_locItem ":"ssu1_locItem ssu1_nearLocItem"}
          title={props.zipCode} style={{wordBreak: 'break-all', color: props.name==='ERROR'?"red":null, border: props.name==='ERROR'?"2px solid red":"1px solid #009CDE"}}
          id={props.name} onClick={() => props.setNearLoc(props.name, props.state, props.zipCode, props.selected)}>
            <p style={{margin: '10px auto'}}>{props.name + (props.zipCode!=="ERROR"?', ':"" )+ props.state}</p>
        </button>
    );
}

const mapStateToProps = state => {
  return {
    redo: state.staffSignUp.pageVisited,
    curVal: state.staffSignUp.curVal,
    nearVal: state.staffSignUp.nearVal,
    otherLoc: state.staffSignUp.otherLoc,
    nearLoc: state.staffSignUp.nearLoc,
    addLoc: state.staffSignUp.addLoc,
    curCity: state.staffSignUp.curCity,
    nearCity: state.staffSignUp.nearCity
  }};

const mapDispatchToProps = dispatch => ({
    setPageVisited: (data) => dispatch({ type: SET_PAGE_VISITED, data}),
    setLocations: (data) => dispatch({type: SET_LOCATIONS, data})
});

class StaffSignUp_1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redo: [],
            curVal:'',
            nearVal:'',
            otherLoc: [],
            addLoc: [],
            nearLoc: [
            ],
            curCity: {
                name: false,
                state: false,
                zipCode: false,
                selected: false
            },
            nearCity: [],
            error: {
                curLoc: false,
                nearLoc: false
            }
        }
    }
    componentWillReceiveProps = (newProps) => {
        this.setState({redo: [...newProps.redo]});
    }

    componentWillMount() {
        if(!this.props.redo[0]){
            this.props.history.push('/staffSignUp'); 
        } else {
            window.scrollTo({top: 0, behavior: 'smooth'});
            this.setState({redo: [...this.props.redo]});
            this.setState({
                curCity: {...this.props.curCity}, 
                nearCity: [...this.props.nearCity],
                curVal: this.props.curVal,
                nearVal: this.props.nearVal,
                addLoc: [...this.props.addLoc],
                otherLoc: [...this.props.otherLoc],
                nearLoc: [...this.props.nearLoc]
            });
        }
    }
   
    setCurZip = async (e) => {         
        var zip = e.target.value;
        var error = this.state.error;
        this.setState({curVal: zip});
        this.setState({curCity: {name: false, zipCode: false, selected: false}});
        if(this.state.curCity.name){
            this.setState({
                curCity:{
                        name: false,
                        state: false,
                        zipCode: false,
                        selected: false
                    },
                addLoc: [],
                nearLoc: [],
                curVal: ''
            });
        }
        if(zip.length === 5){
            if(zip[0] === '0'){
                zip = zip.substring(1);
            }
            if(zip[0] === '0'){
                zip = zip.substring(1);
            }
            var city;
            var state;
            var res = await callApi('POST', '/v1/LHS/other/getCityState', null, {zip: zip}); 
            console.log(res);           
            if(res.result === 'OK'){
                city = res.data.city;
                state = res.data.state;
                error.curLoc = false;
                this.setState({error: error});
                var temp = {
                    name: city,
                    state: state,
                    zipCode: zip
                };

                var addLoc = this.state.addLoc;
                addLoc = [temp];
                this.setState({addLoc: [...addLoc]});
            } else {
                error = this.state.error;
                error.curLoc = "This isn't a zip code of the city in USA." ;
                this.setState({error: error});
            }
        } else {
            error = this.state.error;
            error.curLoc = "Required 5 digits as a zip code." ;
            this.setState({error: error});
        }
    }

    
    setOtherZip = async (e) => {         
        var zip = e.target.value;
        var error = this.state.error;
        var otherLoc = this.state.otherLoc;       
        this.setState({nearVal: zip});
        var city, state;
        if(zip.length === 0) {
            error.nearLoc = '';
        } else if(zip.length !== 5) {
            error.nearLoc = 'Required 5 digits as a zip code.';
            if(otherLoc.length && !otherLoc[otherLoc.length-1].selected)
                otherLoc.pop();
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
                error.nearLoc = '';
                otherLoc.push({
                    name: city, 
                    state: state,
                    zipCode: zip,
                    selected: false
                });
            } else {
                error = this.state.error;
                error.nearLoc = "This isn't a zip code of the city in USA." ;
                this.setState({error: error});
            }
        }
        this.setState({error: error, otherLoc: otherLoc}); 
    }

    setCurLoc = async (name, state, zipCode) => {
        if(!this.state.selected){
            var addLoc = this.state.addLoc;
            if(addLoc.length){
                addLoc[0].selected = true;
                this.setState({
                    addLoc: [...addLoc]
                }); console.log(addLoc);
            } else {
                addLoc.push({
                    name: name, 
                    state: state,
                    zipCode: zipCode,
                    selected: true
                })
            }
            var error = this.state.error;
            error.curLoc = false;
            this.setState({error: error});
            this.setState({curCity: { name: name, zipCode: zipCode, state: state, selected: true}});
            this.setState({curVal: (name + ", " + state)});
            zipCode = parseInt(zipCode, 10);
            var res = await callApi('POST', '/v1/LHS/other/getNearCityState', null, {zipCode: zipCode, name: name, state: state});
            if(res.result === 'OK')
                this.setState({nearLoc: [...res.data]});
            // this.setState({nearLoc: []}, async () => {
            //     let num = 0;
            //     var i = 0;
            //     if(zipCode < 60000){
            //          while (num < 6) {
            //             var res = await callApi('POST', '/v1/LHS/other/getCityState', null, {zip: zipCode + i});            
            //             if(res.result === 'OK'){
            //                 var newCity = res.data.city;
            //                 var newState = res.data.state;
            //                 if(name !== newCity || state !== newState){
            //                     var temp = {
            //                         name: newCity,
            //                         state: newState,
            //                         zipCode: zipCode + i
            //                     };
            //                     var nearLoc = this.state.nearLoc;
            //                     var repeat = false;
            //                     for(var j = 0; j < nearLoc.length; j++){
            //                         if(nearLoc[j].name === newCity && nearLoc[j].state === newState )
            //                             repeat = true;
            //                     }
            //                     if(!repeat){
            //                         nearLoc.push(temp);
            //                         this.setState({nearLoc: [...nearLoc]});
            //                         num++;
            //                     }
            //                     i++;
            //                     continue;
            //                 } else {
            //                     i++;
            //                     continue;
            //                 }
            //             } else {
            //                 i++;
            //                 continue;
            //             }
            //         }
            //     } else {
            //         while(num < 6) {
            //             var res = await callApi('POST', '/v1/LHS/other/getCityState', null, {zip: zipCode - i});            
            //             if(res.result === 'OK'){
            //                 var newCity = res.data.city;
            //                 var newState = res.data.state;
            //                 if(name !== newCity || state !== newState){
            //                     var temp = {
            //                         name: newCity,
            //                         state: newState,
            //                         zipCode: zipCode - i
            //                     };
            //                     var nearLoc = this.state.nearLoc;
            //                     var repeat = false;
            //                     for(var j = 0; j < nearLoc.length; j++){
            //                         if(nearLoc[j].name === newCity && nearLoc[j].state === newState )
            //                             repeat = true;
            //                     }
            //                     if(!repeat){
            //                         nearLoc.push(temp);
            //                         this.setState({nearLoc: [...nearLoc]});
            //                         num++;
            //                     }
            //                     i++;
            //                     continue;
            //                 } else {
            //                     i++;
            //                     continue;
            //                 }
            //             } else {
            //                 i++;
            //                 continue;
            //             }
            //         }
            //     }
            // });
        }
    }
    

    setOtherLoc = (name, state, zipCode, selected) => {
        var otherLoc = this.state.otherLoc;
        var selNum = false;            
        
        for(var i = 0; i < otherLoc.length; i++){
            if(otherLoc[i].zipCode === zipCode){
                selNum = i;
            }
        }

        if(otherLoc[selNum].selected)
            otherLoc.splice(selNum, 1);
        else {
            otherLoc[selNum].selected = true;
            this.setState({nearVal: ''});
        }

        this.setState({otherLoc: [...otherLoc]});
    }

    setNearLoc = (name, state, zipCode, selected) => {
        if(!this.state.error.nearLoc){
            var nearLoc = this.state.nearLoc;
            var selNum = false;            
            
            for(var i = 0; i < nearLoc.length; i++){
                if(nearLoc[i].zipCode === zipCode){
                    selNum = i;
                }
            }

            if(selNum !== false) { // update the nearLoc array to change the items selected value
                nearLoc[selNum].selected = selected?false:true;
            } else {
                nearLoc.push({
                    name: name,
                    state: state,
                    zipCode: zipCode,
                    selected: true
                });
            }
            this.setState({nearLoc: [...nearLoc]});
            
            var error = this.state.error;
            error.nearLoc = false;
            this.setState({error: error});
        }
    }

    continueToNext = () => {
        if(this.state.curCity.selected){
            if(!this.state.error.nearLoc){

                var nearCity = [];
                var otherLoc = this.state.otherLoc;
                var nearLoc = this.state.nearLoc;
                for(var i = 0; i < otherLoc.length; i++){
                    if(otherLoc[i].selected)
                        nearCity.push(otherLoc[i])
                }
                for(i = 0; i < nearLoc.length; i++){
                    if(nearLoc[i].selected)
                        nearCity.push(nearLoc[i])
                }

                console.log(nearCity);

                var redo = this.props.redo;
                redo[1] = true;
                this.props.setPageVisited(redo);
                var locations = {
                    curCity: this.state.curCity,
                    nearCity: nearCity,

                    /**page State */
                    curVal: this.state.curVal,
                    nearVal: this.state.nearVal,
                    addLoc: this.state.addLoc,
                    otherLoc: this.state.otherLoc,
                    nearLoc: this.state.nearLoc
                }
                this.props.setLocations(locations);
                this.props.history.push('/staffSignUp_2');
            }
        } else {
            var error = this.state.error;
            error.curLoc = " Please select your current location." ;
            this.setState({error: error});
        }
    }

  render() {
    return (
        <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
            <div className="main_container" style={{padding: '30px 0px 90px'}}>
                <div className="ssu_container">
                    <SubHeader num="2" title="Location" redo={this.state.redo[1]} 
                        next="/staffSignUp_2" prev="/staffSignUp" 
                        history={this.props.history} img={img}/>
                    <div className="ssu1_body">
                        <div className="ssu_txt1">
                            What's your current location?
                        </div>
                        <div className="ssu1_input">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img alt="img"src={place} width="16px" height='20px' style={{marginTop: '-3px'}}/>
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Zip Code" type="text" value={this.state.curVal} name="curLoc" onChange={this.setCurZip}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>
                            <ErrorState show={this.state.error.curLoc?"block":"none"} name={this.state.error.curLoc} />
                        </div>
                        <div className="row ssu1_locs">
                            {
                                this.state.addLoc.map((item)=>{
                                    return <AddLocItem key={item.zipCode} selected={item.selected} name={item.name} setCurLoc={this.setCurLoc} state={item.state} zipCode={item.zipCode}/>
                                })
                            }
                        </div>
                        <div className="ssu1_txt2">Are you interested in working in other cities?</div>
                        <div className="ssu1_txt3">If yes, specify zip code.</div>                        
                        <div className="ssu1_input1">
                            <div className="ssu2_modal1_input ssu2_modal3_selectBox">
                                <div className="input_left_icon">
                                    <img alt="img"src={place} width="16px" height='20px' style={{marginTop: '-3px'}}/>
                                </div>
                                <input className="ssu2_modal3_select" placeholder="Zip Code" type="text" value={this.state.nearVal} name="nearLoc" onChange={this.setOtherZip}
                                    onKeyUp={(e)=>{if(e.key === 'Enter') this.continueToNext()}}/>
                            </div>                            
                            <ErrorState show={this.state.error.nearLoc?"block":"none"} name={this.state.error.nearLoc} />
                        </div>
                        <div className="row ssu1_locs">
                            {
                                this.state.otherLoc.map((item)=>{
                                    return <SuggestionItem key={item.zipCode} selected={item.selected} name={item.name} state={item.state} setNearLoc={this.setOtherLoc} zipCode={item.zipCode}/>
                                })
                            }
                        </div>
                        <div className="ssu1_txt4">Suggested locations nearby your current location </div>                        
                        <div className="row ssu1_nearLocs">
                            {
                                this.state.nearLoc.map((item)=>{
                                    return <SuggestionItem key={item.zipCode} selected={item.selected} name={item.name} state={item.state} setNearLoc={this.setNearLoc} zipCode={item.zipCode}/>
                                })
                            }
                        </div>  
                    </div>
                    <hr style={{margin: '70px 0px 0px'}}/>
                    <div className="ssu_bottom">
                        <div className="ssu_button" onClick={this.continueToNext}>CONTINUE</div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffSignUp_1);
