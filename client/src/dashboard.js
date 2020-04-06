import React, { useState } from "react";
import { BrowserRouter as Route, 
  useHistory, 
  Link, 
  Switch, 
  useRouteMatch } from 'react-router-dom';

import BalanceView from './balanceView';
import DefaultView from './defaultView';
import EditView from './editView';

import './dashboard.css';


// DASHBOARD PAGE - /dashboard
// this page includes nested routes:
// /dashboard/balance 
// /dashboard/default 
// /dashboard/edit

export default function Dashboard(props) {

  let match = useRouteMatch();
  const data = props.userData;
  const [ toggleMenu, setToggleMenu ] = useState(false);
  const handleMenuToggle = () => setToggleMenu(!toggleMenu);

  return (
    <div>

      <header>
        <div className="container">
          <button onClick={handleMenuToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" ><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
            </svg>

            {toggleMenu && <Menu setUserData={props.setUserData}/>}
            
          </button>
        </div>
      </header>

      <div className="container">

        <div className="profile-picture">
          <img src={data.picture} alt="profile"/>
        </div>

        <div className="dashboard__buttons">
          <Link className="btn" to="/dashboard/balance">Balance</Link>
          <Link className="btn" to="/dashboard/edit">Edit</Link>
        </div>

        <Switch>
          <Route exact path={`${match.path}`}>
            <DefaultView data={data} />
          </Route>

          <Route exact path={`${match.path}/balance`}>
            <BalanceView data={data} />
          </Route>

          <Route exact path={`${match.path}/edit`}>
            <EditView data={data} setUserData={props.setUserData} />
          </Route>
        </Switch>

      </div>
    </div>
  );
}


// dropdown menu in upper right corner
const Menu = (props) => {

  let history = useHistory();

  const clearData = () => {
    props.setUserData([]);
    history.push('/login')
  }

  return (
    <div className="dropdown">
      <Link className="dropdown__link"
        to="/dashboard/">Profile</Link>
      <div className="dropdown__link"
        onClick={clearData}>Logout</div>
    </div>
  )
}