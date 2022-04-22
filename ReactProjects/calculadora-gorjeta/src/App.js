import React, { useState } from 'react';
import styled from 'styled-components';

const EntradaDiv = styled.div`
  background: white;
  width: 500px;
  border: 0.5px dashed black;
  align-items: center;
  padding-left: 200px;
  padding-bottom: 30px;
`;

const Entrada = styled.input`
  width: 60%;
  height: 30px;
  justify-content:center;
  align-items:center;
  border: 1px solid black;
  background: #ccc;
  border-radius: 10px;
`;

const Resultados = styled(EntradaDiv)`
  margin-top: 10px;
`;

function App() {

  const [total, setTotal] = useState(0);
  const handleTotal = (e) =>{
    if(e.target.value === ""){
      setTotal(0);
    }else{
      setTotal(parseFloat(e.target.value));
    }
    
  };

  const [gorjeta, setGorjeta] = useState(0);
  const handleGorjeta = (e) => {
    if (e.target.value === "") {
      setGorjeta(0);
    } else {
      setGorjeta(parseFloat(e.target.value));
    }
  };

  return (<>
    <EntradaDiv>
      <h1>Calculadora de Gorjeta</h1>
      <br/>

      <p>Total da Compra:</p>
      <Entrada type="number" onChange={handleTotal}/>

      <p>Percentual da Gorjeta:</p>
      <Entrada type="number" onChange={handleGorjeta}/>
    </EntradaDiv>

    <Resultados>
      <h4>Sub-total: R${total}</h4>
      <h4>Percentual: {gorjeta}%</h4>
      <h3>Total: R${total*((gorjeta/100)+1)}</h3>
    </Resultados>
  </>);
}

export default App;