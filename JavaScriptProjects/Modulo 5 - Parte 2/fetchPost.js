async function inserirPost(){
    document.getElementById('posts').innerHTML = "Carregando...";

    let req = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify({
            title: 'Titulo',
            body: 'Corpo',
            userId: 4
        }),
        header: {
            'Content-Type': 'application/json'
        }
    });
    let json = await req.json();
    console.log(json);
}