import React, { useState } from "react";
import { BrowserRouter as Route, useHistory, Link, Switch, useRouteMatch } from 'react-router-dom';
import userService from './services/user.service';


import BalanceView from './balanceView';
import DefaultView from './defaultView';


import './dashboard.css';



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

        <img src={data.picture} className="profile-picture" alt="profile"/>

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
            <EditView data={data} setUserData={props.setUserData} />} />
          </Route>
        </Switch>

      </div>
    </div>
  );
}

const Menu = (props) => {

  let history = useHistory();

  const clearData = () => {
    props.setUserData([]);
    history.push('/login')
  }

  return (
    <div className="dropdown">
      <Link to="/dashboard/">Profile</Link>
      <a onClick={clearData}>Logout</a>
    </div>
  )
}


// const BalanceView = (props) => {
//   console.log('balance', props)

//   return (
//     <div className="balance tile">
//       <h3>Your Balance</h3>
//       <p>{props.data.balance}</p>
//     </div>
//   );
// }


// const DefaultView = (props) => {

//   console.log('inside default')
//   let data = props.data;
//   console.log('default', data)
//   return (
//     <ul>
//       <li className="tile">
//         <h3>First Name</h3>
//         <p>{data.name.first}</p>
//       </li>
//       <li className="tile">
//         <h3>Last Name</h3>
//         <p>{data.name.last}</p>
//       </li>
//       <li className="tile">
//         <h3>Company</h3>
//         <p>{data.company}</p>
//       </li>
//       <li className="tile">
//         <h3>Email</h3>
//         <p>{data.email}</p>
//       </li>
//       <li className="tile">
//         <h3>Phone Number</h3>
//         <p>{data.phone}</p>
//       </li>
//       <li className="tile">
//         <h3>Age</h3>
//         <p>{data.age}</p>
//       </li>
//       <li className="tile">
//         <h3>Address</h3>
//         <p>{data.age}</p>
//       </li>
//       <li className="tile">
//         <h3>Eye Color</h3>
//         <p>{data.eyeColor}</p>
//       </li>
//     </ul>
//   );
// }


const EditView = (props) => {

  const subset = (obj, propList) => propList
  .reduce((newObj, prop) => {
    obj.hasOwnProperty(prop) && (newObj[prop] = obj[prop]);
    return newObj;
  }, {});

  const data = subset(props.data, ['company', 'email', 'phone', 'age', 'eyeColor', 'picture']);

  return (
    <ul className="edit-properties">
      {Object.keys(data).map((item, i) => 
        <EditItem
          name={item}
          currentValue={data[item]}
          key={i} 
          guid={props.data.guid} 
          setUserData={props.setUserData}
        />
      )}
    </ul>
  );
}


const EditItem = (props) => {
  
  const [value, setValue] = useState('');

  const submitUpdate = async () => {
    let update = {guid: props.guid};
    update[props.name] = value;
    console.log(update)
    let res = await userService.edit(update);
    props.setUserData(res.data);
  }

  return (
    <li className="tile edit-property">
      <h3>Edit {props.name}</h3>
      <span>Current {props.name}</span>
      <input placeholder={props.currentValue} disabled></input>
      <span>New {props.name}</span>
      <input onChange={(event) => setValue(event.target.value)}></input>
      <button type="submit" onClick={submitUpdate}className="btn">Save</button>
    </li>
  )
}