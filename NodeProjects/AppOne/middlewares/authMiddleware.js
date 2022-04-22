exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("error", "Ops, você não tem permissão para acessar essa página!");
        res.redirect('/users/login');
        return;
    }

    next();
};

exports.changePassword = async (req, res) => {
    // 1. confirmar senhas iguais
    // 2. procurar usuario e trocar senha
    // 3. redirecionar pra home

    if (req.body.password != req.body['password-confirm']){
        req.flash('error', 'Senhas diferentes!');
        res.redirect('/profile');
        return;
    }

    req.user.setPassword(req.body.password, async () => {
        await req.user.save();

        req.flash('success', 'Senha alterada com sucesso!');
        res.redirect('/');
        
    });
};