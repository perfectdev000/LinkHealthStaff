import React from 'react';
import search from '../../assets/images/part3_search.svg';
import arrow from '../../assets/images/part3_arrow.svg';
import './landing.css';

class Part3 extends React.Component {
  render() {
    return (
        <div className="landing_outer_container part3_back">
            <div className="outer_container">
                <div className="main_container">
                    <div className="part3_title">Find Professionals <br/> Your Way</div>
                    <div className="part3_txt">Work with the largest network of independent professionals and get things done from quick turnarounds to big transformations.</div>
                    <div className="part3_btnBox" onClick={()=>this.props.history.push('/hospSignUp_1')}>
                        <div className="part3_btn_imgBox"><img src={search} className="part3_btn_img" alt="search"/></div>
                        <div className="part3_btn_txt">Post Jobs or Browse and find the right<br/>professional for your Healthcare Institution</div>
                        {/* <div className="part3_btn_arrowBox"><img src={arrow} className="part3_btn_arrow" alt="arrow"/></div> */}
                    </div>
                </div>            
            </div>
        </div>
    );
  }
}

export default Part3;
