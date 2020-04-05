const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const crypto = require('crypto');
const adapter = new FileSync('db.json');
const db = low(adapter);

// helper function to filter down an object to specified properties
const subset = (obj) => ['company', 'email', 'phone', 'age', 'eyeColor', 'name', 'picture', 'guid', 'balance'].reduce((newObj, prop) => {
    obj.hasOwnProperty(prop) && (newObj[prop] = obj[prop]);
    return newObj;
  }, {});


module.exports = (app) => {

  // LOGIN
  app.post(`/api/user`, async (req, res) => {

    let reponse;

    // get params from post req
    const credentials = req.body;

    // find user by email
    let targetUser = db.get('users').value().filter((user) => user.email === credentials.email);

    console.log(targetUser)

    // salt incoming password and sha256 it
    const saltedInputPw = credentials.password.concat(targetUser[0].salt);
    const hash = crypto.createHash('sha256').update(saltedInputPw).digest('hex');

    // only return public properties
    const data = subset(targetUser[0]);

    console.log(hash)
    console.log(targetUser[0].password)
    console.log(data)

    // compare saved password to salted incoming password, if they match then create response object with user data
    if (hash === targetUser[0].password) {
      response = {
        error: false,
        data
      };
    } else {
      response = {
        error: true
      }
    }
    return res.status(201).send(response);
  });                    

  // REGISTER
  app.post(`/api/register`, async (req, res) => {

    const { email, password, name } = req.body;
    const userModel = {
      "isActive": true,
      "balance": "No Value",
      "picture": "https://soulcore.com/wp-content/uploads/2018/01/profile-placeholder-300x300@2x.png",
      "age": "No Value",
      "eyeColor": "No Value",
      "company": "No Value",
      "phone": "No Value",
      "address": "No Value"
    };
    const _id = shortid.generate();
    const guid = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // salt and hash incoming password
    const salt = shortid.generate();
    const saltedPw = password.concat(salt);
    const hash = crypto.createHash('sha256').update(saltedPw).digest('hex');

    // add to database
    db
      .get('users')
      .push(Object.assign(userModel, { 
        _id,
        email, 
        password: hash,
        name,
        guid,
        salt
      }))
      .write();

    // get user we just added
    const user = db.get('users')
      .find({ guid })
      .value();

    // only return public properties
    const data = subset(user);

    return res.status(201).send({
      error: false,
      data
    });
  })

  // UPDATE 
  app.put(`/api/user`, async (req, res) => {
    const updatedData = req.body;

    console.log('req body', updatedData)

    db.get('users')
        .find({ guid: updatedData.guid })
        .assign(updatedData)
        .write();

    const user = db.get('users')
      .find({ guid: updatedData.guid })
      .value();

    // only return public properties
    const data = subset(user);

    return res.status(202).send({
      error: false,
      data
    });
  });

}
