import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import userService from './services/user.service';

// Login Page - /login
export default function LoginPage(props) {

  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handler to send email and password to server
  const submitCredentials = async () => {
    const credentials = {
      email: email,
      password: password
    }
    // if data is returned, update state and navigate to dashboard
    let res = await userService.get(credentials);
    props.setUserData(res.data);
    history.push('/dashboard');
  }

  return (
    <div className="container">
      <img src="https://i.imgur.com/jL4e0oJ.png" className="logo" alt="logo"/>

      <div>
        <input placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}></input>
        <input placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}></input>
        <button className="btn" type="submit" 
          onClick={submitCredentials}>Login</button>
      </div>

      <Link className="account-link" to="/register">Register for an Account</Link>

      <div>
        <p>Test Login</p>
        <p>Email: mickey@gmail.com</p>
        <p>Password: mickey001</p>
      </div>

    </div>
  );
}