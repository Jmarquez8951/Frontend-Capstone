import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.scss';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Games from '../components/pages/Games/Games';
import MyGames from '../components/pages/MyGames/MyGames';
import GameSingleView from '../components/pages/GameSingleView/GameSingleView';
import MyGameSingleView from '../components/pages/MyGameSingleView/MyGameSingleView';
import Profile from '../components/pages/Profile/Profile';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className="container">
            <Switch>
              <PrivateRoute path='/home' component={Home} authed={authed} />
              <PrivateRoute path='/games' component={Games} authed={authed}/>
              <PrivateRoute path='/game/:dbGameId' component={GameSingleView} authed={authed}/>
              <PrivateRoute path='/my-games' component={MyGames} authed={authed}/>
              <PrivateRoute path='/my-game/:gameId/:dbGameId' component={MyGameSingleView} authed={authed}/>
              <PrivateRoute path='/profile' component={Profile} authed={authed}/>
              {/* <PrivateRoute path='/chats' component={ChatsPage} authed={authed}/>
              <PrivateRoute path='/chat/:discussionId' component={DiscussionPage} authed={authed}/> */}
              <PublicRoute path='/auth' component={Auth} authed={authed} />
              <Redirect from="*" to="/home"/>
            </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
