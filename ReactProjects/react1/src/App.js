import React from 'react';
import './App.css'

/*
OUTRAS OPÇÕES
class App extends React.Component{

  render(){
    return <h1>TESTANDOOOOOO</h1>
  }

}

let App = () => {
  return <h1>Por variavel com função anonima</h1>
}
*/
//função
function formatarNome(usuario){
  return usuario.nome + ' ' + usuario.sobrenome;
}

//componente
function BemVindo(props){
  return <h1>Olá, {props.nome}</h1>
}

function Avatar(props){
  return <div sytle={ {backgroundColor: '#ff0000'} } className="avatar">
          <img src={props.user.url} alt={props.user.name}/>
          <br/>
          <span>{props.user.name}</span>
        </div>
}

function App() {
  let usuario = {
    nome: 'Uttoni',
    sobrenome: 'Brandani'
  };

  let imagem = 'https://www.google.com.br/google.jpg';

  let user = {
    url: "https://www.google.com.br/google.jpg",
    name: "Ele mesmoooo"
  }

  return <>
    <div>Meu nome é: {formatarNome(usuario)}</div>
    <BemVindo nome="Altair"/>
    <BemVindo nome="Andre" />
    <BemVindo nome="Breno" />
    <BemVindo nome="Uttoni" />
    <img src={imagem}/>

    <Avatar user={user}/>

  </>
}

export default App;