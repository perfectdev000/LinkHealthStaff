import React from 'react';
import { connect } from 'react-redux';
import './subHeader.css';

const mapStateToProps = state => {
  return {

  }};

const mapDispatchToProps = dispatch => ({
  
});

class SubHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nextColor: '#E8E7E6'
        }
    }

    componentWillMount() {
        if(this.props.redo === true){
            this.setState({nextColor: "#009CDE"})
        }
    }

    navToNext = () => {
        if(this.props.redo === true)
            this.props.history.push(this.props.next);
    }

    navToPrev = () => {
        this.props.history.push(this.props.prev);
    }

  render() {
    return (
        <div className="ssu_subHeader_container">
            <div className="ssu_subHeader_back" onClick={this.navToPrev} style={{display: this.props.prev?'block':'none'}}>
                <svg width="24" height="20" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 10.927H6.23656L14.8599 2.30368L12.5562 0L0 12.5562L12.5562 25.1124L14.8599 22.8087L6.23656 14.1854H30V10.927Z" fill="#009CDE"/>
                </svg>
            </div>
            <div className="ssu_subHeader_next" onClick={this.navToNext} style={{display: (this.props.next && this.props.num !== '1')?'block':'none'}}>
                <svg width="24" height="20" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5527e-07 15.073L23.7634 15.073L15.1401 23.6963L17.4438 26L30 13.4438L17.4438 0.887585L15.1401 3.19127L23.7634 11.8146L1.24013e-06 11.8146L9.5527e-07 15.073Z" fill={this.state.nextColor}/>
                </svg>
            </div>            
            <div className="ssu_subHeader_center">
                <h4>
                    <span className="w3-badge w3-small w3-blue" style={{marginRight: '20px', padding: '5px 10px', textAlign: 'center'}}>
                        {this.props.num}
                    </span>
                    <b  className="ssu_subHeader_title">{this.props.title}</b>
                </h4>
                <img alt="img"src={this.props.img} className="ssu_subHeader_img"/>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);
