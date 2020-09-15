import React from 'react';
import './App.css';
import HeaderContainer from './Header/HeaderContainer.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import ProfileContainer from './Profile/ProfileContainer.jsx';
import DialogsContainer from './Dialogs/DialogsContainer.jsx';
import News from './News/News.jsx';
import Friends from './Friends/Friends.jsx';
import UsersContainer from './Users/UsersContainer.jsx';
import LoginContainer from "./Login/LoginContainer.jsx";
import {Route} from "react-router-dom";
import Preloader from "./utils/Preloader.jsx";
import {initialized} from "./Redux/actionCreators.js";
import {isAuthTC} from "./Redux/authReducer.js";
import {connect} from "react-redux"

class App extends React.Component {
  componentDidMount = () => {
    this.props.initializeApp()
  }

  render = () => {
    if(!this.props.initialized) {
      return <Preloader />
    }

    return <div className="wrapper">
      <HeaderContainer />
      <Sidebar />
      <div className="main__content">
        <Route path="/profile/:userId?" render={() => <ProfileContainer  />  }/>
        <Route path="/dialogs" render={() => <DialogsContainer />  }/>
        <Route path="/friends" render={() => <Friends/>  }/>
        <Route path="/news" render={() => <News/>  }/>
        <Route path="/users" render={() => <UsersContainer />  }/>
        <Route path="/login" render={() => <LoginContainer />  }/>
      </div>
    </div>
  }
  
}

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(isAuthTC());
  promise.then( () => {
    dispatch(initialized())
  })
}

const mapStateToProps = (state) => ({
  initialized : state.app.appInitialized
})

export default connect(mapStateToProps, { initializeApp })(App);
