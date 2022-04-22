function mostrar(){
    let imagem = document.getElementById("imagem").files[0];

    //criando component img
    let img = document.createElement("img");
    img.src = URL.createObjectURL(imagem);
    img.width = 200;

    document.getElementById("area").appendChild(img);
}

function mostrar2(){
    let reader = new FileReader();
    let imagem = document.getElementById("imagem2").files[0];

    reader.onloadend = function(){
        let img = document.createElement('img');
        img.src = reader.result;
        img.width = 300;

        document.getElementById('area2').appendChild(img);
    }

    reader.readAsDataURL(imagem);
}