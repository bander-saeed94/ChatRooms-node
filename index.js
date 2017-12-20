// import { port } from '_debugger';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.port || 3000;


server.listen(port , ()=>{
    console.log(`listening on port ${port}`)
})

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
});
app.get('/python', (req,res)=>{
    res.sendFile(__dirname + '/public/python.html')
});
app.get('/javascript', (req,res)=>{
    res.sendFile(__dirname + '/public/javascript.html')
});
app.get('/html', (req,res)=>{
    res.sendFile(__dirname + '/public/html.html')
});

io.on('connection', (socket)=>{
    // console.log("new user connected");
    socket.on('join', (room)=>{
        socket.join(room);
        socket.room = room;
        io.to(room).emit('joined', 'some one joined')
    });
    socket.on('messages' , (msg)=>{
        io.to(socket.room).emit('message', msg)
    });
    socket.on('disconnect', ()=>{
        io.to(socket.room).emit('left', 'someone left')
    })
});