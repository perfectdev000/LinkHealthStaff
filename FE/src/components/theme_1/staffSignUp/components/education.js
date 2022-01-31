import React from 'react';
import { connect } from 'react-redux';
import edit from '../../../assets/images/edit.svg'
import del from '../../../assets/images/delete.svg'
import './nursingState.css';
import { SET_DEGREE } from '../../../../constants/actionTypes';
import Confirm from '../../../modals/confirm';
import $ from 'jquery';

const mapStateToProps = state => {
    return {
        degree: state.staffSignUp.degree
    }
};

const mapDispatchToProps = dispatch => ({
  setDegree: (data) => dispatch({type: SET_DEGREE, data})
});

class Education extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            degree: '',
            degreeName: '',
            collage: '',
            date: false,
            showConfirm: 'none',
            confirmTitle: '',
            agreeFn: false
        }
    }

    componentWillMount = () => {
        this.setState({ 
            degree: this.props.degree.degree,
            degreeName: this.props.degree.degreeName,
            collage: this.props.degree.collage
        });
        var date = this.props.degree.receivedOn; 
        if(date){       
            var dd = date.getDay();
            var mm = date.getMonth() + 1;
            var yy = date.getFullYear();
            dd = dd < 10 ? '0'+ dd : dd;
            mm = mm < 10 ? '0'+ mm : mm;
            date = mm + '/' + dd + '/' + yy;
            this.setState({date: date});
        }
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({ 
            degree: newProps.degree.degree,
            degreeName: newProps.degree.degreeName,
            collage: newProps.degree.collage
        });
        var date = newProps.degree.receivedOn; 
        if(date){       
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yy = date.getFullYear();
            dd = dd < 10 ? '0'+ dd : dd;
            mm = mm < 10 ? '0'+ mm : mm;
            date = mm + '/' + dd + '/' + yy;
            this.setState({date: date});
        }
    }
    
    confirmDelete = () => {
        this.setState({
            showConfirm: 'block', 
            confirmTitle: this.state.degreeName,
            agreeFn: this.deleteDegree
        });     
    }

    deleteDegree = () => {
        var degree = {
            degree: '',
            collage: '',
            date: false
        };
        this.props.setDegree(degree);
        this.setState({showConfirm: 'none'});
    }

  render() {
    return (
        <div className="row" style={{maxWidth: 800, margin: '54px auto auto', overflowX: 'auto', display: this.state.degree === ''?'none':'block'}}>
            <table style={{minWidth: '800px', marginBottom: '20px'}}>
                <thead>
                    <tr className="nurseHead">
                        <th className="nurseTh" style={{paddingLeft: '50px'}}> Degree</th>
                        <th className="nurseTh"> College/University </th>
                        <th className="nurseTh"> Date Received </th>
                        <th className="nurseTh" style={{width: '130px'}}> Action </th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{height: 28}}/>
                    <tr className="nurseRow" style={{height: '48px'}}>
                        <td className="nurseTd" style={{paddingLeft: '50px'}}> {this.state.degreeName} </td>
                        <td className="nurseTd"> {this.state.collage} </td>
                        <td className="nurseTd"> {this.state.date} </td>
                        <td> 
                            <span style={{marginRight: '30px'}} onClick={()=>$("#modal3").show()}>
                                <img width="18px" height="15px" alt="img"src={edit}/>
                            </span>
                            <span><img width="18px" height="15px" alt="img"src={del} onClick={this.confirmDelete} /></span> 
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

export default connect(mapStateToProps, mapDispatchToProps)(Education);
