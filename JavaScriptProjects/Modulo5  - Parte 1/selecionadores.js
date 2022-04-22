let teste1 = document.querySelector('li');
console.log(teste1);

let teste2 = document.querySelectorAll('li');
console.log(teste2);

let nums = [1, 2, 3, 4, 5];
nums.push(4);
console.log(nums);


//CALLBACK - é um formato assincrono, porq só roda a função alertar depois de 2 segundos
function alertar(){
    console.log("Opa tudo bom?")
}

let name = "Uttoni";
setTimeout(alertar, 2000);
let surname = "Brandani";
console.log("Nome completo: ", name, surname);


//CRIANDO UMA PROMISE
function pegarTemperatura(){
    return new Promise(function (resolve, reject){
        console.log("Pegando temperatura...");
    
        setTimeout(function(){
            resolve("40 ºC na sombra!")
        }, 2000);
    });
};

//USANDO UMA PROMISE
let temp = pegarTemperatura();
console.log(temp);
temp.then((result) => {
    console.log("Temperatura: ", result);
});
temp.catch((error)=>{
    console.log("Deu ruim...");
});


//FETCH
async function loadPosts(){
    document.getElementById("posts").innerHTML = "Carregando...";

    //com async await
    /*
    let req = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await req.json();
    montarBlog(json);
    */

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((result) => {
        return result.json();
    })
    .then((json) => {
        montarBlog(json);
    })
    .catch((error) => {
        console.log("Requisição não rolou...")
    });
}

function montarBlog(lista){
    let html = '';

    for(let i in lista){
        html += '<h3>'+ lista[i].title +'</h3>';
        html += lista[i].body + '<br/>';
        html += '<hr/>';
        console.log(lista[i].title);
        console.log(lista[i].body);
    }

    document.getElementById("posts").innerHTML = html;
}