import axios from 'axios';

const URL_base = 'https://localhost/ws_datos';

export function postLogin(path, elements) {
    return axios.post(URL_base + path, elements,{
      headers: {
      'content-type': 'application/json'
    }}).then(response => {        
      console.log(response);
      return response.data;
      //return response.data?response.data:null;
    }).catch(error => console.log(error.response));
  }

