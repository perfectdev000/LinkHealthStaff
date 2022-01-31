import React from 'react';
import search from '../../assets/images/part3_search.svg';
import doc from '../../assets/images/part5_doc.svg';
import hand from '../../assets/images/part5_hand.svg';
import './landing.css';

class Part5 extends React.Component {
  render() {
    return (
        <div className="landing_outer_container part5_back">
            <div className="outer_container">
                <div className="main_container">
                    <div className="part5_title">Find Job As Per Your Need</div>
                    <div className="part5_txt">More than helping you find your dream job... <br/>We help you manage your career.</div>
                    <div className="part5_btnBox" onClick={()=>this.props.history.push('/staffSignUp')}>
                        <div className="part5_btn_imgBox"><img src={doc} className="part5_btn_img" alt="doc"/></div>
                        <div className="part5_btn_txt">Find job in top rated hospitals near you</div>
                    </div>
                    <div className="part5_btnBox part5_2btnBox" onClick={()=>this.props.history.push('/staffSignUp')}>
                        <div className="part5_btn_imgBox"><img src={search} className="part5_btn_img" alt="search"/></div>
                        <div className="part5_btn_txt">Full Time and Part Time shifts</div>
                    </div>
                    <div className="part5_btnBox part5_2btnBox" onClick={()=>this.props.history.push('/staffSignUp')}>
                        <div className="part5_btn_imgBox"><img src={hand} className="part5_hand_img" alt="hand"/></div>
                        <div className="part5_btn_txt">Permanent or Temporary position</div>
                    </div>
                </div>            
            </div>
        </div>
    );
  }
}

export default Part5;
