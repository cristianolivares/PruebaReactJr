import React, { useState, useEffect, Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

const NameTable = () => {    

    const [value,setValue]=useState('');
    const [nombre, setNombre] = useState('');
    const [capital, setCapital] = useState('Selecciona');
    const [idioma, setIdioma] = useState('un pais');
    const [region, setRegion] = useState('en el ');
    const [moneda, setMoneda] = useState('listado');

    const handleSelect=(e)=>{
  
      console.log(e);  
      setValue(e);
      getCharacters();
      async function getCharacters() {
        const response = await fetch(
          "https://restcountries.eu/rest/v2/name/" + e );
        const body = await response.json();
        const numberColumns = body.length;
        let capital = body[0].capital;
        setCapital(capital);
        let idioma = body[0].languages[0].name;
        setIdioma(idioma);
        let region = body[0].region;
        setRegion(region);
        let moneda = body[0].currencies[0].name;
        setMoneda(moneda);
        console.log(body, numberColumns);  
       }  
    }
  
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Paises </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">Paises</li>
            </ol>
          </nav>
        </div>
        <div>
          <Dropdown onSelect={handleSelect} >                       
                    <Dropdown.Toggle variant="btn btn-primary" id="dropdownMenuButton1">
                      Selecciona un pais
                    </Dropdown.Toggle>
                    <Dropdown.Menu  onSelect={handleSelect}>   
                      <Dropdown.Item eventKey= "Argentina">Argentina</Dropdown.Item>
                      <Dropdown.Item eventKey= "Colombia">Colombia</Dropdown.Item>
                      <Dropdown.Item eventKey= "Chile">Chile</Dropdown.Item>
                      <Dropdown.Item eventKey= "United States of America">Estados Unidos</Dropdown.Item>
                      <Dropdown.Item eventKey= "Perú">Perú</Dropdown.Item>    
                      <Dropdown.Divider></Dropdown.Divider>   
                      <Dropdown.Item eventKey= "Spain">España</Dropdown.Item>
                      <Dropdown.Item eventKey= "France">Francia</Dropdown.Item>
                      <Dropdown.Item eventKey= "Italy">Italia</Dropdown.Item>
                      <Dropdown.Item eventKey= "United Kingdom">Reino Unido</Dropdown.Item>
                      <Dropdown.Item eventKey= "Russian">Rusia</Dropdown.Item>    
                      <Dropdown.Divider></Dropdown.Divider>  
                      <Dropdown.Item eventKey= "China">China</Dropdown.Item>
                      <Dropdown.Item eventKey= "Korea (Democratic">Corea del Norte</Dropdown.Item>
                      <Dropdown.Item eventKey= "Korea (Republic">Corea del Sur</Dropdown.Item>   
                      <Dropdown.Item eventKey= "Japan">Japan</Dropdown.Item>
                      <Dropdown.Item eventKey= "Thailand">Tailandia</Dropdown.Item>                                          
                    </Dropdown.Menu>
                  </Dropdown>
          </div>
        <div className="row">
         
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Pais: {nombre}</h4>            
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Capital</th>
                        <th>Idioma</th>
                        <th>Región</th>
                        <th>Moneda</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{capital}</td>
                        <td>{idioma}</td>
                        <td>{region}</td>
                        <td><label className="badge badge-primary">{moneda}</label></td>              
                     </tr>                
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    )
  }


export default NameTable
