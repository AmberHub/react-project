import React from 'react';
import './App.css';
import Header from './Header/Header.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import ProfileContainer from './Profile/ProfileContainer.jsx';
import DialogsContainer from './Dialogs/DialogsContainer.jsx';
import News from './News/News.jsx';
import Friends from './Friends/Friends.jsx';
import UsersContainer from './Users/UsersContainer.jsx';
import {Route} from "react-router-dom";

const App = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="main__content">
        <Route path="/profile" render={() => <ProfileContainer store={props.store} />  }/>
        <Route path="/dialogs" render={() => <DialogsContainer store={props.store} />  }/>
        <Route path="/friends" render={() => <Friends/>  }/>
        <Route path="/news" render={() => <News/>  }/>
        <Route path="/users" render={() => <UsersContainer store={props.store} />  }/>
      </div>
    </div>
  );
}

export default App;
