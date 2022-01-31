import React from 'react';
import { connect } from 'react-redux';
import edit from '../../../assets/images/edit.svg'
import del from '../../../assets/images/delete.svg'
import { SET_INSURANCE } from '../../../../constants/actionTypes';
import './nursingState.css';
import Confirm from '../../../modals/confirm';
import $ from 'jquery';

const mapStateToProps = state => {
    return {
        insurance: state.staffSignUp.insurance
    }
};

const mapDispatchToProps = dispatch => ({
  setInsurance: (data) => dispatch({type: SET_INSURANCE, data})
});

class Insurance extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            insurance: false,
            showConfirm: 'none',
            confirmTitle: '',
            agreeFn: false
        }
    }

componentWillMount = () => {
    this.setState({insurance: this.props.insurance});
}

componentWillReceiveProps = (newProps) => {
    this.setState({insurance: newProps.insurance});
}

confirmDelete = () => {
    this.setState({
        showConfirm: 'block', 
        confirmTitle: this.state.insurance.provider,
        agreeFn: this.deleteInsurance
    });     
}

deleteInsurance = () => {
    this.props.setInsurance({provider: '', number: ''});
    this.setState({showConfirm: 'none'});
}

editInsurance = () => {
    $("#modal2").show();
}

  render() {
    return (
        <div className="row" style={{maxWidth: 800, margin: '54px auto auto', overflowX: 'auto', display: this.state.insurance.provider?"block":"none"}}>
            <table style={{minWidth: '800px', marginBottom: '12px'}}>
                <thead>
                    <tr className="nurseHead">
                        <th className="nurseTh" style={{paddingLeft: '50px'}}> Insurance provider </th>
                        <th className="nurseTh"> Policy number </th>
                        <th className="nurseTh" style={{width: '130px'}}> Action </th>
                    </tr>
                </thead>
                <tbody>
                <tr style={{height: 28}}/>
                    <tr className="nurseRow" style={{height: '48px'}}>
                        <td className="nurseTd" style={{paddingLeft: '50px'}}> {this.state.insurance.provider} </td>
                        <td className="nurseTd"> {this.state.insurance.number} </td>
                        <td> 
                            <span style={{marginRight: '20px'}} onClick={this.editInsurance}><img width="18px" height="15px" alt="img"src={edit}/></span>
                            <span><img width="18px" height="15px"  alt="img"src={del} onClick={this.confirmDelete}/></span> 
                        </td>
                    </tr>
                </tbody>
            </table>
            <Confirm display={this.state.showConfirm} title={'Delete "' + this.state.confirmTitle + '"'}
             content={'Are you sure you want to delete "' + this.state.confirmTitle + '"'} agreeFn={this.state.agreeFn}
             disagreeFn={()=>this.setState({showConfirm: 'none'})}/>
        </div>                     
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
