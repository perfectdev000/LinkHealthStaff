import React from 'react';
import { connect } from 'react-redux';
import edit from '../../../assets/images/edit.svg'
import del from '../../../assets/images/delete.svg'
import { SET_CERT, SET_SELECTED_CERT } from '../../../../constants/actionTypes';
import Confirm from '../../../modals/confirm';
import $ from 'jquery';

const mapStateToProps = state => {
    return {
        cert: state.staffSignUp.cert
    }
};

const mapDispatchToProps = dispatch => ({
    setCert: (data) => dispatch({type: SET_CERT, data}),
    setSelectedCert: (data) => dispatch({type: SET_SELECTED_CERT, data})
});

class Certification extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cert: [],
            selectedNum: '',
            showConfirm: 'none',
            confirmTitle: ''
        }
    }

    componentWillMount = () => {
        this.setState({cert: this.props.cert});
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({cert: newProps.cert});
    }

    editCert = (num) => {
        this.props.setSelectedCert(num);
        $('#modal4').show();
    }

    confirmDeleteCert = (num) => {
        this.setState({
            selectedNum: num, 
            showConfirm: 'block', 
            confirmTitle: this.props.cert[num].certName});        
    }

    deleteCert = () => {
        var num = this.state.selectedNum;
        this.setState({selectedNum: ''});
        var cert = this.state.cert;
        cert.splice(num, 1);
        for(var i = 0; i < cert.length; i++){
            cert[i].num = i;
        }
        this.props.setCert(cert);
        this.hideConfirm();
    }

    hideConfirm = () => {
        this.setState({showConfirm: 'none'});
    }

  render() {
    return (
        <div className="row" style={{maxWidth: 800, margin: '32px auto auto', overflowX: 'auto', display: this.state.cert.length?"block":'none'}}>
            <table style={{minWidth: '800px', marginBottom: '12px'}}>
                <thead>
                    <tr className="nurseHead">
                        <th className="nurseTh" style={{paddingLeft: '50px'}}> Certification</th>
                        <th className="nurseTh"> Certifying Authority </th>
                        <th className="nurseTh"> Date Received </th>
                        <th className="nurseTh"> Expiration Date </th>
                        <th className="nurseTh" style={{width: '130px'}}> Action </th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{height: 18}}/>
                    {
                        this.state.cert.map((item) => {
                            var date = item.expirationDate;
                            var dd = date.getDate();
                            var mm = date.getMonth() + 1;
                            var yy = date.getFullYear();
                            dd = dd < 10 ? '0'+ dd : dd;
                            mm = mm < 10 ? '0'+ mm : mm;
                            var expDate = mm + '/' + dd + '/' + yy;

                            date = item.receivedOn;
                            dd = date.getDate();
                            mm = date.getMonth() + 1;
                            yy = date.getFullYear();
                            dd = dd < 10 ? '0'+ dd : dd;
                            mm = mm < 10 ? '0'+ mm : mm;
                            var recDate = mm + '/' + dd + '/' + yy;

                            return  <tr key={item.num} className="nurseRow" style={{height: '48px'}}>
                                        <td className="nurseTd" style={{paddingLeft: '50px'}}> {item.certName} </td>
                                        <td className="nurseTd">{item.auth} </td>
                                        <td className="nurseTd"> {recDate} </td>
                                        <td className="nurseTd"> {expDate} </td>
                                        <td> 
                                            <span style={{marginRight: '30px'}} onClick={() => this.editCert(item.num)}>
                                                <img width="18px" height="15px" alt="img"src={edit}/>
                                            </span>
                                            <span><img width="18px" height="15px" alt="img"src={del} onClick={() => this.confirmDeleteCert(item.num)}/></span> 
                                        </td>
                                    </tr>
                        })
                    }                    
                </tbody>
            </table>
            <Confirm display={this.state.showConfirm} title={'Delete "' + this.state.confirmTitle + '"'}
             content={'Are you sure you want to delete "' + this.state.confirmTitle + '"'} agreeFn={this.deleteCert}
             disagreeFn={this.hideConfirm}/>
        </div>                     
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Certification);
