
const mongoose = require('mongoose');

//VARIAVEIS DE AMBIENTE
require('dotenv').config({ path: "./variables.env" });


//CONECTANDO COM O MONGO
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error("ERRO: " + error);
});
//CARREGANDO TODOS OS MODELS
require('./models/Post');


const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log("To na porta: " + server.address().port);
});