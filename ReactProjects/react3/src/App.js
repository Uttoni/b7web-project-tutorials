import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import SearchBox from './components/SearchBox';

function App() {

  const [contagem, setContagem] = useState(0);

  function handleContagem(){
    setContagem(contagem+1);
  }

  //COM O ARRAY VAZIO SERVE COMO UM CONSTRUTOR PARA A PAGINA RODANDO UMA UNICA VEZ QUANDO CRIA
  useEffect(() => {
    document.title = "Array vazio";
  }, []);

  useEffect(() => {
    if (contagem !== 0) {
      document.title = "Contagem: " + contagem;
    }
  }, [contagem]);


  const [searchTexto, setSearchTexto] = useState("");
  function handleSearchInput(novoTexto){
    setSearchTexto(novoTexto);
  };

  const [list, setList] = useState([]);
  useEffect(()=>{
    setList([
      {id:123, title:'Comprar o bolo', done:false},
      {id:124, title:'Pegar cachorro no PetShop', done:true},
      {id:125, title:'Gravar aula', done:false}
    ])
  }, [])

  return (
    <>
      <p>Contagem: {contagem}</p>
      <button onClick={handleContagem}>Add</button>

      <h1>Lista de Tarefas</h1>
      <SearchBox 
        frasePadrao="Faça sua busca..." 
        onChangeTexto={handleSearchInput}        
      />
      <SearchBox frasePadrao={searchTexto}/>
      <p>Texto procurado: {searchTexto}</p>

      <hr/>

      <SearchBox />

      <hr/>

      <ul>
        {list.map((item, index)=>(
          <li key={index}>
            {item.done && 
              <del>{item.title} - {item.done.toString()}</del>
            }
            {!item.done &&
              item.title + " - " + item.done.toString()
            }
          </li>  
        ))}
      </ul>
    </>
  );
}

export default App;