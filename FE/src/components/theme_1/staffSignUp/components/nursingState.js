import React from 'react';
import { connect } from 'react-redux';
import leftarrow from '../../../assets/images/leftarrow.svg'
import downarrow from '../../../assets/images/downarrow.svg'
import edit from '../../../assets/images/edit.svg'
import del from '../../../assets/images/delete.svg'
import { SET_LICENCE, SET_SELECTED_LICENCE, SET_SELECTED_STATES } from '../../../../constants/actionTypes';
import './nursingState.css';
import Confirm from '../../../modals/confirm';
import $ from "jquery";

const mapStateToProps = state => {
    return {
        nurseLicence: state.staffSignUp.nurseLicence,
        selectedStates: state.staffSignUp.selectedStates
    }
};

const mapDispatchToProps = dispatch => ({
    setLicence: (data) => dispatch({ type: SET_LICENCE, data}),
    setSelectedLicence: (data) => dispatch({type: SET_SELECTED_LICENCE, data}),
    setSelectedStates: (data) => dispatch({type: SET_SELECTED_STATES, data})
});

class NursingState extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            downarrow: 'inline',
            leftarrow: 'none',
            licences: [],
            state: '',
            selectedNum: '',
            showConfirm: 'none',
            confirmTitle: '',
            agreeFn: false
        }
    }

    componentWillMount = () => {
        this.setState({licences: [...this.props.item.licences]});
        this.props.setCurState(this.props.item.state);

        this.setState({state: this.props.item.state})
    }

    componentWillReceiveProps = (newProps) => { console.log(newProps);
        this.setState({licences: [...newProps.nurseLicence[this.state.state].licences]});
    }

    confirmDeleteState = () => {
        this.setState({
            showConfirm: 'block', 
            confirmTitle: this.props.item.state,
            agreeFn: this.deleteState
        });     
    }

    deleteState = () => {
        var nurseLicence = this.props.nurseLicence;
        delete nurseLicence[this.state.state];
        this.props.setLicence(nurseLicence);
        
        var num = this.props.key;
        var states = this.props.selectedStates;
        var no = states.indexOf(num);
        states.splice(no, 1);
        this.props.setSelectedStates(states);
        this.setState({showConfirm: 'none'});
    }

    toggleAccordion = () => {
        if(this.state.downarrow === 'none')
            this.setState({downarrow: 'inline', leftarrow: 'none'});
        else 
            this.setState({downarrow: 'none', leftarrow: 'inline'});
    }

    confirmDeleteLicence = (num, name) => {
        this.setState({
            selectedNum: num,
            showConfirm: 'block', 
            confirmTitle: name,
            agreeFn: this.deleteOneRow
        });     
    }

    deleteOneRow = () => {
        var num = this.state.selectedNum;
        var nurseLicence = this.props.nurseLicence;
        var licences = nurseLicence[this.state.state].licences;
        licences.splice(num, 1);
        nurseLicence[this.state.state].licences = [...licences];
        this.props.setLicence(nurseLicence);
        this.setState({showConfirm: 'none'});
    }

    editOneRow = (num) => {
        this.props.setSelectedLicence({num: num, state: this.state.state});
        $('#modal1').show();
    }

  render() {    
    return (
        <div style={{maxWidth: '800px', margin: '50px auto auto'}}>
            <div className="col-12 nur_accBtn" onClick={this.toggleAccordion}>
                <span>
                    <img alt="img"src={leftarrow} style={{display: this.state.leftarrow, marginRight: '34px'}} />
                    <img alt="img"src={downarrow} style={{display: this.state.downarrow, marginRight: '22px'}}/>
                </span> 
                {this.props.item.state}
                <span className="nur_state_del" title="remove state" onClick={this.confirmDeleteState}><img alt="img"src={del} width="15px" heigth="18px"/></span>
            </div>
            <div className="col-12 nur_accBody" style={{display: this.state.downarrow}}>
                <div className="nur_text1">
                    <div style={{display: this.state.licences.length?"none":"block"}}>Please provide your nursing license details</div>
                    <div className="row" style={{overflowX: 'auto', marginTop: '54px', display: this.state.licences.length?"block":"none"}}>
                        <table style={{minWidth: '800px', marginBottom: '20px', textAlign: 'left'}}>
                            <thead>
                                <tr className="nurseHead">
                                    <th className="nurseTh" style={{paddingLeft: '50px'}}> Image </th>
                                    <th className="nurseTh"> Name </th>
                                    <th className="nurseTh"> Number </th>
                                    <th className="nurseTh"> Expiration Date</th>
                                    <th className="nurseTh" style={{width: '130px'}}> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr style={{height: 28}}/>
                            { this.state.licences.map( (row) => {
                                    var dd = row.expDate.getDate();
                                    var mm = row.expDate.getMonth() + 1;
                                    var yy = row.expDate.getFullYear();
                                    dd = dd < 10 ? '0'+ dd : dd;
                                    mm = mm < 10 ? '0'+ mm : mm;
                                    var expDate = mm + '/' + dd + '/' + yy;
                                    
                                    return <tr className="nurseRow" key={row.num}>
                                                <td style={{paddingLeft: '50px'}}> <img alt="img" width="80" height="48" src={row.imgUrl}/> </td>
                                                <td className="nurseTd"> { row.name } </td>
                                                <td className="nurseTd"> { row.number } </td>
                                                <td className="nurseTd"> { expDate} </td>
                                                <td> 
                                                    <span style={{marginRight: '20px'}} onClick={()=>this.editOneRow(row.num)}><img width="18px" height="15px" alt="img"src={edit}/></span>
                                                    <span onClick={()=>this.confirmDeleteLicence(row.num, row.name)}><img width="18px" height="15px" alt="img"src={del}/></span> 
                                                </td>
                                            </tr>
                                })
                            }   
                            </tbody>                         
                        </table>
                    </div>
                    <div className="ssu2_addItem" onClick={()=>{$('#modal1').show(); this.props.setCurState(this.props.item.state);}}
                     style={{display: this.state.licences.length?"none":"block"}}>
                        + Add License 
                    </div>                    
                    <hr style={{margin: '40px 0px 0px'}}/>
                </div>
            </div>
            <Confirm display={this.state.showConfirm} title={'Delete "' + this.state.confirmTitle + '"'}
             content={'Are you sure you want to delete "' + this.state.confirmTitle + '"'} agreeFn={this.state.agreeFn}
             disagreeFn={()=>this.setState({showConfirm: 'none'})}/>
        </div>                        
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NursingState);
