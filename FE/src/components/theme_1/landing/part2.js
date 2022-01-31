import React from 'react';
import logo from '../../assets/images/mini-logo.svg';

class Part2 extends React.Component {
  render() {
    return (
        <div className="landing_outer_container">
            <div className="outer_container">
                <div className="row main_container">
                    <img src={logo} alt="logo.png" className="part2_logo"/>
                    <div className="part2_Box">
                        <div className="part2_title">We are a Professional <br/> Healthcare Provider</div>
                        <div className="part2_txt">Platform that provides on-demand healthcare staffing solution, creating staffing flexibility, fostering an environment where permanent and interim staff work as a team to overcome healthcare staffing obstacles and drive optimal healthcare results.</div>
                        {/* <button className="part2_btn" onClick={()=>alert("Page isn't ready yet.")}> LEARN MORE </button> */}
                    </div>
                </div>            
            </div>
        </div>
    );
  }
}

export default Part2;
