const User = require('../models/User');
const crypto = require('crypto');

exports.login = (req, res) =>{
    res.render('login');
};

exports.loginAction = (req, res) =>{
    const auth = User.authenticate();
    
    auth(req.body.email, req.body.password, (error, result) => {
        if(!result){
            req.flash('error', "Seu email e/ou senha estão errados");
            res.redirect("/users/login");
        }
        
        req.login(result, ()=>{});
        req.flash("success", 'Logado com sucesso');
        res.redirect('/');
    });
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.register = (req, res) =>{
    res.render('register');
};

exports.registerAction = (req, res) =>{
    const newUser = new User(req.body);
    User.register(newUser, req.body.password, (error)=>{
        if(error){
            req.flash('error', 'Ocorreu um erro, tente mais tarde.');
            res.redirect('/user/register');
            return;
        }

        req.flash('success', 'Registro realizado com sucesso!');
        res.redirect('/users/login');
    });
};

exports.profile = (req, res) => {
    //teste
    //res.json({teste:123});
    res.render('profile', {teste: 1});
};

exports.profileAction = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { name: req.body.name, email: req.body.email },
            { new: true, runValidators: true }
        );
        
        await user.save();
        //new pra retornar o novo e validators pra rodar a validação
    }catch(error){
        req.flash('error', 'Ocorreu algum erro' + error.message);
        res.redirect('/profile');
        return;
    }

    req.flash("success", 'Usuário alterado com sucesso!');
    res.redirect('/profile');
};

exports.forget = (req, res) =>{
    res.render('forget');
};

exports.forgetAction = async (req, res) => {
    // 1. verificar se o usuario realmente existe, se o email é valido
    const user = await User.findOne({email: req.body.email}).exec();
    if(!user) {
        req.flash('error', 'Um email foi enviado para você. (email não existe no sistema)');
        res.redirect('/users/forget');
        return;
    }

    // 2. gerar token com data de expiração e salvar no banco
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hora
    await user.save();

    // 3. gerar link com token para trocar senha
    const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`;

    // 4. enviar o link via email pro usuario

    req.flash('success', 'Te enviamos um email com instruções. ' + resetLink);
    res.redirect('/users/login');

    // 5. usuario acessa o link e troca a senha


};

exports.forgetToken = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }).exec();

    if(!user){
        req.flash('error', 'Token expirado!');
        res.redirect('/users/forget');
        return;
    }

    res.render('forgetPassword');
};

exports.forgetTokenAction = async (req, res) => {
    //igual userController.forgetToken
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }).exec();

    if (!user) {
        req.flash('error', 'Token expirado!');
        res.redirect('/users/forget');
        return;
    }


    //igual authMiddleware.changePassword
    if (req.body.password != req.body['password-confirm']) {
        req.flash('error', 'Senhas diferentes!');
        res.redirect('back');
        return;
    }

    user.setPassword(req.body.password, async () => {
        await user.save();

        req.flash('success', 'Senha alterada com sucesso!');
        res.redirect('/');

    });
}