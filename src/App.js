import React, { useEffect } from 'react';
import './App.css';
import HeaderContainer from './Header/HeaderContainer.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import ProfileContainer from './Profile/ProfileContainer.jsx';
import DialogsContainer from './Dialogs/DialogsContainer.jsx';
import News from './News/News.jsx';
import Friends from './Friends/Friends.jsx';
import UsersContainer from './Users/UsersContainer.jsx';
import LoginContainer from "./Login/LoginContainer.jsx";
import {Route, Switch, Redirect} from "react-router-dom";
import Preloader from "./utils/Preloader.jsx";
import {initialized} from "./Redux/actionCreators.js";
import {isAuthTC} from "./Redux/authReducer.js";
import {connect} from "react-redux"
import { initializeAppTC } from "./Redux/appReducer.js";

const App = (props) => {

  useEffect( () => {
    props.initializeAppTC()
  }, [])

    if(!props.initialized) {
      return <Preloader />
    }

    return <div className="wrapper">
      <HeaderContainer />
      <Sidebar />
      <div className="main__content">
        <Switch>
        <Route exact path="/" render={() => <Redirect to="/profile" />  }/>
        <Route path="/login" render={() => <LoginContainer />  }/>
        <Route path="/dialogs" render={() => <DialogsContainer />  }/>
        <Route path="/friends" render={() => <Friends/>  }/>
        <Route path="/news" render={() => <News/>  }/>
        <Route path="/users" render={() => <UsersContainer />  }/>
        <Route path="/profile/:userId?" render={() => <ProfileContainer  />  }/>
        </Switch>
      </div>
    </div>
  
}


const mapStateToProps = (state) => ({
  initialized : state.app.appInitialized
})

export default connect(mapStateToProps, { initializeAppTC })(App);
