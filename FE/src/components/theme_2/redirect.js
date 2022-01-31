import React from 'react';
import { history } from '../../store';

class Redirect extends React.Component {
    componentDidMount = () => {
        history.push('/login');
    }
  render() {
    return (
        <h1> Redirect </h1>
    );
  }
}

export default Redirect;