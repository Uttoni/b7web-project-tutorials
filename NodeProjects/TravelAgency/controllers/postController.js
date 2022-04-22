const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const slug = require('slug');

exports.add = (req, res) =>{
    res.render('postAdd');
};

exports.addAction = async (req, res) =>{
    req.body.tags = req.body.tags.split(',').map((tag)=>{ 
        return tag.trim()
    });
    //req.body.tags = req.body.tags.split(',').map(tag=>tag.trim());
    const post = new Post(req.body);
    post.tags = ["tag1","tag2"];
    
    try{
        await post.save();
    }catch(error){
        req.flash('error', 'Erro: '+error.message);
        return res.redirect('/post/add');
    }

    req.flash('success', 'Post salvo com sucesso!');
    res.redirect('/');
};

exports.edit = async (req, res) => {
    //PEGAR O POST ACIMA
    const post = await Post.findOne({ slug: req.params.slug });
    //CARREGAR O FORMULARIO
    res.render('postEdit', { post });
};

exports.editAction = async (req, res) => {

    //req.body.slug = require('slug')(req.body.title);
    req.body.slug = slug(req.body.title);
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    try{
        const post = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
    }catch(error){
        req.flash('error', 'Não conseguimos atualizar :/ Tenta de novo');
        res.redirect('/post/'+req.params.slug+'/edit');
        return;
    }

    req.flash('success', "Post alterado com sucesso!");
    res.redirect('/');
}

exports.view = async (req, res) =>{
    const post = await Post.findOne({ slug: req.params.slug });
    res.render('view', { post });
};