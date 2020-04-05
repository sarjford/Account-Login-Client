import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


import Dashboard from './dashboard';
import LoginPage from './loginPage';
import RegisterPage from './registerPage';

import userService from './services/user.service';




export default function App() {
  // const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [ userData, setUserData ] = useState(null);

  useEffect(() => {
    // getUser();
    // setUserData(JSON.parse(`{"error":false,"targetUser":[{"_id":"5410953eb0e0c0ae25608277","guid":"eab0324c-75ef-49a1-9c49-be2d68f50b96","isActive":true,"balance":"$3,585.69","picture":"https://media-exp1.licdn.com/dms/image/C5603AQE6tZis_Dxb-Q/profile-displayphoto-shrink_200_200/0?e=1591228800&v=beta&t=MEJ84NoDBF5AG3QPMX9vevozjKFA7n5gPZXpWNGeVz0","age":30,"eyeColor":"blue","name":{"first":"Henderson","last":"Briggs"},"company":"GEEKNET","email":"test","salt":"23derd*334","password":"test","phone":"+1 (936) 451-3590","address":"121 National Drive, Cotopaxi, Michigan, 8240"}]}`))
  }, []);

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



        {/* <Route path="/" 
          render={() => <Dashboard userData={userData} />}
        /> */}

        <Route path="/login" 
          render={() => <LoginPage setUserData={setUserData} />}
        />

        <Route path="/register" component={RegisterPage} />


      </Router>
    </div>
  );
}

// function App() {
//   const [ users, setUsers ] = useState(null);

//   useEffect(() => {
//     if (!users) {
//       getUsers();
//     }
//   })

//   const getUsers = async () => {
//     let res = await userService.getAll();
//     setUsers(res);
//   }

//   const renderUser = user => {
//     return (
//       <li key={user._id} className="list__item user">
//         <h3 className="user__name">{user.name}</h3>
//         <h3 className="user__lastName">{user.lastName}</h3>
//       </li>
//     );
//   };

//   return (
//     <div className="App">
//       <ul className="list">
//         {(users && users.length > 0) ? (
//           users.map(user => renderUser(user))
//         ) : (
//           <p>No users found</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;


