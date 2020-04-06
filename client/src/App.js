import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Dashboard from './dashboard';
import LoginPage from './loginPage';
import RegisterPage from './registerPage';


export default function App() {

  const [ userData, setUserData ] = useState(null);

  return (
    <div className="app">
      <Router>

        <Route path="/">
          <Redirect to="/login" />
        </Route>

        <Route path="/dashboard" exact={false}>
          {userData
            ? <Dashboard userData={userData} setUserData={setUserData} />
            : <Redirect to="/login" />
          }
        </Route>

        <Route path="/login" 
          render={() => <LoginPage setUserData={setUserData} />}
        />

        <Route path="/register" component={RegisterPage} />

      </Router>
    </div>
  );
}


