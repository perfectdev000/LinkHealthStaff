import React from 'react';
import { connect } from 'react-redux';
import logo from "../../assets/images/loginLogo.png";
import './logIn.css';
import { SET_CUR_POS } from '../../../constants/actionTypes';


const mapStateToProps = state => {
  return {
  }};

const mapDispatchToProps = dispatch => ({
  setCurPos: (data) => dispatch({type: SET_CUR_POS, data})
});

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        navTo: false,
        hospitalSelected: false,
        staffSelected: false
    }
  }

  componentWillMount = () => {    
    this.props.setCurPos('signUp');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  selectHospital = () => {
    this.setState({
        hospitalSelected: true,
        staffSelected: false,
        navTo: '/staffSignUp'
    });
  }

  selectStaff = () => {
    this.setState({
        hospitalSelected: false,
        staffSelected: true, 
        navTo: '/hospSignUp_1'
    });
  }
  
  navTo = () => {
      if(this.state.navTo){
        this.props.history.push(this.state.navTo);
      }
  }

  render() {
    return (
      <div className="outer_container" style={{backgroundColor: '#009CDE'}}>
        <div className="main_container" style={{padding: '40px 0px 120px', maxWidth:720}}>
          <div className="ssu_container" style={{paddingBottom: '60px'}}>
            <p style={{textAlign: 'center', marginTop: 70}}><img alt="img" src={logo} className="logInLogo"/></p>
            <div className="logIn_txt1"> Sign up </div>
            <div className="logIn_txt2"> What are you looking for on LinkHealthStaff? </div>
            <div className="logIn_body">
                <div className="row signUp_item_container">
                    <div className={this.state.hospitalSelected ? "signUp_item signUp_item_selected" : "signUp_item"} onClick={this.selectHospital}>
                        <div className="signUp_item_img">
                            <svg width="36" height="42" viewBox="0 0 62 70" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.1429 33.6786V28.3214C18.1429 27.4339 18.8625 26.7143 19.75 26.7143H25.1071C25.9947 26.7143 26.7143 27.4339 26.7143 28.3214V33.6786C26.7143 34.5661 25.9947 35.2857 25.1071 35.2857H19.75C18.8625 35.2857 18.1429 34.5661 18.1429 33.6786ZM36.8929 35.2857H42.25C43.1375 35.2857 43.8571 34.5661 43.8571 33.6786V28.3214C43.8571 27.4339 43.1375 26.7143 42.25 26.7143H36.8929C36.0053 26.7143 35.2857 27.4339 35.2857 28.3214V33.6786C35.2857 34.5661 36.0053 35.2857 36.8929 35.2857ZM26.7143 46.5357V41.1786C26.7143 40.291 25.9947 39.5714 25.1071 39.5714H19.75C18.8625 39.5714 18.1429 40.291 18.1429 41.1786V46.5357C18.1429 47.4233 18.8625 48.1429 19.75 48.1429H25.1071C25.9947 48.1429 26.7143 47.4233 26.7143 46.5357ZM36.8929 48.1429H42.25C43.1375 48.1429 43.8571 47.4233 43.8571 46.5357V41.1786C43.8571 40.291 43.1375 39.5714 42.25 39.5714H36.8929C36.0053 39.5714 35.2857 40.291 35.2857 41.1786V46.5357C35.2857 47.4233 36.0053 48.1429 36.8929 48.1429ZM61 64.75V69.5714H1V64.75C1 63.8625 1.7196 63.1429 2.60714 63.1429H5.21875V12.3886C5.21875 10.8328 6.65781 9.57143 8.43304 9.57143H20.2857V4.21429C20.2857 2.43906 21.7248 1 23.5 1H38.5C40.2752 1 41.7143 2.43906 41.7143 4.21429V9.57143H53.567C55.3422 9.57143 56.7812 10.8328 56.7812 12.3886V63.1429H59.3929C60.2804 63.1429 61 63.8625 61 64.75ZM11.6473 63.0089H26.7143V54.0357C26.7143 53.1482 27.4339 52.4286 28.3214 52.4286H33.6786C34.5661 52.4286 35.2857 53.1482 35.2857 54.0357V63.0089H50.3527V16H41.7143V19.2143C41.7143 20.9895 40.2752 22.4286 38.5 22.4286H23.5C21.7248 22.4286 20.2857 20.9895 20.2857 19.2143V16H11.6473V63.0089ZM36.625 9.57143H33.1429V6.08929C33.1429 5.87617 33.0582 5.67177 32.9075 5.52108C32.7568 5.37038 32.5524 5.28571 32.3393 5.28571H29.6607C29.4476 5.28571 29.2432 5.37038 29.0925 5.52108C28.9418 5.67177 28.8571 5.87617 28.8571 6.08929V9.57143H25.375C25.1619 9.57143 24.9575 9.65609 24.8068 9.80679C24.6561 9.95749 24.5714 10.1619 24.5714 10.375V13.0536C24.5714 13.2667 24.6561 13.4711 24.8068 13.6218C24.9575 13.7725 25.1619 13.8571 25.375 13.8571H28.8571V17.3393C28.8571 17.5524 28.9418 17.7568 29.0925 17.9075C29.2432 18.0582 29.4476 18.1429 29.6607 18.1429H32.3393C32.5524 18.1429 32.7568 18.0582 32.9075 17.9075C33.0582 17.7568 33.1429 17.5524 33.1429 17.3393V13.8571H36.625C36.8381 13.8571 37.0425 13.7725 37.1932 13.6218C37.3439 13.4711 37.4286 13.2667 37.4286 13.0536V10.375C37.4286 10.1619 37.3439 9.95749 37.1932 9.80679C37.0425 9.65609 36.8381 9.57143 36.625 9.57143Z" stroke="white" strokeWidth="0.8"/>
                            </svg>
                        </div>
                        <div className="signUp_item_txt">I am looking for a Job <br/>in Healthcare Institution</div>
                    </div>
                    <div className={this.state.staffSelected ? "signUp_item signUp_item_selected" : "signUp_item"} onClick={this.selectStaff}>
                        <div className="signUp_item_img">
                            <svg width="36" height="45" viewBox="0 0 62 74" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.468 1L13 3.439L10 20.314V31H10.282C10.6975 33.8997 11.7123 36.6811 13.2618 39.1671C14.8113 41.653 16.8616 43.789 19.282 45.439C8.581 50.029 1 60.649 1 73H7C6.99515 69.3993 7.80175 65.8438 9.35988 62.5977C10.918 59.3516 13.1876 56.4984 16 54.25V56.218L16.843 57.157L28.843 69.157L31 71.218L33.157 69.157L45.157 57.157L46 56.218V54.25C48.8124 56.4984 51.082 59.3516 52.6401 62.5977C54.1982 65.8438 55.0049 69.3993 55 73H61C61 60.649 53.419 50.032 42.718 45.436C45.1381 43.7863 47.1881 41.6508 48.7376 39.1654C50.2871 36.68 51.3021 33.8992 51.718 31H52V20.311L49 3.439L48.532 1H13.468ZM18.532 7H43.468L46 21.343V25H16V21.343L18.532 7ZM28 10V13H25V19H28V22H34V19H37V13H34V10H28ZM16.282 31H45.718C45.0253 34.3909 43.1815 37.438 40.4992 39.6249C37.8168 41.8119 34.4609 43.0043 31 43C27.5391 43.0043 24.1832 41.8119 21.5008 39.6249C18.8185 37.438 16.9747 34.3909 16.282 31ZM31 49C34.0803 48.9839 37.1352 49.5572 40 50.689V53.689L31 62.689L22 53.689V50.689C24.8648 49.5572 27.9197 48.9839 31 49Z" stroke="white" stroke-width="0.8"/>
                            </svg>
                        </div>
                        <div className="signUp_item_txt">I am looking for Staff for<br/>my Healthcare Institution </div>                        
                    </div>
                </div>
                <div className={!this.state.navTo ? "logIn_button logIn_button_disabled" : "logIn_button"} onClick={this.navTo}>CONTINUE</div>
            </div>          
        </div>            
        </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
