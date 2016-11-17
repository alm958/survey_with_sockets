var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, './static')));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/',function(req, res){
    res.render('index');
});

var server = app.listen(8000, function(){
    console.log('listening on PORT 8000.');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('we are using sockets');
    console.log(socket.id);

    socket.on("button_clicked", function (formobj){
        var randnum = Math.floor(Math.random()*1000)+1;
        console.log(formobj);
        console.log(randnum);
        socket.emit('server_response', {formobj:formobj,randnum:randnum});
    })
})
