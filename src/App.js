import React, { useEffect } from 'react';
import './App.css';
import HeaderContainer from './Header/HeaderContainer.tsx';
import SidebarContainer from './Sidebar/SidebarContainer.tsx';
import ProfileContainer from './Profile/ProfileContainer.tsx';
import DialogsContainer from './Dialogs/DialogsContainer.tsx';
import News from './News/News.tsx';
import UsersContainer from './Users/UsersContainer.tsx';
import LoginContainer from "./Login/LoginContainer.tsx";
import MessagesContainer from "./Dialogs/Messages/MessagesContainer.tsx";
import {Route, Switch, Redirect} from "react-router-dom";
import Preloader from "./utils/Preloader.tsx";
import {connect} from "react-redux"
import { initializeAppTC } from "./Redux/appReducer.ts";
import FriendsContainer from "./Friends/FriendsContainer";

const App = (props) => {

  useEffect( () => {
    props.initializeAppTC()
  }, [])

    if(!props.initialized) {
      return <Preloader />
    }

    return <div className="wrapper">
      <HeaderContainer />
      <SidebarContainer />
      <div className="main__content">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />  }/>
          <Route path="/login" render={() => <LoginContainer />  }/>
          <Route exact path="/dialogs" render={() => <DialogsContainer />  }/>
          <Route exact path="/dialogs/:userId?/messages" render={() => <MessagesContainer />  }/>
          <Route path="/friends" render={() => <FriendsContainer/>  }/>
          <Route path="/news" render={() => <News/>  }/>
          <Route path="/users" render={() => <UsersContainer />  }/>
          <Route path="/profile/:userId?" render={() => <ProfileContainer  />  }/>
          <Route path="*" render={() => <div>404 Page not found</div>  }/>
        </Switch>
      </div>
    </div>
  
}


const mapStateToProps = (state) => ({
  initialized : state.app.appInitialized
})

export default connect(mapStateToProps, { initializeAppTC })(App);
