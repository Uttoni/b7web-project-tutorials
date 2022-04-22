import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const InputText = styled.input`
    border: 2px solid black;
    border-radius: 5px;
    padding: 15px;
    font-size: 17px;
    width: 300px;
`;

function SearchBox(props){

    const [texto, setTexto] = useState("");
    function handleTexto(e){
        setTexto(e.target.value);
    }

    useEffect(() => {
        if(props.onChangeTexto)
            props.onChangeTexto(texto);
    }, [texto]);

    return(<>
        <InputText 
            type="text"
            value={texto}
            onChange={handleTexto}
            placeholder={props.frasePadrao ?? "Digite alguma coisa"}
        />
    </>);
}

export default SearchBox;