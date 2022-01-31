import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import Theme_2 from './components/theme_2';
import Theme_1 from './components/theme_1';

const AuthenticatedRoute = (props) =>{
  const token = localStorage.getItem('token');
  if(token){
      return <Route {...props} component={props.component}/>
  }
  return <Redirect to={{ pathname: '/login'}} />  
}

const UnAuthenticatedRoute = (props) =>{
  const token = localStorage.getItem('token');
  if(!token){  
      return <Route {...props} component={props.component}/>
  }
  const type = localStorage.getItem('type');
  return <Redirect to={{ pathname: '/main/' + type}}/>
}

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <AuthenticatedRoute path="/main" component={Theme_2} />
        <UnAuthenticatedRoute path="/" component={Theme_1} />
      </Switch>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));