import React from 'react';
import './landing.css';

class Part1 extends React.Component {
  render() {
    return (
        <div className="landing_outer_container part1_back">
            <div className="outer_container">
                <div className="main_container">
                    <div className="part1_title">On-Demand Healthcare <br/> Staffing Platform </div>
                    <div className="part1_txt">Platform that facilitates hiring of healthcare professionals to satisfy medical facilities on-demand staffing needs.</div>
                    <div className="part1_btnBox">
                        <button className="part1_btn" onClick={()=>this.props.history.push('/hospSignUp_1')}> FIND A PROFESSIONAL </button>
                        <button className="part1_btn right_btn" onClick={()=>this.props.history.push('/staffSignUp')}> FIND A JOB </button>
                    </div>
                </div>            
            </div>
        </div>
    );
  }
}

export default Part1;
