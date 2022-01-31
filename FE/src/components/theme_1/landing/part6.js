import React from 'react';
import check from '../../assets/images/part6_check.svg';

class Part6 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
    }
    render() {
        return (
            <div className="landing_outer_container part6_back">
                <div className="outer_container">
                    <div className="row main_container" style={{paddingBottom: 'min(150px, 10vw)'}}>
                        <div className='part6_container'>
                            <div className="part6_title">Find a Great Job</div>
                            <div className="part6_txt">Meet clients you’re excited to work with and take your career to new heights.</div>
                            <hr/>
                            <div className="row">
                                <div className={this.state.selected === 0 ? "part6_item part4_item_selected" : "part6_item"} onClick={()=>this.setState({selected: 0})}><span><img src={check} className="part6_check" alt="check"/></span>Find opportunities for every stage of your career</div>
                                <div className={this.state.selected === 1 ? "part6_item part4_item_selected" : "part6_item"} onClick={()=>this.setState({selected: 1})}><span><img src={check} className="part6_check" alt="check"/></span>Control when, where, and how you work</div>
                                <div className={this.state.selected === 2 ? "part6_item part4_item_selected" : "part6_item"} onClick={()=>this.setState({selected: 2})}><span><img src={check} className="part6_check" alt="check"/></span>Explore different ways to earn</div>
                            </div>
                            <hr/>
                            <button className="part6_btn" onClick={()=>this.props.history.push('/staffSignUp')}>GET STARTED</button>
                        </div>
                    </div>            
                </div>
            </div>
        );
    }
}

export default Part6;
