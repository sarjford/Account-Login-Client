import axios from 'axios';

export default {

  get: async (credentials) => {
    let res = await axios.post(`/api/user/`, credentials);
    return res.data || [];   
  },

  edit: async (updated) => {
    let res = await axios.put(`/api/user/`, updated)
    return res.data || {};
  },
  
  add: async (newUser) => {
    let res = await axios.post(`/api/register/`, newUser)
    return res.data || {};
  }

}