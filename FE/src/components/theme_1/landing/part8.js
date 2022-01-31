import React from 'react';
import email from '../../assets/images/part8_email.svg';
import ErrorState from '../staffSignUp/components/errorState';


class Part8 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            error: 'none'
        }
    }
    setEmail = (e) => {
        this.setState({email: e.target.value});
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValid = reg.test(String(e.target.value).toLowerCase());
        if(e.target.value !== '' && isValid){
            this.setState({error: 'none'});
        } else if (e.target.value === '') {
            this.setState({error: 'none'});
        }else {
            this.setState({error: 'block'});
        }
    }
    subscribe = () => {
        if(this.state.email === '')
            this.setState({error: 'block'});
        else
            alert(this.state.email + ' is subscribed to Our Mailing List.');
    }
    render() {
        return (
            <div className="landing_outer_container">
                <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
                    <div className="row main_container part8_container">
                        <div className="part8_title">Subscribe to Our Mailing List</div>
                        <div className="part8_text">Get the latest Job tips and medical news from <br className="part8_br"/> LinkHealthStaff delivered right to your email <br/> Send us your email address to sign up</div>
                        <div className="part7_input_group part8_input_group" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                            <div className="part7_input_phone"><img src={email} width="100%" alt="icon"/></div>
                            <input className="part7_input" placeholder="Email Address" value={this.state.email} onChange={this.setEmail}/>
                            <button className="part7_btn" onClick={this.subscribe}>SUBSCRIBE</button>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <ErrorState show={this.state.error} name="Valid email address is required." />
                        </div>
                        {/* <p style={{color: 'white', textAlign: 'center', display: this.state.error, marginTop: '20px'}}>Error: Valid email address is required.</p> */}
                    </div>            
                </div>
            </div>
        );
    }
}

export default Part8;
