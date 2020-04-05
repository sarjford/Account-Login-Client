import React from "react";


const DefaultView = (props) => {
  let data = props.data;
  console.log('default', data)
  return (
    <ul>
      <li className="tile">
        <h3>First Name</h3>
        <p>{data.name.first}</p>
      </li>
      <li className="tile">
        <h3>Last Name</h3>
        <p>{data.name.last}</p>
      </li>
      <li className="tile">
        <h3>Company</h3>
        <p>{data.company}</p>
      </li>
      <li className="tile">
        <h3>Email</h3>
        <p>{data.email}</p>
      </li>
      <li className="tile">
        <h3>Phone Number</h3>
        <p>{data.phone}</p>
      </li>
      <li className="tile">
        <h3>Age</h3>
        <p>{data.age}</p>
      </li>
      <li className="tile">
        <h3>Address</h3>
        <p>{data.age}</p>
      </li>
      <li className="tile">
        <h3>Eye Color</h3>
        <p>{data.eyeColor}</p>
      </li>
    </ul>
  );
}

export default DefaultView;