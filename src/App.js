import React from 'react';
import './App.css';
import Header from './Header/Header.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import Profile from './Profile/Profile.jsx';
import Dialogs from './Dialogs/Dialogs.jsx';
import News from './News/News.jsx';
import Friends from './Friends/Friends.jsx';
import {Route} from "react-router-dom";

const App = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="main__content">
        <Route path="/profile" render={() => 
          <Profile PostsData={props.state.ProfileData.PostsData}
         textPostValue={props.state.ProfileData.textPostValue} 
         dispatch = {props.dispatch} />  }/>
        <Route path="/dialogs" render={() => 
          <Dialogs DialogData={props.state.DialogData} 
          textMessageValue={props.state.DialogData.textMessageValue}
          dispatch={props.dispatch}/>  }/>
        <Route path="/friends" render={() => <Friends/>  }/>
        <Route path="/news" render={() => <News/>  }/>
      </div>
    </div>
  );
}

export default App;
