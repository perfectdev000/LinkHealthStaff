import React from 'react';
import pic from '../../assets/images/part4_image.png';

class Part4 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
    }
  render() {
    return (
        <div className="landing_outer_container">
            <div className="outer_container">
                <div className="row main_container" style={{paddingBottom: 'min(90px, 7vw)'}}>
                    <div className="part4_title">Hire a Professional For Any Healthcare Skill</div>
                    <div className="part4_txt">Find and hire outstanding nurses with diversified specialities and expertise.<br className="part4_br"/> We provide the top reviewed professionals with ease.</div>
                    <div className="col-md-6 col-sm-12 part4_order1">
                        <div className={this.state.selected === 0 ? "part4_item part4_item_selected" : "part4_item"} onClick={()=>this.setState({selected: 0})} style={{borderTop: '1px solid rgba(0, 0, 0, 0.1)'}}>Full Time or Part Time Commitment</div>
                        <div className={this.state.selected === 1 ? "part4_item part4_item_selected" : "part4_item"} onClick={()=>this.setState({selected: 1})}>Flexibility of Contract length</div>
                        <div className={this.state.selected === 2 ? "part4_item part4_item_selected" : "part4_item"} onClick={()=>this.setState({selected: 2})}>Weekend Availability</div>
                        <button className="part4_btn" onClick={()=>this.props.history.push('/hospSignUp_1')}>GET STARTED</button>
                    </div>
                    <div className="col-md-6 col-sm-12 part4_order2">
                        <img src={pic} className="part4_image" alt="side pic"/>
                    </div>
                </div>            
            </div>
        </div>
    );
  }
}

export default Part4;
