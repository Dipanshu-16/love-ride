const http=require("http")
const cors=require("cors")
const express=require("express")
const socketIO=require("socket.io")

const app=express()
const port=4500||process.env.port
const users=[{}]

app.use(cors())

app.get("/",(req,res)=>{
    res.send("backend sever is started")
})

const server=http.createServer(app)

const io=socketIO(server)

io.on("connection",(socket)=>{
    console.log("New connection with socket")
      
    socket.on('joined',({user:user})=>{
      users[socket.id]=user
        console.log(`${user} has joined`)
        socket.emit(`welcome`,{user:"admin",message:`${users[socket.id]} welcome to the chat`})
        socket.broadcast.emit('userjoined',{user:"admin",message:`${users[socket.id]} has joined`})
    })
     socket.on('disconnection',()=>{
        socket.broadcast.emit('leave',{user:"admin",message:`user has left chat`})
        console.log(`user left`)
     })
       
})

server.listen(port,()=>{
    console.log(`server is working bro on http://localhost:${port}`)
})