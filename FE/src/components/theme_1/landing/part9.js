import React from 'react';
import logo from '../../assets/images/part9_logo.png';
import facebook from '../../assets/images/part9_facebook.svg';
import linkedIn from '../../assets/images/part9_insta.svg';
import twitter from '../../assets/images/part9_twiter.svg';
import insta from '../../assets/images/part9_o.svg';

class Part9 extends React.Component {
  render() {
    return (
        <div className="landing_outer_container">
            <div className="outer_container" style={{backgroundColor: '#F3F3F4'}}>
                <div className="row main_container">
                    <div className="col-12 part9_logoBox"><img src={logo} className="part9_logo" alt="logo" onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}/></div>
                    <div className="col-md-3 col-6">
                        <div className="part9_subtitle">Company</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/aboutUs')}>About</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Careers</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>{'Contact & Support'}</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Locations</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Press</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Blog</div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="part9_subtitle">Professionals</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>How It Works</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Professional Jobs</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Free Professional CEUs</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Salaries</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Career Resources</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Wellness Resources</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Professional Discounts</div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="part9_subtitle">Jobs</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>How It Works</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Sign Up</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Pricing</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Reviews</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Professional Staffing</div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="part9_subtitle">Skills</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Cath Lab Nurse</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Correctional Nurse</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Emergency Room Nurse</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Genetic Nurse</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Home Health Nurse</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>ICU / Critical Care Nurse</div>
                        <div className="part9_item" onClick={()=>this.props.history.push('/#')}>Medical-Surgical Nurse</div>
                    </div>
                    <hr className="part9_hr"/>
                    <div className="col-12 part9_iconBox">
                        <a href="https://facebook.com/" target="_blank"  rel="noopener noreferrer"><img src={facebook} alt="facebook" className="part9_social"/></a>
                        <a href="https://twitter.com/" target="_blank"  rel="noopener noreferrer"><img src={twitter} alt="twitter" className="part9_social"/></a>
                        <a href="https://lnkedIn.com/" target="_blank"  rel="noopener noreferrer"><img src={linkedIn} alt="linkedIn" className="part9_social"/></a>
                        <a href="https://instagram.com/" target="_blank"  rel="noopener noreferrer"><img src={insta} alt="insta" className="part9_social" style={{marginRight: 0}}/></a>
                    </div>
                    <div className="col-12 part9_bottom">
                        © 2021 Link<b>HealthStaff</b>
                        <br className="part9_br"/>
                        <span className="part9_bottom_div">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        Terms {'&'} Conditions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Privacy Policy
                    </div>
                </div>            
            </div>
        </div>
    );
  }
}

export default Part9;