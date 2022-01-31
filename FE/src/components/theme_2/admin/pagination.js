import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { 

  }};

const mapDispatchToProps = dispatch => ({
});

class Pagination extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          button: [1,2,3,4,5],
          totalPage: 5,
          curPage: 1
        }
    }

    componentWillMount = () => {
      this.initState(this.props);
    }

    componentWillReceiveProps = (props) => {
      this.initState(props);
    }

    initState = (props) => {
      var temp = [];
      var start = 1;

      if(props.curPage > 3){
        start = props.curPage - 2;
      }

      if((props.totalPage - props.curPage) < 2)
        start = props.curPage - 4 + (props.totalPage - props.curPage);
      
      if(start < 1)
        start = 1;
        
      for (var i = 0 ; i < 5 ; i++){
        if(start <= props.totalPage)
          temp[i] = start;
        else
          temp[i] = false;
        start ++;
      }
      this.setState({
        button: [...temp],
        curPage: props.curPage,
        totalPage: props.totalPage 
      });
    }
    
    setPage = (num) => {
      this.props.setCurPage(num);
    }

    nextPage = () => {
      if(this.state.curPage < this.state.totalPage)
        this.props.setCurPage(++this.state.curPage);
    }

    prevPage = () => {
      if(this.state.curPage > 1)
        this.props.setCurPage(--this.state.curPage);
    }
   
   render() {
    return (
        <div className="row" style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <div className="page_container">
                <button className={this.state.curPage === 1 ? "page_arrow page_disable" : "page_arrow"} onClick={this.prevPage}>
                  <span>
                    <svg width="7" height="12" viewBox="0 1 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.50537 1.50537L1.00003 6.01071L5.50537 10.516" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="page_collapse">&nbsp;&nbsp;Previous</span> </button>
                <button className={this.state.curPage === this.state.button[0] ? "page_num page_selected" : "page_num"} onClick={()=>this.setPage(this.state.button[0])} style={{display: this.state.button[0] === false ? 'none' : 'block'}}> {this.state.button[0]} </button>
                <button className={this.state.curPage === this.state.button[1] ? "page_num page_selected" : "page_num"} onClick={()=>this.setPage(this.state.button[1])} style={{display: this.state.button[1] === false ? 'none' : 'block'}}> {this.state.button[1]} </button>
                <button className={this.state.curPage === this.state.button[2] ? "page_num page_selected" : "page_num"} onClick={()=>this.setPage(this.state.button[2])} style={{display: this.state.button[2] === false ? 'none' : 'block'}}> {this.state.button[2]} </button>
                <button className={this.state.curPage === this.state.button[3] ? "page_num page_selected" : "page_num"} onClick={()=>this.setPage(this.state.button[3])} style={{display: this.state.button[3] === false ? 'none' : 'block'}}> {this.state.button[3]} </button>
                <button className={this.state.curPage === this.state.button[4] ? "page_num page_selected" : "page_num"} onClick={()=>this.setPage(this.state.button[4])} style={{display: this.state.button[4] === false ? 'none' : 'block'}}> {this.state.button[4]} </button>
                <button className={this.state.curPage === this.state.totalPage ? "page_arrow page_next page_disable" : "page_arrow page_next"} onClick={this.nextPage}> 
                  <span className="page_collapse">Next&nbsp;&nbsp;</span>
                  <span>
                    <svg width="7" height="12" viewBox="0 1 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.960938 10.2776L5.46628 5.77225L0.960938 1.26691" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span> 
                </button>
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
