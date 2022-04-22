const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddlware = (req, res, next) => {

    let info = {
        name: "Bonieky",
        id: 123
    }

    req.userInfo = info;

    next();

};


exports.index = async (req, res) => {

    //let nome = req.query.nome;
    //let sobrenome = req.query.sobrenome;

    /*let responseJson = {
        nomeCompleto: nome + ' ' + sobrenome,
        mostrar: true,
        ingredientes: [
            { nome: 'Arroz', qtd: '200g' },
            { nome: 'Macarrão', qtd: '320g' }
        ],
        interesses: ['node', 'js', 'python'],
        codeHTML: '<strong>EM NEGRITO!</strong>',
        userName: req.userInfo.name
    };*/
    //res.json(obj);

    //ou manda um json ou um send
    //res.send("Oie " + nome);

    let responseJson = {
        pageTitle: 'HOME',
        posts: [],
        tags: [],
        tag: ''
    };

    responseJson.tag = req.query.t;
    const postFilter = (typeof responseJson.tag != 'undefined' ? { tags: responseJson.tag } : {});

    const tags = await Post.getTagsList();
    for (let i in tags) {
        if (tags[i]._id == responseJson.tag) {
            tags[i].class = "selected";
        }
    }
    responseJson.tags = tags;
    console.log(tags);

    const posts = await Post.find(postFilter);
    responseJson.posts = posts;

    res.render('home', responseJson);

};