import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { postLogin } from '../utils/api';
import axios from 'axios';
import https from 'https';
import { AppRoutes } from '../AppRoutes';
import Dashboard from '../dashboard/Dashboard';


const Login = (props) => {

  const [open, setOpen] = React.useState(false);

  const [message, setMessage] = React.useState("");

  const [login, setLogin] = React.useState(true);

  const [values, setValues] = useState({
    user: '',
    license: '',
    password: '',
    validateNewPass: '',
    showPassword: false,
  });
  //Funcion para detectar cambios/eventos y setear al instante
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let usuarioAux = { "usuario": values.user, "licencia": values.license, "clave": values.password };
    await postLogin('/us_login/login.php', usuarioAux).then(data => {
      console.log(data);
      if (data.message === "Bienvenido") {           
        alert("Login exitoso");   
        sessionStorage.setItem("login", values.user);   
       } else {
        alert(data);
      }
    });
  }
  const handlePrueba = async (e) => {
    e.preventDefault();
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
    let response = await axios.get("https://localhost/ws_datos/us_login/all.php", { httpsAgent: agent });
    if (response.status == 200) {
      console.log(response);
      alert(response.data);
      return await response.data;
    }
  }

  const ProtectedComponent = () => {
    if (sessionStorage.getItem("login")){
        return <Redirect to='/dashboard'  />
    }else{
        return null
    }
}

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logoATXEL.png")} alt="logo" />
              </div>
              <h4>Bienvenido</h4>
              <h6 className="font-weight-light">Llena los campos para continuar</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control type="text" onChange={handleChange('user')} placeholder="Usuario" size="lg" className="h-auto" />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="number" onChange={handleChange('license')} placeholder="Licencia" size="lg" className="h-auto" />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" onChange={handleChange('password')} placeholder="Contraseña" size="lg" className="h-auto"/>
                  
                </Form.Group>
                <div className="mt-3">
                  <button onClick={handleLogin} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">INGRESAR</button>                 
                </div>
              </Form>
              <ProtectedComponent></ProtectedComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login
