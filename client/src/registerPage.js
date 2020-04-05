import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import userService from './services/user.service';


export default function RegisterPage() {

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  // handler to send new user info to server
  const submitNewUser = async () => {

    const newUser = {
      name: {
        first: first,
        last: last
      },
      email: email,
      password: password
    }

    let res = await userService.add(newUser);
    if (res) {
      history.push('/login');
    }
  }

  return (
    <div className="container">
      <img src="https://i.imgur.com/jL4e0oJ.png" className="logo" alt="logo" />

      <div className="">
        <input placeholder="First Name"
          onChange={(event) => setFirst(event.target.value)}></input>
        <input placeholder="Last Name"
          onChange={(event) => setLast(event.target.value)}></input>
        <input placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}></input>
        <input placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}></input>
        <button className="btn" type="submit"
          onClick={submitNewUser}>Register</button>
      </div>

      <Link className="account-link" to="/login">Have an Account? Log In</Link>

    </div>
  );
}