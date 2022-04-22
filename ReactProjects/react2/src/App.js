import React, { useState } from 'react';
import styled from 'styled-components';

const Site = styled.div`
  width: 400px;
  height: 400px;
  background-color: #00ff00;
`;

const Title = styled.h1`
  color: #ff0000;
  font-size: 18px;  
`;

// chamo a função props e retorno props.color, se não tiver color usa o verder
const Botao = styled.button`
  font-size: 19px;
  padding: 10px 15px;
  background-color: ${props => props.color || '#00ff00'};
  color: 
    ${props => {
      if(props.ativo === false){
        return '#f0f0f0'
      }
      else{
        return'#ff00ff'
      }
    }
  }; 
`;

const BotaoPequeno = styled(Botao)`
  padding: 0;
  margin: 50px;
`;

const Input = styled.input`
  width:400px;
  height: 50px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid black;
`;

function App() {

  const [contagem, setContagem] = useState(0); 

  const botaoAction = () =>{
    setContagem(contagem+1);
  }

  const [texto, setTexto] = useState("Bonnie");

  const handleInput = (entrada) =>{
    setTexto(entrada.target.value);
  };

  const [email, setEmail] = useState("");

  const handleEmail = (e) =>{
    setEmail(e.target.value)
  };

  const [senha, setSenha] = useState("");

  const handleSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleButton = () => {
    alert(email + ' - ' + senha);
  };

  const [logado, setLogado] = useState(true);

  return <>
    <Site>
      <Title>Título bem legal</Title>
      <Botao color="#ff0000">Clique em mim</Botao>
      <Botao color="#0000ff">Clique em mim também</Botao>
      <Botao>Clique aqui</Botao>
      <Botao ativo={true}>Clique aqui</Botao>
      <Botao ativo={false}>Clique aqui</Botao>
      <BotaoPequeno>Clique no menor</BotaoPequeno>
    </Site>

    <div>
      <div>{contagem} vezes</div>
      <button onClick={botaoAction}>Clique para aumentar</button>
    </div>

    <div>
      <h1>TESTANDO O INPUT</h1>
      <Input type="text" value={texto} onChange={handleInput}/>
      
      {texto.length > 0 && <p>O texto tem {texto.length} caractere{texto.length != 1 ? 's': ''}</p>}

    </div>

    <div>
      <h1>LOGIN-----------------------------------</h1>
      <Input placeholder="Digite seu email" type="email" value={email} onChange={handleEmail}/>
      <Input placeholder="Digite a senha" type="password" value={senha} onChange={handleSenha}/>
      <button onClick={handleButton}>Dizer</button>

      {
        logado 
        ? <button>Sair</button> 
        : <button>Entrar</button>
      }

    </div>
  </>
}

export default App;