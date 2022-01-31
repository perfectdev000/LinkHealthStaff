import React from 'react';
import { connect } from 'react-redux';
import Part1 from './part1';
import Part2 from './part2';
import Part3 from './part3';
import Part4 from './part4';
import Part5 from './part5';
import Part6 from './part6';
import Part7 from './part7';
import Part8 from './part8';
import Part9 from './part9';
import './landing.css';
import { SET_CUR_POS } from '../../../constants/actionTypes';

const mapStateToProps = state => {
  return {

  }};

const mapDispatchToProps = dispatch => ({
  setCurPos: (data) => dispatch({type: SET_CUR_POS, data})  
});

class Landing extends React.Component {
  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {
    this.props.setCurPos('');
  }

  render() {
    return (
        <div>
            <Part1 history={this.props.history}/>
            <Part2 history={this.props.history}/>
            <Part3 history={this.props.history}/>
            <Part4 history={this.props.history}/>
            <Part5 history={this.props.history}/>
            <Part6 history={this.props.history}/>
            <Part7 history={this.props.history}/>
            <Part8 history={this.props.history}/>
            <Part9 history={this.props.history}/>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
