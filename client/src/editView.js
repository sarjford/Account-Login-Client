import React, { useState } from "react";

import userService from './services/user.service';

// EDIT PAGE - /dashboard/edit
const EditView = (props) => {

  // only render some properties
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

// edit a single item
const EditItem = (props) => {
  
  // update state with value of edited property
  const [value, setValue] = useState('');

  // handler to send update to api
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

export default EditView;